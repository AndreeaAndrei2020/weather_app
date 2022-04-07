import React, { Component } from 'react'
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'
import SelectedLocation from './SelectedLocation'

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1 >Weather</h1>

        <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={1}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SelectedLocation />

        </MapContainer>
      </div>
    )
  }
}

export default Homepage

