function Square(id, orgctx, ctx, canvas, topLeft, bottomRight){
    this.id = id;
    this.ctx = ctx
    this.orgctx = orgctx;
    this.topLeft =     this.bottomRight = new intersection(topLeft.x + 2, topLeft.y + 2);;
    this.topLeft.x = this.topLeft.x + 2;
    this.topLeft.y = this.topLeft.y;
    this.bottomRight = new intersection(bottomRight.x - 2, bottomRight.y - 4);
    this.canvas = canvas;
    this.intialised = false;
    this.width = this.bottomRight.x - this.topLeft.x;
    this.height = this.bottomRight.y - this.topLeft.y;

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
        if(this.isEmpty()){
            this.draw('white');
            this.number = ''
            this.intialised = true;
            return;
        }
        document.body.style.backgroundImage = 'url(' + dataURL + ')';
        Tesseract.recognize(
            dataURL,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            if(text){
                this.draw('orange');
                this.number = text.replace('\n', '');
                this.drawLetter();
                this.intialised = true;
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

    this.drawLetter = function() {
        this.ctx.fillStyle = "black";
        this.ctx.font = '25px Courier New';
        this.ctx.fillText(this.number, this.bottomRight.x - this.width/1.2, this.bottomRight.y - this.height / 6);
    }

    this.toString = function(){
        return `|${this.number}|`
    }

    this.isEmpty = function(){
        const imageData = this.orgctx.getImageData(this.topLeft.x, this.topLeft.y, this.width, this.height); //take away the .data

        var r, g, b;
        for(var i = 0; i+3 < imageData.data.length; i+=4) {
            r = imageData.data[i];
            g = imageData.data[i+1];
            b = imageData.data[i+2];

            if(!(r > 0 && g > 0 && b > 0)) { // if pixel is not black, and not transparent          
                return false;
            }
        }
        return true;
    }
}