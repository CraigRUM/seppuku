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
        var width = this.imgElement.width;
        var height = this.imgElement.height;
        const can1 = (<canvas id="layer" width={width} height={height}></canvas>);
        const can2 = (<canvas id="rawData" width={width} height={height}></canvas>);
        this.render(this.makeImage(can1,can2));
        const detec = this
        return new Promise((resolve, reject) => {
            setTimeout(detec.finishInit(detec, resolve), 200);
        })
    };

    this.finishInit = function(detec, resolve){
        detec.canvasElement = document.querySelector("#layer");
        detec.rawCanvas = document.querySelector("#rawData");
        detec.ctx = detec.canvasElement.getContext('2d');
        detec.rawctx = detec.rawCanvas.getContext('2d');
    
        // Store the Canvas Size
        detec.ctxDimensions.width = detec.imgElement.width;
        detec.ctxDimensions.height = detec.imgElement.height;
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
        this.copyImage();
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
                    const sq = new Square(this.rawctx,this.canvasElement, p, this.intersectionPoints[i+11]);
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
            }, i * 100);
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
        lines.forEach(line => {
            this.renderLine(line,dir)
        });
    }

    this.renderLine = function(line, dir){
        var x,y;
        switch(dir){
            case 'y':
                for(x=0;x<this.pixelData.width;x++){
                    this.plotPoint(x, line, 'blue', this.rawctx)
                }
                break;
            case 'x':
                for(y=0;y<this.pixelData.width;y++){
                    this.plotPoint(line, y, 'cyan', this.rawctx)
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
}

function intersection(x, y){
    this.x = x;
    this.y = y;
}

function Square(ctx, canvas, topLeft, bottomRight){
    this.ctx = ctx
    this.topLeft =     this.bottomRight = new intersection(topLeft.x + 2, topLeft.y + 2);;
    this.topLeft.x = this.topLeft.x + 2;
    this.topLeft.y = this.topLeft.y;
    this.bottomRight = new intersection(bottomRight.x - 2, bottomRight.y - 4);
    this.canvas = canvas;

    this.draw = function(colour='yellow'){
        this.ctx.fillStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(this.topLeft.x, this.topLeft.y);
        this.ctx.lineTo(this.topLeft.x, this.bottomRight.y);
        this.ctx.lineTo(this.bottomRight.x, this.bottomRight.y);
        this.ctx.lineTo(this.bottomRight.x, this.topLeft.y);
        this.ctx.lineTo(this.topLeft.x, this.topLeft.y);
        this.ctx.closePath();
        this.ctx.fill();
    };

    this.callback = function(dataURL) {
        document.body.style.backgroundImage = 'url(' + dataURL + ')';
        Tesseract.recognize(
            dataURL,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            if(text){
                this.draw('orange');
                this.number = text
                console.log(`The number you are looking at is a ${text} in square ${this.toString()}`);
            }else{
                console.log(`Nothing found in square ${this.toString()}`);
            }
        })
    };

    this.getLetter = function() {
        // create an in-memory canvas
        const offsetX = this.topLeft.x
        const offsetY = this.topLeft.y
        const width = this.bottomRight.x - this.topLeft.x
        const height = this.bottomRight.y - this.topLeft.y
        var buffer = document.createElement('canvas');
        var b_ctx = buffer.getContext('2d');
        // set its width/height to the required ones
        buffer.width = width;
        buffer.height = height;
        // draw the main canvas on our buffer one
        // drawImage(source, source_X, source_Y, source_Width, source_Height, 
        //  dest_X, dest_Y, dest_Width, dest_Height)
        b_ctx.drawImage(this.canvas, offsetX, offsetY, width, height,
                        0, 0, buffer.width, buffer.height);
        // now call the callback with the dataURL of our buffer canvas
        this.callback(buffer.toDataURL());
    };

    this.toString = function(){
        return `sqaure - ${this.topLeft.x} : ${this.bottomRight.x} has letter -> ${this.number}`
    }
}

var board = [
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
]
var boardDetector = new boardDetector();
boardDetector.init().then(() => {
    boardDetector.findEdges();
    boardDetector.findIntersects();
    console.log(boardDetector.intersectionPoints);
    boardDetector.findSquares();
    
    setTimeout(function () {
        board.forEach((r, i) => {
            r.forEach((l, j) => {
                board[j][i] = boardDetector.squares[((i+1) * (j+1)) - 1].number;
                console.log(boardDetector.squares[i * j].toString());
            });
        });
    },60000);
});