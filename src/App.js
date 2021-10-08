import "./App.css";
import React from 'react';
import Game from "./game.js"


class Header extends React.Component {
  render() {
    return (
      <div className = "header">
        <h1 style = {{'fontSize' : '50px', 'marginLeft' : '30px'}}>2048 Game</h1>
        <p style = {{'fontSize' : '20px', 'marginLeft' : '30px'}}>2048 is a tile merging game, where the player aims to combine tiles to create 2048.</p>
        <p style = {{'fontSize' : '20px', 'marginLeft' : '30px', 'marginRight' : '30px'}}>The player can choose the direction to merge all tiles every turn using the arrow keys. In order to win the game, the player must continue merging tiles until a 2048 tile is created. However, in the case that the board is filled and no more merges can be made, the player will lose the game. After every move by the player, a new tile either with value 2 or 4 will be added to an empty tile on the board.</p>
      </div>
    );
  }
}

class Tile extends React.Component {
  render() {
    return (
      <div className = {this.props.className}>
        {this.props.val}
      </div>
    )
  }
 }

class GameBoard extends React.Component {
  renderTile(i) {
    let tileClass = "tile";

    if (i === 2) {
      tileClass = "tile two";
    } else if (i === 4) {
      tileClass = "tile four";
    } else if (i === 8) {
      tileClass = "tile eight";
    } else if (i === 16) {
      tileClass = "tile sixteen";
    } else if (i === 32) {
      tileClass = "tile thirtytwo";
    } else if (i === 64) {
      tileClass = "tile sixtyfour";
    } else if (i === 128) {
      tileClass = "tile onetwentyeight";
    } else if (i === 256) {
     tileClass = "tile twofiftysix";
    } else if (i === 512) {
     tileClass = "tile fivetwelve";
    } else if (i === 1024) {
     tileClass = "tile thousandtwentyfour";
    } else if (i === 2048) {
     tileClass = "tile twentyfortyeight";
    }

    return <Tile className = {tileClass} val = {i}/>;
  }

  render() {
    const score = "Score : " + this.props.game.score;
    const wonGame = "Won : " + this.props.game.won;
    const lostGame = "Over : " + this.props.game.over;

    return (
      <div>
        <div className = "scoreBoard">{score}</div>
        <div className = "scoreBoard">{wonGame}</div>
        <div className = "scoreBoard">{lostGame}</div>
        <div className = "gameBoard" style = {{'display' : 'grid', 'marginLeft' : '30px', 'marginTop' : '30px'}}>
          <div className = "board-row">
            {this.renderTile(this.props.game.board[0])}
            {this.renderTile(this.props.game.board[1])}
            {this.renderTile(this.props.game.board[2])}
            {this.renderTile(this.props.game.board[3])}
          </div>
          <div className = "board-row">
            {this.renderTile(this.props.game.board[4])}
            {this.renderTile(this.props.game.board[5])}
            {this.renderTile(this.props.game.board[6])}
            {this.renderTile(this.props.game.board[7])}
          </div>
          <div className = "board-row">
            {this.renderTile(this.props.game.board[8])}
            {this.renderTile(this.props.game.board[9])}
            {this.renderTile(this.props.game.board[10])}
            {this.renderTile(this.props.game.board[11])}
          </div>
          <div className = "board-row">
            {this.renderTile(this.props.game.board[12])}
            {this.renderTile(this.props.game.board[13])}
            {this.renderTile(this.props.game.board[14])}
            {this.renderTile(this.props.game.board[15])}
          </div>
        </div>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new Game(4);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = this.game.gameState;
  }

  handleKeyDown(e) {
    let key = e.keyCode;
  
    switch(key) {
      case 37 : 
        e.preventDefault();
        this.game.move("left");
        this.setState(this.game.gameState);
        break;
      case 38 :
        e.preventDefault();
        this.game.move("up");
        this.setState(this.game.gameState);
        break;
      case 39 :
        e.preventDefault();
        this.game.move("right");
        this.setState(this.game.gameState);
        break;
      case 40 :
        e.preventDefault();
        this.game.move("down");
        this.setState(this.game.gameState);
        break;
      default : 
        break;
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.game = new Game(4);
    this.setState(this.game.gameState);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.setState();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className = "game">
        <Header />
        <GameBoard game = {this.game}/>
        <button className = "reset" onClick = {this.handleClick}>
          Reset
        </button>
      </div>
    );
  }
}


export default App;