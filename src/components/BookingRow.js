import React from 'react'
import './Booking.css'
import { Table } from 'semantic-ui-react'
import { string, array, func } from 'prop-types'



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
