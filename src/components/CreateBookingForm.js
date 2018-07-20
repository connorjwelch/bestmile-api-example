import React from 'react'
import axios from 'axios'
import './Booking.css'
import { Form, Button } from 'semantic-ui-react'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { createBooking, estimatePickup, estimateDuration, getPickupAndDropoffLatLng } from '../bestmile/APIConnection.js'


class CreateBookingForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getPickupDuration = this.getPickupDuration.bind(this)
  }

  state = {}

  getPickupDuration(pickupLat, pickupLng) {
    estimatePickup(pickupLat, pickupLng)
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

  getTripDuration(pickupLat, pickupLng, dropoffLat, dropoffLng) {
    estimateDuration(pickupLat, pickupLng, dropoffLat, dropoffLng)
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
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this)
    getPickupAndDropoffLatLng(this.state.pickup, this.state.dropoff)
      .then(axios.spread((pickup, dropoff) => {
        var pickup_location = pickup.data.results[0].geometry.location
        var dropoff_location = dropoff.data.results[0].geometry.location
        createBooking(pickup_location.lat, pickup_location.lng,
          dropoff_location.lat, dropoff_location.lng)
          .then(response => {
            toast.success("Booking Created", {
              position: toast.POSITION.BOTTOM_CENTER
            })
            this.getPickupDuration(pickup_location.lat, pickup_location.lng)
            this.getTripDuration(pickup_location.lat, pickup_location.lng,
              dropoff_location.lat, dropoff_location.lng)
          })
          .catch(error => {
            console.log(error)
          })
      }))
      .catch(error => {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_CENTER
        })
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
            label="Pickup"
            type="text"
            name="pickup"
            onChange = {this.handleChange}
            required
          />
          <br />
          <Form.Input fluid
            label="Dropoff"
            type="text"
            name="dropoff"
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
