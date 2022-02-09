class BoardDetector {
    constructor() {
        // Variables
        this.img = undefined;
        this.imgElement = undefined;
        this.ctx = undefined;
        this.canvasElement = undefined;
        this.rawCanvas = undefined;
        this.rawctx = undefined;
        this.ctxDimensions = {
            width: undefined,
            height: undefined
        };
        this.pixelData = undefined;
        this.threshold = 30;
        this.intersectionPoints = [];
        this.squares = [];
    }

    init() {
        // Build the canvas
        this.maxGap = 5;
        this.domContainer = document.querySelector('#image_container');
        this.render(this.makeImage());
        this.imgElement = document.querySelector('#image');
        const detec = this;
        return new Promise((resolve, reject) => {
            setTimeout(detec.waitForImageLoad(detec, resolve), 100);
        });
    }

    waitForImageLoad = function (detec, resolve) {
        if (!(detec.imgElement.complete && detec.imgElement.naturalHeight !== 0)) {
            setTimeout(() => { detec.waitForImageLoad(detec, resolve); }, 100);
        } else {
            detec.finishInit(detec, resolve);
        }
    }

    finishInit(detec, resolve) {
        var width = detec.imgElement.width;
        var height = detec.imgElement.height;
        const can1 = (<canvas id="layer" width={width} height={height}></canvas>);
        const can2 = (<canvas id="rawData" width={width} height={height}></canvas>);
        detec.render(detec.makeImage(can1, can2));
        detec.canvasElement = document.querySelector("#layer");
        detec.rawCanvas = document.querySelector("#rawData");
        detec.ctx = detec.canvasElement.getContext('2d');
        detec.rawctx = detec.rawCanvas.getContext('2d');

        // Store the Canvas Size
        detec.ctxDimensions.width = detec.imgElement.width;
        detec.ctxDimensions.height = detec.imgElement.height;
        this.copyImage();
        resolve();
    }

    render(img){
        ReactDOM.render(img, this.domContainer);
    }

    makeImage(can1 = '', can2 = '') {
        return (<div className="wrapper">
            <img src="puzzle.png" alt="Dice" id="image" />{can1}{can2}
        </div>);
    }

    findEdges() {
        this.hLines = this.getHorizontal();
        this.vLines = this.getVertical();
    }

    findIntersects(hLines, vLines) {
        this.hLines.forEach((hl) => {
            this.vLines.forEach((vl) => {
                this.intersects(hl, vl);
            });
        });
    }

    findSquares() {
        this.intersectionPoints.forEach(
            (p, i) => {
                if (i + 11 < this.intersectionPoints.length && (i - 9) % 10 != 0) {
                    const sq = new Square(i, this.ctx, this.rawctx, this.canvasElement, p, this.intersectionPoints[i + 11]);
                    this.squares.push(sq);
                }
            });
        this.squares.forEach((s, i) => {
            if (i % 2 == 0) {
                s.draw();
            } else {
                s.draw('green');
            }
            setTimeout(function () {
                s.getLetter();
            }, i * 200);
        });
    }

    copyImage() {
        this.rawctx.clearRect(0, 0, this.ctxDimensions.width, this.ctxDimensions.height);
        this.ctx.drawImage(this.imgElement, 0, 0);

        //Grab the Pixel Data, and prepare it for use
        this.pixelData = this.ctx.getImageData(0, 0, this.ctxDimensions.width, this.ctxDimensions.height);
    }

    getHorizontal() {
        var lines = [];
        var x = 0;
        var y = 0;
        var bottom = undefined;
        const colour = 'green';
        for (y = 0; y < this.pixelData.height; y++) {
            var isLine = true;
            var gap = 0;
            for (x = 0; x < this.pixelData.width; x++) {
                // get this pixel's data
                // currently, we're looking at the blue channel only.
                // Since this is a B/W photo, all color channels are the same.
                // ideally, we would make this work for all channels for color photos.
                const index = (x + y * this.ctxDimensions.width) * 4;
                const pixel = this.pixelData.data[index + 2];

                // Get the values of the surrounding pixels
                // Color data is stored [r,g,b,a][r,g,b,a]
                // in sequence.
                const bottom = this.pixelData.data[index + (this.ctxDimensions.width * 4)];

                //Compare it all.
                // (Currently, just the left pixel)
                if (pixel > bottom + this.threshold) {
                    this.plotPoint(x, y, colour, this.ctx);
                    gap = 0;
                }
                else if (pixel < bottom - this.threshold) {
                    this.plotPoint(x, y, colour, this.ctx);
                    gap = 0;
                } else if (gap < this.maxGap) {
                    gap++;
                } else {
                    isLine = false;
                    break;
                }
            }
            if (isLine) {
                lines.push(y);
            }
        }
        lines = this.refineLines(lines);
        lines.forEach((l) => { console.log('line detected at y = ' + l); });
        this.rendreLines(lines, 'y');
        return lines;
    }

    getVertical() {
        var lines = [];
        var x = 0;
        var y = 0;
        var left = undefined;
        const colour = 'red';
        for (x = 0; x < this.pixelData.width; x++) {
            var isLine = true;
            var gap = 0;
            for (y = 0; y < this.pixelData.height; y++) {
                // get this pixel's data
                // currently, we're looking at the blue channel only.
                // Since this is a B/W photo, all color channels are the same.
                // ideally, we would make this work for all channels for color photos.
                const index = (x + y * this.ctxDimensions.width) * 4;
                const pixel = this.pixelData.data[index + 2];

                // Get the values of the surrounding pixels
                // Color data is stored [r,g,b,a][r,g,b,a]
                // in sequence.
                const left = this.pixelData.data[index - 4];

                //Compare it all.
                // (Currently, just the left pixel)
                if (pixel > left + this.threshold) {
                    this.plotPoint(x, y, colour, this.ctx);
                    gap = 0;
                }
                else if (pixel < left - this.threshold) {
                    this.plotPoint(x, y, colour, this.ctx);
                    gap = 0;
                } if (gap < this.maxGap) {
                    gap++;
                } else {
                    isLine = false;
                    break;
                }
            }
            if (isLine) {
                lines.push(x);
            }
        }
        lines = this.refineLines(lines);
        lines.forEach((l) => { console.log('line detected at x = ' + l); });
        this.rendreLines(lines, 'x');
        return lines;
    }

    refineLines(lines) {
        const newlines = lines.filter(
            (line, i) => {
                for (var p = 1; p < 6; p++) {
                    for (var j = 1; j < 6; j++) {
                        if (lines.length >= i + p) {
                            const next = lines[i + p];
                            const expect = line + j;
                            if (next == expect) {
                                return false;
                            };
                        }
                    }
                }
                return true;
            }
        );
        console.log(newlines);
        return newlines;
    }

    rendreLines(lines, dir) {
        lines.forEach((line, i) => {
            this.renderLine(line, dir, i);
        });
    }

    renderLine(line, dir, i) {
        const boxLines = [3, 6];
        const colour = boxLines.includes(i) ? 'purple' : dir == 'y' ? 'cyan' : 'teal';
        const r = boxLines.includes(i) ? 1.5 : 0.7;
        var x, y;
        switch (dir) {
            case 'y':
                for (x = 0; x < this.pixelData.width; x++) {
                    this.plotPoint(x, line, colour, this.rawctx, r);
                }
                break;
            case 'x':
                for (y = 0; y < this.pixelData.width; y++) {
                    this.plotPoint(line, y, colour, this.rawctx, r);
                }
                break;
        }
    }

    plotPoint(x, y, colour = 'green', ctx, r = 0.5) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.beginPath();
    }

    intersects(x, y){
        this.plotPoint(x, y, 'red', this.rawctx, 2);
        this.intersectionPoints.push(new intersection(x, y));
    }

    squaresInitilized(){
        return this.squares.filter(s => !s.intialised) == 0;
    }
    
}

class GameBoard {
    constructor() {
        this.cols = [];
        this.rows = [[], [], [], [], [], [], [], [], []];
        this.squares = [];
    }

    populateBoard(cells) {
        this.cells = cells;
        for (var i = 0; i < 9; i++) {
            const start = i * 9;
            const end = start + 9;
            this.cols.push(this.cells.slice(start, end));
        }

        this.cols.forEach((c, i) => {
            c.forEach((e, j) => {
                this.rows[j][i] = this.cols[i][j];
            });
        });

        for (var i = 0; i < 3; i++) {
            const group = this.rows.slice(i * 3, (i * 3) + 3);
            for (var j = 0; j < 3; j++) {
                const start = j * 3;
                const end = start + 3;
                const bSquare = [];
                bSquare.push(...group[0].slice(start, end));
                bSquare.push(...group[1].slice(start, end));
                bSquare.push(...group[2].slice(start, end));
                this.squares.push(bSquare);
            }
        }


        console.log(this.cols);
        console.log(this.rows);
        console.log(this.squares);
    }

    solve(){
        this.cells.forEach( (cell) => {
            const row = this.getRow(cell);
            const col = this.getCol(cell);
            const sq = this.getSquare(cell);
            console.log(sq);
        })
    }

    getRow(cell){
        return this.rows.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }

    getCol(cell){
        return this.cols.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }

    getSquare(cell){
        return this.squares.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }
}

var boardDetector = new BoardDetector();
var gameBoard = new GameBoard();

const waitForSquares = function(){
    console.log(`Waiting for sqaures to be done!`);
    setTimeout(boardDetector.squaresInitilized() ? solveGame : waitForSquares, 1000);
}

const solveGame = function(){
    gameBoard.populateBoard(boardDetector.squares)
    gameBoard.solve();
}

boardDetector.init().then(() => {
    boardDetector.findEdges();
    boardDetector.findIntersects();
    boardDetector.findSquares();
    waitForSquares();
});