var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"]
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
let currTile;
let otherTile;

window.onload = function () {
    startgame()
}
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startgame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");// create candy
            tile.id = r.toString() + "-" + c.toString();//give a specific box
            tile.src = "./images/" + randomCandy() + ".png";//give color

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);//Click on a candy and intialize drag process
            tile.addEventListener("dragover", dragOver);//clcking on a candy ,moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter);//dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave);//leave candy over another candy
            tile.addEventListener("drop", dragDrop);//dropping a candy over another candy 
            tile.addEventListener("dragend", dragEnd);//after drag process completed we swap candy

            document.getElementById("board").append(tile);//show candy on screen
            row.push(tile);

        }
        board.push(row);
    }
    console.log(board)
}

function dragStart() {
    currTile = this;
}
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {


    let currCords = currTile.id.split("-");//id="0-0" => ["0","0"]
    let r = parseInt(currCords[0]);
    let c = parseInt(currCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);

    let moveletf = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;

    let moveup = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjecent = moveletf || moveRight || moveup || moveDown;

    if (isAdjecent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

    }

}


function crushCandy(){
    crushThree()
}

function crushThree(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let candy1=board[r][c];
              let candy2=board[r][c+1];
                let candy3=board[r][c2];
                if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                    candy1.src="./images/blank.png";
                     candy2.src="./images/blank.png";
                      candy3
                      .src="./images/blank.png";
                }
        }
    }
}