import axios from 'axios'
import * as Config from './config/config.js'

function createBooking(pickupLat, pickupLng, dropoffLat, dropoffLng) {
  return axios({
    method: 'post',
    url: Config.baseURL + "/v1/travel/users/" + Config.userID + "/bookings",
    headers: {'Content-Type': 'application/json', 'apikey': Config.apiKey},
    params: {
      srid: 4326
    },
    data: {
      userID: Config.userID,
      seatCount: 2,
      siteID: Config.siteID,
      itinerary: [
        {
          start: {
            position: {
              srid: 4326,
              coordinate: [pickupLat, pickupLng]
            }
          },
          end: {
            position: {
              srid: 4326,
              coordinate: [dropoffLat, dropoffLng]
            }
          },
          siteID: Config.siteID,
          domainID: Config.domainID
        }
      ]
    }
  })
}

function estimatePickup(pickupLat, pickupLng) {
  return axios({
    method: 'get',
    url: Config.baseURL + "/v1/travel/sites/" + Config.siteID + "/estimates/pickup",
    headers: {'Content-Type': 'application/json', 'apikey': Config.apiKey},
    params: {
      pickupLatitude: pickupLat,
      pickupLongitude: pickupLng
    },
    data: {}
  })
}

function estimateDuration(pickupLat, pickupLng, dropoffLat, dropoffLng) {
  
}
function fetchBookings() {
  return axios({
    method: 'get',
    url: Config.baseURL + "/v1/travel/users/" + Config.userID + "/bookings",
    headers: {'Content-Type': 'application/json', 'apikey': Config.apiKey},
    params: {
      srid: 4326
    }
  })
}

function cancelBooking(bookingID) {
  return axios({
    method: 'delete',
    url: Config.baseURL + "/v1/travel/users/" + Config.userID + "/bookings/" + bookingID,
    headers: {'Content-Type': 'application/json', 'apikey': Config.apiKey},
  })
}

export {createBooking, estimatePickup, fetchBookings, cancelBooking}
