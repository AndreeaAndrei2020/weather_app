import {
    Marker,
    Popup,
    useMapEvents
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addLocation, getCurrentWeatherData } from '../store/actions/actionCreators'

const SelectedLocation = () => {
    const selectedLocation = useSelector(state => state.selectedLocation)
    const dispatch = useDispatch()
    console.log(selectedLocation)
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng
            dispatch(addLocation({ lat, lng }))
            dispatch(getCurrentWeatherData(e.latlng.lat, e.latlng.lng, dispatch))

        }
    })

    return selectedLocation.location && (
        <Marker position={selectedLocation.location}>
            <Popup className='pop'>
                <Card className="text-center cardLocation">
                    <Card.Body>
                        <div className='locationName'>
                            <h6 style={{ marginBottom: '-2px' }}>{selectedLocation.nameLocation}</h6>
                            <h5 >{selectedLocation.tempLocation} °C </h5>
                        </div>
                        <br></br>
                        <Card.Text>
                            <br></br>

                            <div className='curentWeather' >
                                <img src={selectedLocation.iconWeather} alt='icon'></img>
                                <p style={{ marginTop: '-10px' }}>
                                    {selectedLocation.descriptionWeather}
                                </p>

                            </div>
                            <br></br>
                            <div className='hourly-weather '>
                                <div className="container">
                                    <div className="row">
                                        {
                                            selectedLocation.hourlyWeather.map(state => <>
                                                <div key={state.id} className="col-sm">
                                                    <p>{state.hour} </p>
                                                    <img src={state.urlIcon} alt='icon'></img>
                                                    <p className='p2'>{state.temp} °C </p>
                                                </div>
                                            </>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Container>
                                    {
                                        selectedLocation.weather7Days.map(state =>
                                            <div  key={state.id}>
                                            <Row >
                                                <Col>
                                                    <pre style={{ margin: '-8px' }}> {state.name}         <img alt='icon' src={state.urlIcon}></img>   {state.tempMin}°C      {state.tempMax}° </pre>
                                                </Col>
                                            </Row>
                                            </div>
                                        )
                                    }

                                </Container>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Popup>
        </Marker>
    )
}

export default SelectedLocation
