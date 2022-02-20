import Line from "./Line";

//HSctx.fillStyle = 'rgba(0,0,0,.01)';
class HoughTransform{
    THICKNESS = 2;
    ctx: any;
    numAngleCells = 360;
    rhoMax: number;
    accum = new Array(this.numAngleCells);
    drawingWidth: number;
    drawingHeight: number;
    cosTable = new Array(this.numAngleCells);
    sinTable = new Array(this.numAngleCells);
    distance = 10;



    constructor(canvas: HTMLCanvasElement){
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
                    if (max>180) {
                        var a=this.cosTable[i];
                        var b=this.sinTable[i];
                        var bestRho = j;
                        bestRho<<=1; // accumulator is bitshifted
                        bestRho-=this.rhoMax; /// accumulator has rhoMax added
                        lines.push({   
                            x1: a*bestRho+1000*(-b),
                            y1: (b*bestRho+1000*(a)),
                            x2: a*bestRho-1000*(-b),
                            y2: (b*bestRho-1000*(a))   
                        } as Line);
                    }
            }
        }
        const newLines = [] as Array<Line>;
        lines = lines.filter(l => {
            const mainX = (l.x1 - l.x2) < -5 || (l.x2 - l.x1) < -5;
            const mainY = (l.y1 - l.y2) < -5 || (l.y2 - l.y1) < -5;
            return !(mainX && mainY)
        });
        while(lines.length > 0){
            const line: Line = lines.pop() as Line;
            newLines.push(line);
            lines = lines.filter(l => {
                const mainXMid = (line.x1 + line.x2) / 2;
                const lXMid = (l.x1 + l.x2) / 2;
                const mainYMid = (line.y1 + line.y2) / 2;
                const lYMid = (l.y1 + l.y2) / 2;
                return !((mainXMid + this.distance) > lXMid && (mainXMid - this.distance) < lXMid) 
                || !((mainYMid + this.distance) > lYMid && (mainYMid - this.distance) < lYMid) ;
            });
        }
        console.log(newLines);
        newLines.forEach((line: Line) => {
            console.log(line);
            // now to backproject into drawing space
            //console.log(bestTheta,bestRho);
            //console.log(x1,y1,x2,y2);
            this.ctx.beginPath();
            this.ctx.strokeStyle='rgba(255,0,0,1)';
            this.ctx.moveTo(line.x1+this.drawingWidth/2,line.y1+this.drawingHeight/2);
            this.ctx.lineTo(line.x2+this.drawingWidth/2,line.y2+this.drawingHeight/2);
            this.ctx.stroke();
            this.ctx.strokeStyle='rgba(0,0,0,1)';
            this.ctx.closePath();
        });
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