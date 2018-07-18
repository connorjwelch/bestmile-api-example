import React from 'react'
import './Booking.css'
import { Form, Button, Select, Message, Header } from 'semantic-ui-react'
import { string, object, array, func, bool } from 'prop-types'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import moment from 'moment'

const baseURL = "https://api.partner.gce1.bestmile.io"
const userID = "Connor"
const site = "19d80f6a-b1fe-4455-aa9c-193186bec620"
const apiKey = "32aa5ee39f9e4ecd91b763a2034825a5"

class CreateBookingForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.estimatePickup = this.estimatePickup.bind(this)
    this.estimateDropoff = this.estimateDropoff.bind(this)
  }
  static propTypes = {
    sites: array
  }
  static defaultProps = {
    sites: []
  }
  state = {}

  estimatePickup() {
    axios({
      method: 'get',
      url: baseURL + "/v1/travel/sites/" + site + "/estimates/pickup",
      headers: {'Content-Type': 'application/json', 'apikey': apiKey},
      params: {
        pickupLatitude: this.state.pickupLat,
        pickupLongitude: this.state.pickupLng
      },
      data: {}
    })
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

  estimateDropoff() {

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: parseFloat(e.target.value)
    }, () => {
      if(this.state.pickupLat!=null && this.state.pickupLng!=null &&
         this.state.dropoffLat!=null && this.state.dropoffLng!=null) {
          this.estimatePickup()
          this.estimateDropoff()
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios({
      method: 'post',
      url: baseURL + "/v1/travel/users/" + userID + "/bookings",
      headers: {'Content-Type': 'application/json', 'apikey': apiKey},
      params: {
        srid: 4326
      },
      data: {
        userID: userID,
        seatCount: 2,
        siteID: site,
        itinerary: [
          {
            start: {
              position: {
                srid: 4326,
                coordinate: [this.state.pickupLat, this.state.pickupLng]
              }
            },
            end: {
              position: {
                srid: 4326,
                coordinate: [this.state.dropoffLat, this.state.dropoffLng]
              }
            },
            siteID: site,
            domainID: 0
          }
        ]
      }
    })
    .then(response => {
      toast.success("Booking Created", {
        position: toast.POSITION.BOTTOM_CENTER
      })
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
