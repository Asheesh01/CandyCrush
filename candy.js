var candies=["Blue","Orange","Green","Yellow","Red","Purple"]
var board =[];
var rows=9;
var columns=9;
var score=0;

window.onload=function(){
    startgame()
}
function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}

function startgame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            let tile=document.createElement("img");
            tile.id=r.toString()+ "-" + c.toString();
            tile.src="./images/" + randomCandy() +".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("dragdrop",dragDrop);
            tile.addEventListener("dragend",dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);

        }
        board.push(row);
    }
    console.log(board)
}
