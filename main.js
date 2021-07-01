'use strict';

class TicTacToe {
  constructor(container) {
    this.state = {
      winCount: {
        player1: 0,
        player2: 0        
      },
      currentPlayer: 0,
      gaming: false
    };
    const template = `
    <div class="title">TIC TAC TOE</div>
    <div class="game__panel">
      <div class="game__score">
      </div>
      <div class="game__board">
      </div>
      <div class="game__control">
        <button id="newGame" class="button">NEW GAME</button>
        <button id="resetGame" class="button">RESET GAME</button>
      </div>
    </div>
    `;
    container.innerHTML = template;
    this.resetGame();

    /* event handler */
    document.querySelector('.game__board').addEventListener('click', (e) => {
      /* 게임중이 아니면 무시 */
      if (this.state.gaming === false) {
        return;
      }

      /* 클릭한 칸 찾고 이미 눌린 칸이면 무시 */
      const target = e.target.closest('.col');
      if (target.classList.contains('selected')) {
        return;
      }

      // select
      target.classList.add('selected');
      target.classList.add(['o-selected', 'x-selected'][this.state.currentPlayer]);

      // justice
      if (this.#justice()) {
        setTimeout(() => alert(`player${this.state.currentPlayer + 1}님 승리하셨습니다`), 100);

        /* 승리 횟수 적용 */
        const currentWinCount = this.state.winCount;
        if (this.state.currentPlayer === 0) {
          currentWinCount.player1++;
        } else {
          currentWinCount.player2++;
        }
        this.setWinCount(currentWinCount.player1, currentWinCount.player2);
        this.state.gaming = false;
        return;
      }
      
      // give turn 
      const scores = document.querySelectorAll('.score');
      scores[this.state.currentPlayer].classList.remove('active');
      this.state.currentPlayer = +!this.state.currentPlayer; // toggle 1 0
      scores[this.state.currentPlayer].classList.add('active');
    });

    document.querySelector('#newGame').addEventListener('click', () => {
      this.newGame();
    });

    document.querySelector('#resetGame').addEventListener('click', () => {
      this.resetGame();
    });
  }

  #justice() {
    let userCharacter = '.o-selected'; // player 1
    if (this.state.currentPlayer === 1) {
      userCharacter = '.x-selected'; // player 2
    }
    const characters = [...document.querySelectorAll(userCharacter)];
    
    // win condition : row
    for (let i = 1; i <= 3; i++) {
      if (characters.filter(c => c.dataset.row === `${i}`).length === 3) {
        return true;
      }
    }

    // win condition : col
    for (let i = 1; i <= 3; i++) {
      if (characters.filter(c => c.dataset.col === `${i}`).length === 3) {
        return true;
      }
    }

    // win condition : diagonal
    let win = false;
    win = win | characters.filter(c => c.dataset.row === c.dataset.col).length === 3;
    win = win | characters.filter(c => (4 - parseInt(c.dataset.row)) === parseInt(c.dataset.col)).length === 3;
    return win;
  }

  resetGame() {
    this.setWinCount(0, 0);
    this.newGame();
  }

  setWinCount(...players) {
    this.state.winCount = { 
      player1: players[0],
      player2: players[1] 
    };

    this.gameScore();
  }

  gameScore() {
    document.querySelector('.game__score').innerHTML = `
    <span class="score player1 ${this.state.currentPlayer == 0 ? 'active' : ''}">${this.state.winCount.player1}</span>
    <span> : </span>
    <span class="score player2 ${this.state.currentPlayer == 1 ? 'active' : ''}">${this.state.winCount.player2}</span>
    `;
  }

  newGame() {
    this.state.gaming = true;
    this.state.currentPlayer = 0;
    this.gameScore();
    document.querySelector('.game__board').innerHTML = `
    <div class="row">
          <div class="col" data-row="1" data-col="1"></div>
          <div class="col" data-row="1" data-col="2"></div>
          <div class="col" data-row="1" data-col="3"></div>
        </div>
        <div class="row">
          <div class="col" data-row="2" data-col="1"></div>
          <div class="col" data-row="2" data-col="2"></div>
          <div class="col" data-row="2" data-col="3"></div>
        </div>
        <div class="row">
          <div class="col" data-row="3" data-col="1"></div>
          <div class="col" data-row="3" data-col="2"></div>
          <div class="col" data-row="3" data-col="3"></div>
        </div>
    `;
  }
}

const container = document.querySelector('.container');
const game = new TicTacToe(container);