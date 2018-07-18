import React from 'react'
import './Booking.css'
import { Form, Button, Select, Message, Header, Table } from 'semantic-ui-react'
import { string, object, array, func, bool } from 'prop-types'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
const baseURL = "https://api.partner.gce1.bestmile.io"
const userID = "Connor"
const site = "19d80f6a-b1fe-4455-aa9c-193186bec620"
const apiKey = "32aa5ee39f9e4ecd91b763a2034825a5"

class BookingRow extends React.Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.state = { status: props.status }
  }
  static propTypes = {
    bookingID: string.isRequired,
    origin: array.isRequired,
    destination: array.isRequired,
    status: string.isRequired,
    onCancelClick: func.isRequired,
  }
  onCancel() {
    this.props.onCancelClick(this.props.bookingID)
  }

  render() {
    return (
      <Table.Row key={this.props.bookingID}>
        <Table.Cell>{this.props.bookingID}</Table.Cell>
        <Table.Cell>{this.props.origin[0] + ", " +
                     this.props.origin[1]} </Table.Cell>
        <Table.Cell>{this.props.destination[0] + ", " +
                     this.props.destination[1]} </Table.Cell>
        <Table.Cell>{this.props.status}</Table.Cell>
        {((this.props.status=="wait" ||
          this.props.status=="vehicleassigned") ?
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
