import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../App.css";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { SiRainmeter } from "react-icons/si";

const Extended = () => {
  const Dispatch = useDispatch();

  const locationLat = useSelector((state) => state.lat);
  const locationLon = useSelector((state) => state.lon);
  const WeatherDaily = useSelector((state) => state.weatherDaily);

  const baseEndpointWeatherDaily =
    "http://api.openweathermap.org/data/2.5/forecast?appid=ef612c468ca58e4314f5315e17a41bac&";

  const getWeatherDaily = async () => {
    try {
      const response = await fetch(
        `${baseEndpointWeatherDaily}&lon=${locationLon}&lat=${locationLat}`
      );
      if (response.ok) {
        const weather = await response.json();
        console.log(weather);
        Dispatch({ type: "WEATHERDAILY", payload: weather });
      } else {
        alert("Error fetching results weatherDaily");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherDaily();
  }, [locationLon, locationLat]);

  return (
    <Row className="d-flex justify-content-start mt-5 ps-5 g-3 w-100 ">
      <h2 className="text-white text-start ms-2 fs-1 fw-bold">Next days</h2>
      {WeatherDaily &&
        WeatherDaily.list
          .filter((el, i) => i % 8 === 0)
          .map((element, i) => (
            <Col key={`weather-${i}`} className="myCard mx-3" xs={2}>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between m-4 fw-bold">
                  <h6 className="text-white">{element.dt_txt}</h6>
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h1 className="mt-4">
                    {(element.main.temp - 273).toFixed(1)} °C
                  </h1>
                  <p>{element.weather[0].main}</p>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center m-4 me-0 mb-0">
                  <div className="d-flex flex-column align-items-start">
                    <p className="text-white">
                      <TbWind />
                      {element.wind.speed} km/h
                    </p>
                    <p className="text-white">
                      <WiHumidity />
                      {element.main.humidity} %
                    </p>
                    {/* {element.rain["1h"].length !== 0 && (
                  <p>
                    <SiRainmeter />
                    {element.rain["1h"]}h
                  </p>
                )} */}
                  </div>

                  <img
                    src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                    alt="icon"
                  />
                </div>
              </div>
            </Col>
          ))}
    </Row>
  );
};
export default Extended;
