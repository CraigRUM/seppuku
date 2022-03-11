class Point {
    x : number;
    y : number;

    rIndex : number;
    gIndex : number;
    bIndex : number;

    constructor(x:number, y:number, imageWidth:number) {
        this.x = x;
        this.y = y;
        this.rIndex = (x + y * imageWidth) * 4;
        this.gIndex = this.rIndex + 1;
        this.bIndex = this.gIndex + 1;
    }

    getColourAsHex(data: Uint8ClampedArray){
        return `#${this.hexVal(data[this.rIndex])}${this.hexVal(data[this.gIndex])}${this.hexVal(data[this.bIndex])}`;
    }

    getColourMagnitued(data: Uint8ClampedArray){
        return data[this.rIndex]+data[this.gIndex]+data[this.bIndex];
    }

    hexVal(n: number){
        return n.toString(16);
    }

    rgbVal(hexString: string){
        return hexString.slice(1).match(/.{1,2}/g)?.map(s => Number(`0x${s}`));
    }

    plot(data: Uint8ClampedArray, colour: string = "#4be11e"){
        const rgb = this.rgbVal(colour);
        if (rgb) {
            data[this.rIndex] = rgb[0];
            data[this.gIndex] = rgb[1];
            data[this.bIndex] = rgb[2];
        }else{
            console.log(`bad colour`);
        }
    }

    inBox(width: number, height: number, xMod: number, yMod: number){
        return this.x > xMod && this.x < (width - xMod) && this.y > yMod && this.y < (height - yMod);
    }
}
export default Point;