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

    this.handleShuffleChararcters = this.handleShuffleChararcters.bind(this)
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
}







export default App;