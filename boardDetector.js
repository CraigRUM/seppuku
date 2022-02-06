function edgeDetector(){
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
    this.pointerColor = 'rgba(255,0,0,1)';
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
        this.canvasElement = document.querySelector("#layer");
        this.rawCanvas = document.querySelector("#rawData");
        this.ctx = this.canvasElement.getContext('2d');
        this.rawctx = this.rawCanvas.getContext('2d');
    
      // Store the Canvas Size
        this.ctxDimensions.width = width;
        this.ctxDimensions.height = height;
    };

    this.render = function(img){
        ReactDOM.render(img, this.domContainer);
    };

    this.makeImage = function(can1='', can2=''){
        return (<div>
            <div className="wrapper"> 
                <img src="puzzle.png" alt="Dice" id="image"/>
                {can1}
                {can2}
            </div>
            Threshold: <input type="input" id="threshold" value="30"/>
            <span className="help">Hit enter or return after changing the value</span>
        </div>);
    };
    
    this.findEdges = function(){
        this.copyImage();
        const hLines = this.getHorizontal();
        const vLines = this.getVertical();
        hLines.forEach((hl) => {
                vLines.forEach((vl) => {
                    this.intersects(hl, vl);
                });
        });
        this.intersectionPoints.forEach(
            (p, i) => {
                if(i+11 < this.intersectionPoints.length && (i-9)%10 != 0){
                    const sq = new Square(this.rawctx, p, this.intersectionPoints[i+11]);
                    this.squares.push(sq);
                }
            });
        this.squares.forEach((s, i) => {
            if(i%2 == 0){
                s.draw();
            }else{
                s.draw('green')
            }
        })
        console.log(this.squares);
    };
    
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
                console.log('line detected at y = ' + y)
            }
        }
        lines = this.refineLines(lines);
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
                console.log('line detected at x = ' + x)
            }
        }
        lines = this.refineLines(lines);
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
        this.intersectionPoints.push([x, y]);
    }
}

function Square(ctx, topLeft, bottomRight){
    this.ctx = ctx
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.draw = function(colour='yellow'){
        this.ctx.fillStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(topLeft[0]+1, topLeft[1]+1);
        this.ctx.lineTo(topLeft[0]+1, bottomRight[1]-1);
        this.ctx.lineTo(bottomRight[0]-1, bottomRight[1]-1);
        this.ctx.lineTo(bottomRight[0]-1, topLeft[1]+1);
        this.ctx.lineTo(topLeft[0]+1, topLeft[1]+1);
        this.ctx.closePath();
        this.ctx.fill();
    };
}

var edgeDetector = new edgeDetector();
edgeDetector.init();
edgeDetector.findEdges();