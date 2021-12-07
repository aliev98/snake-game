import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

const randomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const initialState = {
  food: randomCoordinates(),
  speed : 200,
  direction: "R",
  snakeDots: [
     [0, 0],
     [2, 0],
  ]
}

class App extends Component {
  
  state = initialState

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate(){
    this.outOfBordersCheck()
    this.collapseCheck()
    this.foodEatenCheck()
  }

  onKeyDown = (e) => {
    e = e || window.event
    
    switch (e.keyCode) {
      case 38:
        if(this.state.direction=='D') break
        this.setState({ direction: "U" })
        break;
      case 40:
        if(this.state.direction=='U') break
        this.setState({ direction: "D" })
        break;
      case 37:
        if(this.state.direction=='R') break
        this.setState({ direction: "L" })
        break;
      case 39:
        if(this.state.direction=='L') break
        this.setState({ direction: "R" })
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    switch(this.state.direction){
      case 'R':
      head = [head[0] + 2, head[1]]
      break
      case 'L':
      head = [head[0] - 2, head[1]]
      break
      case 'D':
      head = [head[0], head[1] + 2]
      break
      case 'U':
      head = [head[0], head[1] - 2]
      break
    }
    dots.push(head)
    dots.shift()
    this.setState({snakeDots:dots})
  }

  outOfBordersCheck(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ){
      this.gameOver()
    }
  }

  collapseCheck(){
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if(head[0] == dot[0] && head[1] == dot[1]){
        this.gameOver()
      }
    })
  }

  foodEatenCheck(){
    let head = this.state.snakeDots[this.state.snakeDots.length-1]
    let food = this.state.food

    if(head[0] == food[0] && head[1] == food[1]){
      this.enlargeSnake()
      this.setState({food: randomCoordinates()})
    }
  }

  enlargeSnake(){
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  gameOver(){
    this.setState(initialState)
    this.setState({snakeDots:[randomCoordinates(), randomCoordinates()]})
  }

  render() {
    return (
     <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;