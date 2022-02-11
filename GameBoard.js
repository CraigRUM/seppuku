class GameBoard {
    constructor() {
        this.cols = [];
        this.rows = [[], [], [], [], [], [], [], [], []];
        this.squares = [];
        this.solvefailed = false;
    }

    populateBoard(cells) {
        this.cells = cells;
        for (var i = 0; i < 9; i++) {
            const start = i * 9;
            const end = start + 9;
            this.cols.push(this.cells.slice(start, end));
        }

        this.cols.forEach((c, i) => {
            c.forEach((e, j) => {
                this.rows[j][i] = this.cols[i][j];
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

        this.cells.forEach(c => this.populateCellData(c));
        console.log(this.cols);
        console.log(this.rows);
        console.log(this.squares);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    solve(){
        var entered = false;
        this.updatePossible();
        this.filterPossible();
        const options = this.cells.filter(c => !c.number);

        if(options.filter(c => c.pos.length == 0).length > 0){
            this.failed();
            return;
        }
        options.filter(c => c.pos.length == 1).forEach((cell) => {
            this.fillCell(cell, cell.pos[this.getRandomInt(cell.pos.length)]);
            entered = true;
            this.solvefailed = !entered;
        });
        if(this.solvefailed){
            const cell = options.filter(c => c.pos.length > 1 && c.pos.length < 4)[0];
            this.fillCell(cell, cell.pos[this.getRandomInt(cell.pos.length)]);
            entered = true;
            this.solvefailed = !entered;
            return;
        }
        this.solvefailed = !entered;
    }

    updatePossible(){
        this.cells.filter(c => !c.number).forEach( (cell) => {
            cell.getPos();
        });
    }

    filterPossible(){
        this.cells.filter(c => !c.number).forEach( (cell) => {
            cell.filterPos();
        });
    }

    fillCell(cell, number){
        cell.number = number;
        cell.draw('lime');
        cell.drawLetter();
        this.solvefailed = false;
    }

    failed(){
        this.cells.filter(c => c.provisonal).forEach(c => c.draw('pink'));
        setTimeout(function(){ this.clearBoard() }.bind(this), 250);
    }

    clearBoard(){
        this.cells.filter(c => c.provisonal).forEach(c => c.blank());
    }

    solved(){
        return this.cells.filter(c => !c.number).length === 0
    }

    populateCellData(cell){
        cell.row = this.getRow(cell);
        cell.col = this.getCol(cell);
        cell.sq = this.getSquare(cell);
    }

    getRow(cell){
        return this.rows.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }

    getCol(cell){
        return this.cols.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }

    getSquare(cell){
        return this.squares.filter(i => i.filter(c => c.id === cell.id).length == 1)[0];
    }
}