import React from 'react'
import './Booking.css'
import { Form, Button } from 'semantic-ui-react'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { createBooking, estimatePickup, estimateDuration } from '../bestmile/APIConnection.js'


class CreateBookingForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getPickupDuration = this.getPickupDuration.bind(this)
  }

  state = {}

  getPickupDuration() {
    estimatePickup(this.state.pickupLat, this.state.pickupLng)
    .then(response => {
      toast.info("Your ride will arrive in " +
        moment.duration(response.data.result.durationToPickup).humanize(), {
          position: toast.POSITION.TOP_CENTER
        }
      )
    })
    .catch(error => {
      console.log(error)
    })
  }

  getTripDuration() {
    estimateDuration(this.state.pickupLat, this.state.pickupLng,
      this.state.dropoffLat, this.state.dropoffLng)
    .then(response => {
      toast.info("Your trip will take " +
        moment.duration(response.data.result.durationFromPickupToDropoff)
        .humanize(), {
          position: toast.POSITION.TOP_CENTER
        }
      )
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: parseFloat(e.target.value)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    createBooking(this.state.pickupLat, this.state.pickupLng,
      this.state.dropoffLat, this.state.dropoffLng)
    .then(response => {
      toast.success("Booking Created", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      this.getPickupDuration()
      this.getTripDuration()
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h1> Create Booking </h1>
        <Form className="BookingForm"
          onSubmit = {this.handleSubmit}
        >
          <Form.Input fluid
            label="Pickup Latitude"
            type="text"
            name="pickupLat"
            onChange = {this.handleChange}
            required
          />
          <br />
          <Form.Input fluid
            label="Pickup Longitude"
            type="text"
            name="pickupLng"
            onChange = {this.handleChange}
            required
          />
          <br />
          <Form.Input fluid
            label="Dropoff Latitude"
            type="text"
            name="dropoffLat"
            onChange = {this.handleChange}
            required
          />
          <br />
          <Form.Input fluid
            label="Dropoff Longitude"
            type="text"
            name="dropoffLng"
            onChange = {this.handleChange}
            required
          />
          <br />
          <Button className="SubmitButton"
            onSubmit={this.handleSubmit}>
            Submit
          </Button>
          <ToastContainer />
        </Form>
      </div>
    )
  }
}
export default CreateBookingForm
