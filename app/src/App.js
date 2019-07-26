import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Item from './components/Item';
import Footer from './components/Footer';
import characters from "./characters.json";
import './App.css';

class App extends Component {
  // Setting the initial state of the App component
  constructor() {
    super()

    this.handleCharacterShuffle = this.handleCharacterShuffle.bind(this)
  }

  //values
  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: "Click a Waldo to begin!",
    messageClass: "",
    characters: characters
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let tempVal;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
    }
  }
}



handleChararcterShuffle = (name) => {
  // this.handleResetWin();
  var resetNeeded = false;
  const characters = this.state.characters.map(ch => {
    //ch.name === name ? { ...ch, isClicked: true } : ch
    if(ch.name === name) {
      if (ch.isClicked === false) {
        this.handleCorrectChoice()
        return { ...ch, isClicked: true}
      }else{
        resetNeeded = true
        return { ...ch, isClicked: false}
      }
    }
    return ch
  })

  if (resetNeeded) {
    this.setState({
      characters: this.shuffle(this.handleIncorrectChoice()),
      messageClass:"incorrect"
    })
    
  }else{
    //check if game is won before rendering characters
    this.setState({ characters: this.shuffle(this.handleResetWin(characters)) })
  }
  
}



export default App;