import Point from "./Point";

class Line {
    a : Point;
    b : Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }

    intersects(line: Line){
        const xdiff: Point = new Point(this.a.x - this.b.x, line.a.x - line.b.x, 0);
        const ydiff: Point = new Point(this.a.y - this.b.y, line.a.y - line.b.y, 0);
        const det = (a: Point, b: Point) => {
            return a.x * b.y - a.y * b.x;
        }
            
        const div : number = det(xdiff, ydiff)
        if (div == 0){ return null }
        const d: Point = new Point(det(this.a, this.b), det(line.a, line.b), 0)
        const x: number = det(d, xdiff) / div;
        const y: number = det(d, ydiff) / div;
        return {x: x, y: y} as any;
    }
}
export default Line;