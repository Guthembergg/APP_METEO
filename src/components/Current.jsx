import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../App.css";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { SiRainmeter } from "react-icons/si";
import PlaceForm from "./PlaceForm";
import Chart from "./Chart";
import Loading from "./Loading";
import Error from "./Error";

const Current = () => {
  const Dispatch = useDispatch();
  const place = useSelector((state) => state.place);
  const locationLat = useSelector((state) => state.lat);
  const locationLon = useSelector((state) => state.lon);

  const localWeather = useSelector((state) => state.weather);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const baseEndpointWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=ef612c468ca58e4314f5315e17a41bac";
  const baseEndpointLocation =
    "http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=ef612c468ca58e4314f5315e17a41bac&q=";

  const getCurrentLocation = async () => {
    try {
      const response = await fetch(baseEndpointLocation + place);
      if (response.ok) {
        const location = await response.json();
        console.log(location[0].lat);
        console.log(location[0].lon);

        Dispatch({ type: "LOCATION_LAT", payload: location[0].lat });
        Dispatch({ type: "LOCATION_LON", payload: location[0].lon });
      } else {
        alert("Error fetching results location");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentWeather = async () => {
    try {
      const response = await fetch(
        `${baseEndpointWeather}&lon=${locationLon}&lat=${locationLat}`
      );
      if (response.ok) {
        const weather = await response.json();
        console.log(weather);
        Dispatch({ type: "WEATHER", payload: weather });
        setIsLoading(false);
        setIsError(false);
      } else {
        alert("Error fetching results weather");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    getCurrentWeather();
    setIsLoading(true);
  }, [place, locationLon, locationLat]);

  return (
    <>
      <Row className="d-flex justify-content-start ps-5 w-100 pt-5 ">
        <div className="d-flex justify-content-center">
          <Col className="d-flex flex-column ms-5" xs={4}>
            <h2 className="text-white fw-bold fs-1 text-start mb-3 mt-3 ">
              Today
            </h2>
            {isLoading && !isError && <Loading />}
            {!isLoading && isError && <Error />}
            {localWeather && !isLoading && !isError && (
              <Col className="myCard" xs={10}>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between m-4 fw-bold">
                    <h3>{localWeather.name}</h3> <p>Now</p>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h1 className="mt-4 fw-bold">
                      {(localWeather.main.temp - 273).toFixed(1)} °C
                    </h1>
                    <p className="fs-4">
                      {localWeather.weather[0].description}
                    </p>
                  </div>

                  <div className="d-flex flex-row justify-content-between align-items-center m-4 me-0 mb-0">
                    <div className="d-flex flex-column align-items-start">
                      <p className="text-black fw-bold">
                        <TbWind />
                        {localWeather.wind.speed} km/h
                      </p>
                      <p className="text-black fw-bold">
                        <WiHumidity />
                        {localWeather.main.humidity} %
                      </p>
                      {localWeather.rain && (
                        <p className="text-black fw-bold">
                          <SiRainmeter />
                          {localWeather.rain["1h"]}h
                        </p>
                      )}
                    </div>

                    <img
                      src={`http://openweathermap.org/img/wn/${localWeather.weather[0].icon}@2x.png`}
                      alt="icon"
                    />
                  </div>
                </div>
              </Col>
            )}
          </Col>
          <Col xs={7} className="d-flex flex-column ms-5">
            <PlaceForm />
            <Chart />
          </Col>
        </div>
      </Row>
    </>
  );
};
export default Current;
