export default class Sedoku extends React.Component({ board }){
    this.board = function(b){
    }
    
    solve(){
        [
            ["5","6"," ","8","4","7"," "," "," "],
            ["6","8","7"," ","3","9"," ","6"," "],
            [" ","7"," ","9"," "," ","8"," "," "],
            ["8"," ","9","6"," "," "," ","8"," "],
            ["4","3"," "," "," "," ","4","6","8"],
            ["7","9"," "," "," "," ","2"," "," "],
            [" "," ","8"," ","4","2"," "," "," "],
            [" ","6"," ","8","6"," "," "," ","7"],
            [" "," "," "," ","8"," "," ","7","9"]]
    }

    render(){
        return <div>{JSON.stringify(board)}</div>
    };
}



const domContainer = document.querySelector('#sedoku_container');
ReactDOM.render(camera, domContainer);