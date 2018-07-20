import React, { Component } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateBookingForm from './components/CreateBookingForm'
import BookingList from './components/BookingList'



class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h1> Bestmile Traveler API Example </h1>
        </div>
        <CreateBookingForm
          sites={["Dallas"]}
        />
        <div className="ui one column stackable center aligned page grid">
          <BookingList />
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default App;
