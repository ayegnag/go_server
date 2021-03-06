import React, { Component } from "reactn";
import Home from "./pages/home/home";
import Game from "./pages/game/game";
import Header from "./components/header/header";
import "./App.scss";
import loading from "./pages/home/loading.gif";
import openSocket from "socket.io-client";

const baseUrl = window.location.origin;
const socket = openSocket(baseUrl);

class App extends Component {
  constructor(props) {
    super(props);
    this.typingTimer = null;
  }
  state = {
    page: "home",
    wait: false,
    wrongCode: false
  };

  showWaiting = show => {
    this.setState({ wait: show });
  };

  gamePage = () => {
    this.setState({ page: "game" });
  };

  playSolo = selectedSize => {
    this.setGlobal({
      boardSize: selectedSize,
      remoteGame: false
    });
    this.gamePage();
  };

  createGame = (selectedSize, selectedStone, code) => {
    console.log("createGame:", selectedSize, selectedStone, code);
    socket.emit("joinRoom", code);
    this.setGlobal({
      gameCode: code,
      thisPlayerStone: selectedStone,
      boardSize: selectedSize,
      remoteGame: true,
      creator: true
    });
    this.gamePage();
  };

  joinGame = code => {
    console.log("joinGame:", code);
    socket.emit("joinGame", code);
    this.showWaiting(true);
    this.setState({
      wait: true
    });
    this.setGlobal({
      remoteGame: true,
      gameCode: code,
      creator: false
    });
  };

  sendShout = emoName => {
    const { gameCode } = this.global;
    console.log("sendShout:", emoName);
    socket.emit("sendShout", { gameCode, shout: emoName });
  };

  sendChat = msg => {
    const { gameCode } = this.global;
    console.log("sendChat:", msg);
    socket.emit("chatMsg", { roomId: gameCode, msg });
  };

  notTyping = () => {
    const { gameCode } = this.global;
    socket.emit("notTyping", gameCode);
  };

  isTyping = () => {
    const { gameCode } = this.global;
    socket.emit("typing", gameCode);
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.notTyping, 2000);
  };

  remoteUpdate = () => {
    const {
      boardData,
      turn,
      moveCount,
      gameCode,
      passed,
      gameOver
    } = this.global;
    socket.emit("gameMove", {
      data: { boardData, turn, moveCount, passed, gameOver },
      room: gameCode
    });
  };

  clearStorage = () => {
    localStorage.removeItem("board");
    localStorage.removeItem("history");
    localStorage.removeItem("moveCount");
    localStorage.removeItem("turn");
  };

  componentDidMount() {
    // setInterval(() => {
    //   socket.emit("heartbeat");
    //   console.log("Sent heartbeat");
    // }, 5000);

    socket.on("requestGame", data => {
      console.log("TCL: App -> componentDidMount -> requestGame");
      const {
        boardSize,
        boardData,
        thisPlayerStone,
        gameCode,
        turn,
        moveCount,
        passed
      } = this.global;
      socket.emit("sendSetup", {
        boardSize,
        boardData,
        otherPlayer: thisPlayerStone,
        gameCode,
        turn,
        moveCount,
        passed
      });
    });

    socket.on("wrongCode", () => {
      this.setState({
        wrongCode: true,
        wait: false
      });
    });

    socket.on("gotShout", shout => {
      this.setGlobal({ shout });
    });

    socket.on("typing", () => {
      this.setGlobal({ isTyping: true });
    });

    socket.on("stopTyping", () => {
      this.setGlobal({ isTyping: false });
    });

    socket.on("setupGame", data => {
      console.log("TCL: App -> componentDidMount -> setupGame", data);
      this.gamePage();
      const {
        boardSize,
        boardData,
        otherPlayer,
        turn,
        moveCount,
        passed
      } = data;
      this.setGlobal({
        boardSize,
        boardData,
        turn,
        moveCount,
        passed,
        thisPlayerStone: otherPlayer === 2 ? 1 : 2
      });
      this.setState({ wait: false });
    });

    socket.on("turnData", data => {
      console.log("Received turnData:", data);
      const { boardData, turn, moveCount, passed, gameOver } = data;
      if (Object.keys(boardData).length > 1) {
        this.setGlobal({
          boardData,
          turn,
          moveCount,
          passed,
          gameOver
        });
      }
    });
    socket.on("gotChat", data => {
      const { msg, timeStamp } = data;
      console.log("Received chat msg:", data);
      this.setGlobal(prevState => {
        return {
          newMsg: true,
          msgQueue: [
            ...prevState.msgQueue,
            {
              message: msg,
              timeStamp,
              thisPlayer: false
            }
          ]
        };
      });
    });
  }

  render() {
    const { gameCode } = this.global;
    const { page, wait, wrongCode } = this.state;
    return (
      <div className="App">
        {wait && (
          <div className="loading">
            <img src={loading} alt="Loading..." />
          </div>
        )}
        {page === "home" && (
          <>
            <Header className="headerBar" goHome />
            <Home
              createGame={this.createGame}
              joinGame={this.joinGame}
              playSolo={this.playSolo}
              focusInput={wrongCode}
            />
          </>
        )}
        {page === "game" && (
          <Game
            sendUpdate={this.remoteUpdate}
            code={gameCode}
            sendShout={this.sendShout}
            sendChat={this.sendChat}
            isTyping={this.isTyping}
          />
        )}
        <div className="footerBar">Go (ver: 1.1b) a game by Gangeya.</div>
      </div>
    );
  }
}

export default App;
