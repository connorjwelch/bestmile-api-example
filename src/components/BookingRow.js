import React from 'react'
import './Booking.css'
import { Table } from 'semantic-ui-react'
import { string, array, func } from 'prop-types'
import { reverseGeocode, getHermesID } from '../bestmile/APIConnection.js'
import moment from 'moment'

class BookingRow extends React.Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.getAddresses = this.getAddresses.bind(this)
    this.state = { status: props.status,
                   origin: "",
                   destination: "",
                   hermesID: ""}
    this.getAddresses()
    this.getVehicle()
  }
  static propTypes = {
    bookingID: string.isRequired,
    origin: array.isRequired,
    destination: array.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
    onCancelClick: func.isRequired,
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.vehicleID !== prevProps.vehicleID) {
      this.getVehicle()
    }
  }
  getAddresses() {
    reverseGeocode(this.props.origin[0], this.props.origin[1])
    .then(response => {
      this.setState({
        origin: response.data.results[0].formatted_address
      })
    })
    .catch(error => {
      console.log(error)
    })

    reverseGeocode(this.props.destination[0], this.props.destination[1])
    .then(response => {
      this.setState({
        destination: response.data.results[0].formatted_address
      })
    })
    .catch(error => {
      console.log(error)
    })

  }

  getVehicle() {
    if(this.props.vehicleID !== "") {
      getHermesID(this.props.vehicleID)
        .then(response => {
          this.setState({
            hermesID: response.data.result.hermesID
          })
        })
        .catch(error => {
          console.log(error)
        })

    }
  }
  onCancel() {
    this.props.onCancelClick(this.props.bookingID)
  }

  render() {
    return (
      <Table.Row key={this.props.bookingID}>
        <Table.Cell>{moment(this.props.createdAt)
                    .format('MMM DD HH:mm')}</Table.Cell>
        <Table.Cell>{this.props.bookingID}</Table.Cell>
        <Table.Cell>{this.state.origin} </Table.Cell>
        <Table.Cell>{this.state.destination} </Table.Cell>
        <Table.Cell>{this.props.status}</Table.Cell>
        <Table.Cell>{this.state.hermesID}</Table.Cell>
        {((this.props.status==="wait" ||
          this.props.status==="vehicleassigned") ?
        <Table.Cell
          selectable
          textAlign='center'
          onClick={this.onCancel}>
          Cancel
        </Table.Cell>
        :
        <Table.Cell
          textAlign='center'>
          N/A
        </Table.Cell>
      )}
      </Table.Row>
    )
  }
}
export default BookingRow
