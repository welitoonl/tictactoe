class TicTacToe {
    constructor(level) {
        this.player = 'X';
        this.victory = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.estrategyPositions = [4, 0, 2, 6, 8];
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.game = document.getElementById('game');
        this.level = level;
    }

    play(position) {
        const cell = this.game.querySelector('[data-position="' + position + '"]');

        if (this.board[position] === '') {
            this.board[position] = this.player;
            cell.innerHTML = this.player;
            this.player = (this.player === 'X') ? 'O' : 'X';
            
            if (this.checkWinner() !== '') {
                alert(`${this.checkWinner()} wins!`);
                this.restart();
            } else if (this.checkDraw()) {
                alert('Draw!');
                this.restart();
            }

            if(this.player === 'O') {
                this.playComputer();
            }

            return true;
        }

        if(this.player === 'O') {
            this.playComputer();
        }
        
        return false;
    }
    
    checkWinner() {
        for (let position of this.victory) {
            if (this.board[position[0]] === this.board[position[1]] &&
                this.board[position[1]] === this.board[position[2]] &&
                this.board[position[0]] !== '') {
                return this.board[position[0]];
            }
        }
        return '';
    }

    checkDraw() {
        for (let position of this.board) {
            if (position === '') {
                return false;
            }
        }
        return true;
    }

    restart() {
        this.player = 'X';
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.game.querySelectorAll('.cell').forEach((cell) => { cell.innerHTML = ''});
        this.estrategyPositions = [4, 0, 2, 6, 8];
    }

    playComputer() {
        switch (this.level) {
            case 'easy':
                this.stupidComputer();
                return;
            case 'medium':
                this.mediumComputer();
                return;
            case 'hard':
                this.smartComputer();
                return;
        }
    }

    stupidComputer() {
        let position = Math.floor(Math.random() * 9);
        while (this.board[position] !== '') {
            position = Math.floor(Math.random() * 9);
        }
        this.play(position);
    }

    mediumComputer() {
        if (this.defendRandom()) {
            return;
        }

        this.attackRandom();
    }

    smartComputer() {
        if (this.winGame()) {
            return;
        } 

        if (this.defendRandom()) {
            return;
        }

        if(this.defendEstrategy()) {
            return;
        }

        this.attackRandom();
    }

    defendRandom() {
        for (let position of this.victory) {
            if (this.board[position[0]] === 'X' &&
                this.board[position[1]] === 'X' &&
                this.board[position[2]] === '') {
                    this.play(position[2]);
                    return true;
            } else if (this.board[position[1]] === 'X' &&
                this.board[position[2]] === 'X' &&
                this.board[position[0]] === '') {
                    this.play(position[0]);
                    return true;
            } else if (this.board[position[0]] === 'X' &&
                this.board[position[2]] === 'X' &&
                this.board[position[1]] === '') {
                    this.play(position[1]);
                    return true;
            }
        }
        return false;
    }

    defendEstrategy() {
        if(this.board[4] === 'X') {
            for(let position of this.estrategyPositions) {
                if(this.board[position] === '') {
                    this.play(position);
                    return true;
                }
            }
        }

        const estrategyPositions = this.estrategyPositions;
        this.estrategyPositions = [];

        for (let position of estrategyPositions) {
            if (this.board[position] === 'X') {
                switch (position) {
                    case 0:
                        if(this.board[8] === '') {
                            this.play(8);
                            return true;
                        }
                    case 2:
                        if(this.board[6] === '') {
                            this.play(6);
                            return true;
                        }
                    case 6:
                        if(this.board[2] === '') {
                            this.play(2);
                            return true;
                        }
                    case 8:
                        if(this.board[0] === '') {
                            this.play(0);
                            return true;
                        }
                }
            }
        }

        if(this.board[4] === '') {
            this.play(4);
            return true;
        }

        return false;
    }

    attackRandom() {
        for (let position of this.victory) {
            if (this.board[position[0]] === this.board[position[1]] &&
                this.board[position[1]] === '') {
                    this.play(position[1]);
                    return;
            } else if (this.board[position[1]] === this.board[position[2]] &&
                this.board[position[2]] === '') {
                    this.play(position[2]);
                    return;
            } else if (this.board[position[0]] === this.board[position[2]] &&
                this.board[position[0]] === '') {
                    this.play(position[0]);
                    return;
            }
        }
    }

    winGame() {
        for (let position of this.victory) {
            if (this.board[position[0]] === this.board[position[1]] &&
                this.board[position[1]] === 'O' && this.board[position[2]] === '') {
                    this.play(position[2]);
                    return true;
            } else if (this.board[position[1]] === this.board[position[2]] &&
                this.board[position[2]] === 'O' && this.board[position[0]] === '') {
                    this.play(position[0]);
                    return true;
            } else if (this.board[position[0]] === this.board[position[2]] &&
                this.board[position[0]] === 'O' && this.board[position[1]] === '') {
                    this.play(position[1]);
                    return true;
            }
        }
        return false;
    }
}

var ticTacToe = '';

document.querySelector('#level').addEventListener('click', function(event) {
    const level = event.target.getAttribute('data-level');
    ticTacToe = new TicTacToe(level);
    document.querySelector('#level').style.display = "none";
    document.querySelector('#game').style.display = "block";
});

document.querySelector('#game').addEventListener('click', function(event) {
    const position = event.target.getAttribute('data-position');
    ticTacToe.play(position);
});


