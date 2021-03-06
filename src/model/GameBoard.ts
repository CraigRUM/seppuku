import Square from "./Square";

class GameBoard {
    cols :any;
    rows :any;
    squares :any;
    solvefailed :boolean;
    cells: any;
    colours: string[] = ["teal", "cyan", "pink", "magenta", "lightgrey", "yellow", "red", "lime", "orange"];
    constructor() {
        this.cols = [[], [], [], [], [], [], [], [], []];
        this.rows = [];
        this.squares = [];
        this.solvefailed = false;
    }

    populateBoard(cells: any) {
        this.cells = cells;
        for (var i = 0; i < 9; i++) {
            const start = i * 9;
            const end = start + 9;
            this.rows.push(this.cells.slice(start, end));
        }

        this.rows.forEach((c:any, i:number) => {
            c.forEach((e:any, j:number) => {
                this.cols[j][i] = this.rows[i][j];
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

        this.cells.forEach((c: any) => this.populateCellData(c));
        console.log(this.cols);
        console.log(this.rows);
        console.log(this.squares);
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    solve(){
        this.updatePossible();
        this.filterPossible();
        if(!this.guessCertain()){
            this.guessNextBest();
        }
        if(!this.validateBoard() || this.brokenCells()){return;}
    }

    brokenCells(){
        const options = this.cells.filter((c: Square) => !c.number);
        if(options.filter((c: Square) => c.pos.length == 0).length > 0){
            this.failed();
            return true;
        }
        return false;
    }

    guessCell(cell: Square){
        if(cell && cell.pos && cell.pos.length){
            this.fillCell(cell, cell.pos[this.getRandomInt(cell.pos.length)]);
            return true;
        }
        return false;
    }

    guessCertain(){
        const options = this.cells.filter((c: Square) => !c.number);
        const refinedOptions = options.filter((c: Square) => c.pos.length == 1);
        refinedOptions.forEach((cell: Square) => {
            this.guessCell(cell);
        });
        return refinedOptions.length > 0;
    }

    guessNextBest(){
        const options = this.cells.filter((c: Square) => !c.number);
        for(let i = 2; i <= 8; i++){
            const refinedOptions = options.filter((c: Square) => c.pos.length == i);
            if(refinedOptions.length){
                return this.guessCell(refinedOptions[this.getRandomInt(refinedOptions.length)]);
            }
        }
    }

    validateBoard(){
        this.cells.forEach((c: Square) => {
            if(!(
                    this.validateList(c, this.getSquare(c)) &&
                    this.validateList(c, this.getCol(c)) &&
                    this.validateList(c, this.getRow(c))
                    )){
                this.failed();
                return false;
            }
        });
        return true;
    }

    validateList(cell : Square, list: Square[]){
        return list.filter((c: Square) => cell.id !== c.id).filter((c: Square) => (c.number && cell.number === c.number)).length === 0;
    }

    updatePossible(){
        this.cells.filter((c: Square) => !c.number).forEach( (cell: Square) => {
            cell.getPos();
        });
    }

    filterPossible(){
        this.cells.filter((c: Square) => !c.number).forEach( (cell: Square) => {
            cell.filterPos();
        });
    }

    fillCell(cell: Square, number: string){
        cell.number = number;
        cell.draw(this.colours[(+number)-1]);
        cell.drawLetter();
        this.solvefailed = false;
    }

    failed(){
        this.cells.filter((c: Square) => c.provisonal).forEach((c: Square) => c.draw('pink'));
        setTimeout(() => {this.clearBoard()}, 250);
    }

    clearBoard(){
        this.cells.filter((c: Square) => c.provisonal).forEach((c: Square) => c.blank());
    }

    solved(){
        return this.cells.filter((c: Square) => !c.number).length === 0
    }

    populateCellData(cell: Square){
        cell.row = this.getRow(cell);
        cell.col = this.getCol(cell);
        cell.sq = this.getSquare(cell);
    }

    getRow(cell: Square){
        return this.rows.filter((i:any) => i.filter((c: Square) => c.id === cell.id).length == 1)[0];
    }

    getCol(cell: Square){
        return this.cols.filter((i:any) => i.filter((c: Square) => c.id === cell.id).length == 1)[0];
    }

    getSquare(cell: Square){
        return this.squares.filter((i:any) => i.filter((c: Square) => c.id === cell.id).length == 1)[0];
    }
}
export default GameBoard;