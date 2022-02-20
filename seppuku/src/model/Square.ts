import Intersection from "./Intersection";
import {Tesseract} from "tesseract.ts";

class Square{

    id: any; 
    ctx: any; 
    canvas: any; 
    topLeft: any; 
    bottomRight: any;
    intialised: any;
    width: any;
    height: any;
    numbers: any;
    provisonal: boolean;
    number: string = '';

    constructor(id :any, ctx:any, canvas:any, topLeft:any, bottomRight:any){
        this.id = id;
        this.ctx = ctx
        this.topLeft = new Intersection(topLeft.x, topLeft.y);
        this.bottomRight = new Intersection(bottomRight.x, bottomRight.y);
        this.canvas = canvas;
        this.intialised = false;
        this.width = this.bottomRight.x - this.topLeft.x;
        this.height = this.bottomRight.y - this.topLeft.y;
        this.numbers = ['1','2','3','4','5','6','7','8','9'];

        const heightMod = this.percent(this.height, 10);
        const widthMod = this.percent(this.width, 10);
        this.bottomRight.y = this.bottomRight.y - heightMod;
        this.bottomRight.x = this.bottomRight.x - widthMod;
        this.topLeft.y = this.topLeft.y + heightMod;
        this.topLeft.x = this.topLeft.x + widthMod;
        this.width = this.bottomRight.x - this.topLeft.x;
        this.height = this.bottomRight.y - this.topLeft.y;
        this.provisonal = false;
    }

    // getPos(){
    //     const listToFilter = this.pos && this.pos.length > 0 ? this.pos : this.numbers;
    //     this.pos = listToFilter.filter( n => !(this.inList(this.row, n) || this.inList(this.col, n) || this.inList(this.sq, n)));
    // }

    // filterPos(){
    //     this.tryFilter(this.sq);
    //     this.tryFilter(this.row);
    //     this.tryFilter(this.col);
    // }

    // tryFilter(list){
    //     const others = [];
    //     //this.row.filter(c => !c.number && c.id != this.id).forEach(c => others.push(...c.pos));
    //     //this.col.filter(c => !c.number && c.id != this.id).forEach(c => others.push(...c.pos));
    //     list.filter(c => !c.number && c.id != this.id).forEach(c => others.push(...c.pos));
    //     this.filteredPos = this.pos.filter( n => !others.includes(n));
    //     if(this.filteredPos.length > 0 && this.filteredPos.length < this.pos.length){
    //         this.pos = this.filteredPos;
    //         console.log(others);
    //         console.log(this.pos);
    //         console.log(this.filteredPos);
    //     }
    // }

    // inList(list, number){
    //     return list.filter(c => c.number === number).length != 0
    // }

    percent(val: any, percent: any){
        return (val / 100) * percent;
    }

    draw(colour='yellow'){
        this.ctx.fillStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(this.topLeft.x, this.topLeft.y);
        this.ctx.lineTo(this.bottomRight.x, this.topLeft.y);
        this.ctx.lineTo(this.bottomRight.x, this.bottomRight.y);
        this.ctx.lineTo(this.topLeft.x, this.bottomRight.y);
        this.ctx.lineTo(this.topLeft.x, this.topLeft.y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    blank(){
        this.draw('white');
        this.number = '';
        this.intialised = true;
        this.provisonal = true;
        //this.pos = [];
    }

    callback(dataURL: string) {
        if(this.isEmpty()){
            this.blank();
            return;
        }
        document.body.style.backgroundImage = 'url(' + dataURL + ')';
        Tesseract.recognize(
            dataURL,'eng'
        ).progress(console.log).then((res: any) => {
            console.log(res.text);
            if(res.text){
                this.draw('orange');
                this.number = res.text.replace('\n', '');
                this.drawLetter();
                this.intialised = true;
                this.provisonal = false;
                console.log(`The number you are looking at is a ${res.text} in square ${this.toString()}`);
            }else{
                console.log(`Nothing found in square ${this.toString()}`);
                this.blank();
            }
        }).catch(() => {
            this.callback(dataURL)
        })
    }

    getLetter() {
        // create an in-memory canvas
        const offsetX = this.topLeft.x
        const offsetY = this.topLeft.y
        const width = this.bottomRight.x - this.topLeft.x
        const height = this.bottomRight.y - this.topLeft.y
        var buffer = document.createElement('canvas') as HTMLCanvasElement;
        var b_ctx = buffer.getContext('2d');
        // set its width/height to the required ones
        buffer.width = width;
        buffer.height = height;
        // draw the main canvas on our buffer one
        // drawImage(source, source_X, source_Y, source_Width, source_Height, 
        //  dest_X, dest_Y, dest_Width, dest_Height)
        if(b_ctx){
            b_ctx.drawImage(this.canvas, offsetX, offsetY, width, height,
                0, 0, buffer.width, buffer.height);
        }
        // now call the callback with the dataURL of our buffer canvas
        this.callback(buffer.toDataURL());
    }

    drawLetter() {
        this.ctx.fillStyle = "black";
        this.ctx.font = '25px Courier New';
        this.ctx.fillText(this.number, this.bottomRight.x - this.width/1.2, this.bottomRight.y - this.height / 6);
    }

    // toString(){
    //     return `|${this.number}|`
    // }

    isEmpty(){
        return false;
        const imageData = this.ctx.getImageData(this.topLeft.x, this.topLeft.y, this.width, this.height); //take away the .data

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
export default Square;