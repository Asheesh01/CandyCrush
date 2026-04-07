var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"]
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
let currTile;
let otherTile;

window.onload = function () {
    startgame();
    score = 0;
    window.setInterval(function () {
        crushCandy();
        slideCandy();
        genrateCandy();
    }, 10);

    // Reset score after the board finishes auto-crushing
    // any accidental 3-in-a-row from the random initial placement
    setTimeout(function () {
        score = 0;
        document.getElementById("score").innerText = 0;
    }, 500);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startgame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Mouse / Desktop drag events
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Touch / Mobile events
            tile.addEventListener("touchstart", touchStart, { passive: false });
            tile.addEventListener("touchmove", touchMove, { passive: false });
            tile.addEventListener("touchend", touchEnd, { passive: false });

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}


//  DRAG HANDLERS (desktop)

function dragStart() { currTile = this; }
function dragOver(e) { e.preventDefault(); }
function dragEnter(e) { e.preventDefault(); }
function dragLeave() { }
function dragDrop() { otherTile = this; }

function dragEnd() {
    swapTiles(currTile, otherTile);
}


//  TOUCH HANDLERS (mobile)
function touchStart(e) {
    e.preventDefault();
    currTile = this;
    // Highlight selected tile
    currTile.style.opacity = "0.6";
}

function touchMove(e) {
    e.preventDefault(); // prevents page scrolling while dragging
}

function touchEnd(e) {
    e.preventDefault();
    currTile.style.opacity = "1";

    // Find which tile the finger was released over
    let touch = e.changedTouches[0];
    let endTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (endTarget && endTarget.tagName === "IMG" && endTarget !== currTile) {
        otherTile = endTarget;
        swapTiles(currTile, otherTile);
    }
}

//  SHARED SWAP LOGIC
function swapTiles(tile1, tile2) {
    if (!tile1 || !tile2) return;
    if (tile1.src.includes("blank") || tile2.src.includes("blank")) return;

    let cords1 = tile1.id.split("-");
    let r = parseInt(cords1[0]);
    let c = parseInt(cords1[1]);

    let cords2 = tile2.id.split("-");
    let r2 = parseInt(cords2[0]);
    let c2 = parseInt(cords2[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let img1 = tile1.src;
        let img2 = tile2.src;
        tile1.src = img2;
        tile2.src = img1;

        if (!isValid()) {
            // Revert if no match
            tile1.src = img1;
            tile2.src = img2;
        }
    }
}

//  GAME LOGIC
function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    // Horizontal matches
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 10;
            }
        }
    }
    // Vertical matches
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 10;
            }
        }
    }
}

function isValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function genrateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}