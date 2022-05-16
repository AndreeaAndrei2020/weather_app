import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addPosition,
  getCurrentWeatherData,
} from "../store/actions/actionCreators";

const SelectedLocation = () => {
  const {
    position,
    locationName,
    locationTemp,
    iconWeather,
    descriptionWeather,
    hourlyWeather,
    weather7Days,
  } = useSelector((state) => state.selectedLocation);
  const dispatch = useDispatch();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      dispatch(addPosition({ lat, lng }));
      dispatch(getCurrentWeatherData(lat, lng, dispatch));
    },
  });

  return (
    position && (
      <Marker position={position}>
        <Popup className="pop">
          <Card className="text-center cardLocation">
            <Card.Body>
              <div className="locationName">
                <h6 style={{ marginBottom: "-2px" }}>{locationName}</h6>
                <h5>{locationTemp} °C </h5>
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
                            <p>{state.hour} </p>
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
                      <div key={state.id}>
                        <Row>
                          <Col>
                            <pre style={{ margin: "-8px" }}>
                              {" "}
                              {state.name}{" "}
                              <img alt="icon" src={state.urlIcon} />{" "}
                              {state.tempMin}°C {state.tempMax}°{" "}
                            </pre>
                          </Col>
                        </Row>
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
