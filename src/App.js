import React, { Component } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateBookingForm from './components/CreateBookingForm'
import BookingList from './components/BookingList'
import * as Config from './bestmile/config/config.js'


class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
        <img src={require('./bestmile-logo.ico')}
             alt="HTML5"
             style={{width: 165, height: 45}}/>
          <h1> Bestmile Traveler API Example </h1>
        </div>
        <br />
        <CreateBookingForm
        />
        <div className="ui one column stackable center aligned page grid">
          <BookingList userID={Config.userID} alias={"Native"}/>
          <br />
          <BookingList userID={Config.iOS_userID} alias={"iOS"}/>
          <br />
          <BookingList userID={Config.android_userID} alias={"Android"}/>
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default App;
