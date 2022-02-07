function boardDetector(){
    // Variables
    this.img = undefined;
    this.imgElement = undefined;
    this.ctx = undefined;
    this.canvasElement = undefined;
    this.rawCanvas = undefined;
    this.rawctx = undefined;
    this.ctxDimensions = {
        width: undefined,
        height:undefined
    };
    this.pixelData = undefined;
    this.threshold = 30;
    this.intersectionPoints = []
    this.squares = []
    
    this.init = function(){
        // Build the canvas
        this.maxGap = 5;
        this.domContainer = document.querySelector('#image_container');
        this.render(this.makeImage());
        this.imgElement = document.querySelector('#image');
        const detec = this;
        return new Promise((resolve, reject) => {
            setTimeout(detec.waitForImageLoad(detec, resolve), 100);
        });
    };

    this.waitForImageLoad = function(detec, resolve) {
        if(!(detec.imgElement.complete && detec.imgElement.naturalHeight !== 0)){
            setTimeout(() => {detec.waitForImageLoad(detec, resolve);}, 100);
        }else{
            detec.finishInit(detec, resolve);
        }
    }

    this.finishInit = function(detec, resolve){
        var width = detec.imgElement.width;
        var height = detec.imgElement.height;
        const can1 = (<canvas id="layer" width={width} height={height}></canvas>);
        const can2 = (<canvas id="rawData" width={width} height={height}></canvas>);
        detec.render(detec.makeImage(can1,can2));
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

    this.render = function(img){
        ReactDOM.render(img, this.domContainer);
    };

    this.makeImage = function(can1='', can2=''){
        return (<div className="wrapper"> 
            <img src="puzzle.png" alt="Dice" id="image"/>{can1}{can2}
        </div>);
    };
    
    this.findEdges = function(){
        this.hLines = this.getHorizontal();
        this.vLines = this.getVertical();
    };

    this.findIntersects = function(hLines, vLines){
        this.hLines.forEach((hl) => {
            this.vLines.forEach((vl) => {
                this.intersects(hl, vl);
            });
        });
    }

    this.findSquares = function(){
        this.intersectionPoints.forEach(
            (p, i) => {
                if(i+11 < this.intersectionPoints.length && (i-9)%10 != 0){
                    const sq = new Square(this.ctx,this.rawctx,this.canvasElement, p, this.intersectionPoints[i+11]);
                    this.squares.push(sq);
                }
            });
        this.squares.forEach((s, i) => {
            if(i%2 == 0){
                s.draw();
            }else{
                s.draw('green')
            }
            setTimeout(function () {
                s.getLetter();
            }, i * 200);
        })
    }
    
    this.copyImage = function(){
        this.rawctx.clearRect(0,0,this.ctxDimensions.width,this.ctxDimensions.height);
        this.ctx.drawImage(this.imgElement,0,0);
    
        //Grab the Pixel Data, and prepare it for use
        this.pixelData = this.ctx.getImageData(0,0,this.ctxDimensions.width, this.ctxDimensions.height);
    };
    
    this.getHorizontal = function(){
        var lines = []
        var x = 0;
        var y = 0;
        var bottom = undefined;
        const colour = 'green';
        for(y=0;y<this.pixelData.height;y++){
            var isLine = true
            var gap = 0;
            for(x=0;x<this.pixelData.width;x++){
                // get this pixel's data
                // currently, we're looking at the blue channel only.
                // Since this is a B/W photo, all color channels are the same.
                // ideally, we would make this work for all channels for color photos.
                const index = (x + y * this.ctxDimensions.width) * 4;
                const pixel = this.pixelData.data[index+2];

                // Get the values of the surrounding pixels
                // Color data is stored [r,g,b,a][r,g,b,a]
                // in sequence.
                const bottom = this.pixelData.data[index+(this.ctxDimensions.width*4)];

                //Compare it all.
                // (Currently, just the left pixel)
                if(pixel>bottom+this.threshold){
                    this.plotPoint(x,y, colour, this.ctx);
                    gap = 0;
                }
                else if(pixel<bottom-this.threshold){
                    this.plotPoint(x,y, colour, this.ctx);
                    gap = 0;
                }else if(gap < this.maxGap){
                    gap ++;
                }else{
                    isLine = false;
                    break;
                }
            }
            if(isLine){
                lines.push(y);
            }
        }
        lines = this.refineLines(lines);
        lines.forEach((l) => {console.log('line detected at y = ' + l);})
        this.rendreLines(lines, 'y');
        return lines;
    };

    this.getVertical = function(){
        var lines = []
        var x = 0;
        var y = 0;
        var left = undefined;
        const colour = 'red'
        for(x=0;x<this.pixelData.width;x++){
            var isLine = true
            var gap = 0;
            for(y=0;y<this.pixelData.height;y++){
                // get this pixel's data
                // currently, we're looking at the blue channel only.
                // Since this is a B/W photo, all color channels are the same.
                // ideally, we would make this work for all channels for color photos.
                const index = (x + y * this.ctxDimensions.width) * 4;
                const pixel = this.pixelData.data[index+2];

                // Get the values of the surrounding pixels
                // Color data is stored [r,g,b,a][r,g,b,a]
                // in sequence.
                const left = this.pixelData.data[index-4];

                //Compare it all.
                // (Currently, just the left pixel)
                if(pixel>left+this.threshold){
                    this.plotPoint(x,y, colour, this.ctx);
                    gap = 0;
                }
                else if(pixel<left-this.threshold){
                    this.plotPoint(x,y,colour, this.ctx);
                    gap = 0;
                } if(gap < this.maxGap){
                    gap ++;
                }else{
                    isLine = false;
                    break;
                }
            }
            if(isLine){
                lines.push(x);
            }
        }
        lines = this.refineLines(lines);
        lines.forEach((l) => {console.log('line detected at x = ' + l);})
        this.rendreLines(lines, 'x');
        return lines;
    };
    
    this.refineLines = function(lines){
        const newlines = lines.filter(
            (line, i) => {
                for(var p = 1; p < 6; p++){
                    for(var j = 1; j < 6; j++){
                        if(lines.length >= i + p){
                            const next = lines[i+p];
                            const expect = line + j;
                            if(next == expect){
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

    this.rendreLines = function(lines, dir){
        lines.forEach((line, i) => {
            this.renderLine(line, dir, i)
        });
    }

    this.renderLine = function(line, dir, i){
        const boxLines = [3, 6];
        const colour = boxLines.includes(i) ? 'purple' : dir == 'y' ? 'cyan' : 'teal';
        const r = boxLines.includes(i) ? 1.5 : 0.7;
        var x,y;
        switch(dir){
            case 'y':
                for(x=0;x<this.pixelData.width;x++){
                    this.plotPoint(x, line, colour, this.rawctx, r)
                }
                break;
            case 'x':
                for(y=0;y<this.pixelData.width;y++){
                    this.plotPoint(line, y, colour, this.rawctx, r)
                }
                break;
        }
    }

    this.plotPoint = function(x,y, colour='green', ctx, r=0.5){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.beginPath();
    };

    this.intersects = function(x, y){
        this.plotPoint(x,y,'red',this.rawctx, 2)
        this.intersectionPoints.push(new intersection(x, y));
    }

    this.squaresInitilized = function(){
        return this.squares.filter(s => !s.intialised) == 0;
    }
}
var cols = []
var rows = [
    ["5","6"," ","8","4","7"," "," "," "],
    ["6","8","7"," ","3","9"," ","6"," "],
    [" ","7"," ","9"," "," ","8"," "," "],
    ["8"," ","9","6"," "," "," ","8"," "],
    ["4","3"," "," "," "," ","4","6","8"],
    ["7","9"," "," "," "," ","2"," "," "],
    [" "," ","8"," ","4","2"," "," "," "],
    [" ","6"," ","8","6"," "," "," ","7"],
    [" "," "," "," ","8"," "," ","7","9"]
]
var boardDetector = new boardDetector();

const waitForSquares = function(){
    console.log(`Waiting for sqaures to be done!`);
    setTimeout(boardDetector.squaresInitilized() ? populateBoard : waitForSquares, 1000);
}

const populateBoard = function(){
    const squares = boardDetector.squares.map(s => s.number);

    while(squares.length) {
        cols.push(squares.splice(0,9))
    }

    cols.forEach((c, i) => {
        c.forEach((e, j) => {
            rows[j][i] = cols[i][j];
        });
    });

    const rowCopy = JSON.parse(JSON.stringify(rows));
    const bSquares = []
    while(rowCopy.length) {
        const bSquare = []
        const group = rowCopy.splice(0,3)
        group.forEach((g, i) => {
            bSquare.push(g.splice(0,3))
        });
        bSquares.push(bSquare)
    }

    console.log(JSON.stringify(cols, true));
    console.log(JSON.stringify(rows));
    console.log(JSON.stringify(bSquares));
}


boardDetector.init().then(() => {
    boardDetector.findEdges();
    boardDetector.findIntersects();
    console.log(boardDetector.intersectionPoints);
    boardDetector.findSquares();
    waitForSquares();
});