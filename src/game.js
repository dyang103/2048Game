/*
Add your code for Game here
*/

export default class game {

    constructor(dim) {
        this.dim = dim;
        this.board = [];
        this.score = 0;
        this.won = false;
        this.over = false;
        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
        this.onWinArr = [];
        this.onLoseArr = [];
        this.onMoveArr = [];

        this.setupNewGame();
    }

    newTile() {
        let rand = Math.floor(Math.random() * Math.floor(100));

        if (rand <= 89) {
            return 2;
        } else {
            return 4;
        }
    }

    addTile(board) {
        let index = Math.floor(Math.random() * Math.floor(board.length));
        let occupied = true;

        while (occupied === true) {
            if (board[index] === 0) {
                break;
            } else {
                index = Math.floor(Math.random() * Math.floor(board.length));
            }
        }

        board[index] = this.newTile();
    }

    setupNewGame() {
        for (let i = 0; i < (this.dim ** 2); i++) {
            this.board[i] = 0;
        }

        this.addTile(this.board);
        this.addTile(this.board);

        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
    }

    loadGame(gameState) {
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;

        this.gameState = {
            board : this.board,
            score : this.score,
            won : this.won,
            over : this.over
        }
    }

    shift(arr) {
        let j = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                j++;
            }
        }

        return arr;
    }

    merge(arr) {
        this.shift(arr);

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1] && arr[i - 1] !== 0) {
                arr[i - 1] *= 2;
                arr[i] = 0;
                this.score += arr[i - 1];
            }
        }

        return this.shift(arr);
    }

    moveUp(board) {
        for (let i = 0; i < this.dim; i++) {
            let j = i;
            let tempIndex = 0;
            let tempArr = [];

            while (j < board.length) {
                tempArr[tempIndex] = board[j];
                j += this.dim;
                tempIndex++;
            }
            this.merge(tempArr);

            j = i;
            tempIndex = 0;

            while (j < board.length) {
                board[j] = tempArr[tempIndex];
                j += this.dim;
                tempIndex++;
            }
        }

        return board;
    }

    moveDown(board) {
        for (let i = 0; i < this.dim; i++) {
            let j = i;
            let tempIndex = 0;
            let tempArr = [];

            while (j < board.length) {
                tempArr[tempIndex] = board[j];
                j += this.dim;
                tempIndex++;
            }
            tempArr = tempArr.reverse();
            this.merge(tempArr);

            j = i;
            tempIndex = tempArr.length - 1;

            while (j < board.length) {
                board[j] = tempArr[tempIndex];
                j += this.dim;
                tempIndex--;
            }
        }

        return board;
    }

    moveLeft(board) {
        let index = 0;

        for (let i = 0; i < board.length; i += this.dim) {
            let tempArr = board.slice(i, i + this.dim);
            this.merge(tempArr);

            for (let j = 0; j < tempArr.length; j++) {
                board[index] = tempArr[j];
                index++;
            }
        }

        return board;
    }

    moveRight(board) {
        let index = 0;

        for (let i = 0; i < board.length; i += this.dim) {
            let tempArr = board.slice(i, i + this.dim);
            tempArr = tempArr.reverse();
            this.merge(tempArr);

            for (let j = tempArr.length - 1; j > -1; j--) {
                board[index] = tempArr[j];
                index++;
            }
        }

        return board;
    }

    isDone(board) {
        let count = 0;
        let full = false;
        let winner = false;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === 0) {
                count++;
            }
            if (board[i] === 2048) {
                winner = true;
            }
        }

        if (count === 0) {
            full = true;
        }

        return {
            full : full,
            winner : winner
        };
    }

    move(direction) {
        let prev = this.board.slice()

        if (direction.localeCompare("up") === 0) {
            this.moveUp(this.board);
        } else if (direction.localeCompare("down") === 0) {
            this.moveDown(this.board);
        } else if (direction.localeCompare("left") === 0) {
            this.moveLeft(this.board);
        } else {
            this.moveRight(this.board);
        }

        if (JSON.stringify(this.board) !== JSON.stringify(prev)) {
            this.addTile(this.board);
            this.onMoveArr.forEach(callback => {
                callback(this.gameState);
            });

            if (this.isDone(this.board).winner) {
                this.won = true;
                this.gameState = {
                    board : this.board,
                    score : this.score,
                    won : this.won,
                    over : this.over
                }
                this.onWinArr.forEach(callback => {
                    callback(this.gameState);
                });
            }

            if (this.isDone(this.board).full) {
                let overCheck = this.board.slice();
                let prevScore = this.score;
                this.moveLeft(overCheck);
                this.moveRight(overCheck);
                this.moveUp(overCheck);
                this.moveDown(overCheck);

                this.score = prevScore;

                if (JSON.stringify(this.board) === JSON.stringify(overCheck)) {
                    this.over = true;
                    this.gameState = {
                        board : this.board,
                        score : this.score,
                        won : this.won,
                        over : this.over
                    }
                    this.onLoseArr.forEach(callback => {
                        callback(this.gameState);
                    });
                }
            }

            this.gameState = {
                board : this.board,
                score : this.score,
                won : this.won,
                over : this.over
            }
        }
    }

    toString() {
        return this.board;
    }

    onMove(callback) {
        this.onMoveArr.push(callback);
    }

    onWin(callback) {
        this.onWinArr.push(callback);
    }

    onLose(callback) {
        this.onLoseArr.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

}
