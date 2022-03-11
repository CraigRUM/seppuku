import Line from "./Line";
import Point from "./Point";

//HSctx.fillStyle = 'rgba(0,0,0,.01)';
class HoughTransform{
    THICKNESS = 2;
    HOZIZONTAL = "h";
    VERTICAL = "v";
    ctx: any;
    numAngleCells = 360;
    rhoMax: number;
    accum = new Array(this.numAngleCells);
    drawingWidth: number;
    drawingHeight: number;
    cosTable = new Array(this.numAngleCells);
    sinTable = new Array(this.numAngleCells);
    minLength: number;
    distance: number;
    maxTilt: number;

    constructor(canvas: HTMLCanvasElement, distance: number, minLength: number, maxTilt: number){
        this.maxTilt = maxTilt;
        this.minLength = minLength;
        this.distance = distance;
        this.drawingWidth = canvas.width;
        this.drawingHeight = canvas.height;
        this.rhoMax = Math.sqrt(this.drawingWidth * this.drawingWidth + this.drawingHeight * this.drawingHeight);
        this.ctx = canvas.getContext('2d');
        for (var theta = 0, thetaIndex = 0; thetaIndex < this.numAngleCells; theta += Math.PI / this.numAngleCells, thetaIndex++) {
            this.cosTable[thetaIndex] = Math.cos(theta);
            this.sinTable[thetaIndex] = Math.sin(theta);
        }
    }

    findMaxInHough = () => {
        let lines = [] as Array<Line>;
        for (var i=0;i<360;i++) {
            for (var j=0;j<this.accum[i].length;j++) {
                if (this.accum[i][j]>max) {}
                    var max = this.accum[i][j];
                    if (max>this.minLength) {
                        var a=this.cosTable[i];
                        var b=this.sinTable[i];
                        var bestRho = j;
                        bestRho<<=1; // accumulator is bitshifted
                        bestRho-=this.rhoMax; /// accumulator has rhoMax added
                        lines.push(new Line(   
                            {
                                x: a*bestRho+1000*(-b),
                                y: (b*bestRho+1000*(a))
                            } as Point,
                            {
                                x: a*bestRho-1000*(-b),
                                y: (b*bestRho-1000*(a))
                            } as Point
                        ) as Line);
                    }
            }
        }
        const newLines = [] as Array<Line>;
        lines = lines.filter(l => {
            const mainX = (l.a.x - l.b.x) < -this.maxTilt || (l.b.x - l.a.x) < -this.maxTilt;
            const mainY = (l.a.y - l.b.y) < -this.maxTilt || (l.b.y - l.a.y) < -this.maxTilt;
            return !(mainX && mainY)
        });
        if(false){
            lines.forEach((line: Line, i: number) => {
                this.drawLine(line, `rgba(0,${(255 / lines.length) * (lines.length - i)},${(255 / lines.length) * i},1)`);
            });
        }
        while(lines.length > 0){
            const line: Line = lines.pop() as Line;
            newLines.push(line);
            lines = lines.filter(l => {
                const mainLineOrientation = this.checkOrientation(line)
                const secondaryLineOrientation = this.checkOrientation(l);
                if(mainLineOrientation != secondaryLineOrientation) return true;

                const main = mainLineOrientation == this.VERTICAL ? 
                    this.getMidPoint(line.a.x, line.b.x):
                    this.getMidPoint(line.a.y,  line.b.y);
                const secondary = mainLineOrientation == this.VERTICAL ? 
                    this.getMidPoint(l.a.x, l.b.x):
                    this.getMidPoint(l.a.y,  l.b.y);
                return !this.getLineDistance(main, secondary);
            });
        }
        console.log(newLines);
        newLines.forEach((line: Line, i: number) => {
            this.drawLine(line, `rgba(0,150,150,1)`);
        });
        return newLines;
    }

    checkOrientation(line: Line){
        return this.getDif(line.a.x, line.b.x) > this.getDif(line.a.y, line.b.y) ? this.HOZIZONTAL : this.VERTICAL;
    }

    getDif(start: number, end: number){
        const max = start > end ? start : end;
        const min = start > end ? end : start;
        return (max - min);
    }

    getMidPoint(start: number, end: number){
        const max = start > end ? start : end;
        const min = start > end ? end : start;
        return min + ((max - min) / 2);
    }

    getLineDistance(start: number, end: number){
        const max = start > end ? start : end;
        const min = start > end ? end : start;
        return (min + this.distance) > max;
    }

    drawLine = (line: Line, colour: string) => {
        console.log(line);
        // now to backproject into drawing space
        //console.log(bestTheta,bestRho);
        //console.log(x1,y1,x2,y2);
        this.ctx.beginPath();
        this.ctx.strokeStyle=colour;
        this.ctx.moveTo(line.a.x+this.drawingWidth/2,line.a.y+this.drawingHeight/2);
        this.ctx.lineTo(line.b.x+this.drawingWidth/2,line.b.y+this.drawingHeight/2);
        this.ctx.stroke();
        this.ctx.strokeStyle='rgba(0,0,0,1)';
        this.ctx.closePath();
    }

    houghAcc = (x: number, y: number) => {
        console.log("running");
        var rho;
        var thetaIndex = 0;
        x -= this.drawingWidth / 2;
        y -= this.drawingHeight / 2;
        for (; thetaIndex < this.numAngleCells; thetaIndex++) {
            rho = this.rhoMax + x * this.cosTable[thetaIndex] + y * this.sinTable[thetaIndex];
            rho >>= 1;
            if (this.accum[thetaIndex] == undefined) this.accum[thetaIndex] = [];
            if (this.accum[thetaIndex][rho] == undefined) {
                this.accum[thetaIndex][rho] = 1;
            } else {
                this.accum[thetaIndex][rho]++;
            }
        }
    }
}
export default HoughTransform;