import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addPosition,
  getCurrentWeatherData,
} from "../store/actions/actionCreators";
var startMarker = false
const SelectedLocation = () => {
  const {
    position,
    locationName,
    locationTemp,
    iconWeather,
    descriptionWeather,
    hourlyWeather,
    weather7Days
  } = useSelector((state) => state.selectedLocation);
  const dispatch = useDispatch();
  console.log(11,hourlyWeather)
  const partWholeLocationTemp = parseInt(locationTemp)
  useMapEvents({
    click: (e) => {
      startMarker = true
      const { lat, lng } = e.latlng;
      dispatch(addPosition({ lat, lng }, 'false'));
      dispatch(getCurrentWeatherData(lat, lng, dispatch));

    },
  });

  return (
    startMarker && (
      <Marker position={position}>
        <Popup className="pop">
          <Card className="text-center cardLocation">
            <Card.Body>
              <div className="locationName">
                <h6 style={{ marginBottom: "-2px" }}>{locationName}</h6>
                <h5>{partWholeLocationTemp} °C </h5>
              </div>
              <br />
              <Card.Text>
                <br />
                <div className="curentWeather">
                  <img src={iconWeather} alt="icon" />
                  <p style={{ marginTop: "-10px" }}>{descriptionWeather}</p>
                </div>
                <br />
                <div className="hourly-weather ">
                  <div className="container">
                    <div className="row">
                      {hourlyWeather.map((state) => (
                        <>
                          <div key={state.id} className="col-sm">
                            <p>{state.hourlyWeather}  </p>
                            <img src={state.urlIcon} alt="icon" />
                            <p className="p2">{state.temp} °C </p>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Container>
                    {weather7Days.map((state) => (
                      <div className="container" key={state.id}>
                        <div className="row ">
                          <div className="col-sm " >
                            <p> {state.name} </p>
                          </div>
                          <div className="col-sm">
                            <img alt="icon" src={state.urlIcon} />
                          </div>
                          <div className="col-sm rowWeather" >
                            <div className="row">
                              <div className="col-8 col-sm-5" >
                                Min:  {state.tempMin}°C
                              </div>
                              <div className=" col-8 col-sm-5">
                                Max: {state.tempMax}°C
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </Container>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Popup>
      </Marker>
    )
  );
};

export default SelectedLocation;
