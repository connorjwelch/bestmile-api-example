import React from 'react'
import './Booking.css'
import { Table, Menu, Icon } from 'semantic-ui-react'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BookingRow from './BookingRow'
import { fetchBookings, cancelBooking } from '../bestmile/APIConnection.js'

class BookingList extends React.Component {
  constructor(props) {
    super(props)
    this.updateBookings = this.updateBookings.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
    this.onForwardClick = this.onForwardClick.bind(this)
    this.state = { bookings: [], summary: {}, loaded: false, total: 0, pageSize: 10,
                   currentPage: 1}
    this.updateBookings()
    setInterval(this.updateBookings, 5000)
  }

  updateBookings() {
    fetchBookings(this.props.userID, this.state.currentPage, this.state.pageSize)
    .then(response => {
      if(this.state.pages == null) {
        var totalPages = Math.ceil(response.data.total/this.state.pageSize)
        var pages = []
        for(var i = 2; i <= totalPages; i++) {
          pages.push(
            <Menu.Item key={i}>{i}</Menu.Item>
          )
        }
        this.setState({ pages: pages,
                        numPages: totalPages})
      }
      this.setState({ bookings : response.data.result,
                      summary: response.data.clusters.status.children,
                      loaded: true,
                      total: response.data.total
                      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  onBackClick(e) {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        loaded: false
      }, () => this.updateBookings())
    }
  }

  onForwardClick(e) {
    console.log(this.state)
    if(this.state.currentPage < this.state.numPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        loaded: false
      }, () => this.updateBookings())
    }
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
        {this.state.loaded===false &&
          <div className="ui active centered inline loader"></div>}
        <Table celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>BookingID</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
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
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu floated='right' pagination>
                  <Menu.Item key='back' icon onClick={this.onBackClick}>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item key = "1">1</Menu.Item>
                  {this.state.pages}
                  <Menu.Item key='forward' icon onClick={this.onForwardClick}>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <br />
        {this.props.alias === "Native" &&
        <div>
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
      </div>}
      </div>
    )
  }
}
export default BookingList
