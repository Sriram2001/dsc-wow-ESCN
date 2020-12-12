import React from 'react';
import styled from 'styled-components';
import Result from './Result';
import NotFound from './NotFound';
import './App.scss'




const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 0;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
  padding: 0 20px 0 20px;
`;

class Weather extends React.Component {
  state = {
    value: '',
    weatherInfo: null,
    error: false,
  };





  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = () => {
    this.state.value = "mysore";
    const { value } = this.state;
    const APIkey = "89c96448b9259c07f1e13943b581f4f4";

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${APIkey}&units=metric`;

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
          }`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };


  componentDidMount() {
    this.handleSearchCity()
  }


  render() {
    const { value, weatherInfo, error } = this.state;
    return (

      <section className="weather">
        <WeatherWrapper className="weatherInfo">
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </section>
    );
  }
}

export default Weather;
