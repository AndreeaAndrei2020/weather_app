import {
    Marker,
    Popup,
    useMapEvents
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../store/actions/actionCreators'

const SelectedLocation = () => {
    const selectedLocation = useSelector(state => state.selectedLocation)
    const dispatch = useDispatch()

    useMapEvents({
        click: (e) => {

            const { lat, lng } = e.latlng
            dispatch(addLocation({ lat, lng }))
        }
    })

    return selectedLocation.location && (
        <Marker position={selectedLocation.location}>
            <Popup className='pop'>You are here  </Popup>
        </Marker>
    )
}

export default SelectedLocation
