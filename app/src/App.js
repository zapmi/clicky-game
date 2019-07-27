import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Item from './components/Item';
import Footer from './components/Footer';
import characters from "./characters.json";
// import './App.css';

class App extends Component {
    // Setting the initial state of the App component
    constructor(){
      super()
  
      this.handleCharacterShuffle = this.handleCharacterShuffle.bind(this)
    }
  
    state = {
      score: 0,
      topScore: 0,
      maxScore: 12,
      message: "Clicky Game!",
      messageClass: "",
      characters: characters
    };
  
    shuffle = (array) => {
      let currentIndex = array.length;
      let tempVal;
      let randomIndex;
  
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        tempVal = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempVal;
      }
  
      return array;
    }
  
    handleCorrectChoice = () => {
      
      if (this.state.score+1 > this.state.topScore) {
        this.setState({topScore: this.state.topScore+1})
      }
      if (this.state.score+1 === this.state.maxScore) {
        this.setState({score: this.state.score+1, message: "You win!!", messageClass:"correct"})
      }else{
        this.setState({score: this.state.score+1, message: "You guessed right!", messageClass:"correct"})
      }
    }
  
    handleResetWin = (currentCharacters) => {
      //if current score is at max reset score to 0 and topscore to 0
      if (this.state.score+1 === this.state.maxScore) {
        this.setState({score: 0, topScore: 0})
        //reset clicked state for characters
        const updatedCharacters = currentCharacters.map(ch => (true) ? { ...ch, isClicked: false } : ch)
        return updatedCharacters
      }else{
        return currentCharacters
      }
    }
  
    handleIncorectChoice = () => {
      //incorrect selection made, reset score to 0
      this.setState({score: 0, message: "You guessed wrong!"})
      //reset clicked state for characters
      const updatedCharacters = this.state.characters.map(ch => ch.isClicked === true ? { ...ch, isClicked: false } : ch)
      return updatedCharacters
    }
  
  
    handleCharacterShuffle = (name) => {
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
          characters: this.shuffle(this.handleIncorectChoice()),
          messageClass:"incorrect"
        })
        
      }else{
        //check if game is won before rendering characters
        this.setState({ characters: this.shuffle(this.handleResetWin(characters)) })
      }
      
    }
  
    handleCharacterRender = () => {
      return this.state.characters.map((character) =>
              <Item 
                image={character.image} 
                name={character.name} 
                key={character.id} 
                onClick={this.handleCharacterShuffle} 
              />
            );
    }
  
    render() {
      return (
        <div className="App">
          <Navbar
            score={this.state.score}
            topscore={this.state.topScore}
            message={this.state.message}
            messageClass={this.state.messageClass}
          />
          <Header />
          <div className="content">
            {this.handleCharacterRender()}
          </div>
          <Footer />
        </div>
      );
    }
  }
  
  export default App;
  