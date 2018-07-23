import React from 'react'
import './Booking.css'
import { Table } from 'semantic-ui-react'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BookingRow from './BookingRow'
import { fetchBookings, cancelBooking } from '../bestmile/APIConnection.js'
import * as Config from '../bestmile/config/config.js'

class BookingList extends React.Component {
  constructor(props) {
    super(props)
    this.updateBookings = this.updateBookings.bind(this)
    this.updateBookings()
    setInterval(this.updateBookings, 5000)
  }
  state = {
    bookings: [],
    summary: {}
  }

  updateBookings() {
    fetchBookings(this.props.userID)
    .then(response => {
      this.setState({ bookings : response.data.result,
                      summary: response.data.clusters.status.children})
    })
    .catch(error => {
      console.log(error)
    })
  }

  onCancelClick(bookingID) {
    cancelBooking(bookingID, this.props.userID)
    .then(response => {
      toast.success("Booking Cancelled", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    })
    .catch(error => {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    })
  }
  render() {
    var clusters = []
    for(var cluster in this.state.summary) {
      if(this.state.summary.hasOwnProperty(cluster)) {
        clusters.push(
          <Table.Row key={cluster}>
            <Table.Cell>{cluster}</Table.Cell>
            <Table.Cell>{this.state.summary[cluster].count}</Table.Cell>
          </Table.Row>)
      }
    }
    return (
      <div>
        <br />
        <h1> {this.props.alias + " Bookings"} </h1>
        <Table celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>BookingID</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Vehicle</Table.HeaderCell>
              <Table.HeaderCell>Cancel</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
              {this.state.bookings!=null &&
                this.state.bookings.map(booking => (
                  <BookingRow
                    key={booking.bookingID}
                    bookingID={booking.bookingID}
                    origin={booking.itinerary[0].start.position.coordinate}
                    destination={booking.itinerary[0].end.position.coordinate}
                    vehicleID={booking.vehicleID}
                    createdAt={booking.createdAt}
                    status={booking.status}
                    onCancelClick={this.onCancelClick}>
                  </BookingRow>
              ))}
          </Table.Body>
        </Table>
        <br />
        <h1> Bookings Summary </h1>
        <br />
        <div className="ui one column stackable center aligned page grid">
          <Table celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Count</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {clusters}
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}
export default BookingList
