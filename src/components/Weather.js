import React from 'react'
import './Weather.css'

const apiKey = 'fb0ad270a9d54fed321ffe270f87ac9f';
const units = 'metric';
const lang = 'ru';
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=${units}&lang=${lang}&appid=${apiKey}&q=`;

const falloutTypes = [];
falloutTypes[2] = "Гроза";
falloutTypes[3] = "Изморось";
falloutTypes[5] = "Дождь";
falloutTypes[6] = "Снег";
falloutTypes[7] = "Туман";
falloutTypes[8] = "Нет";

export default class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: {
            }
        }

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateWeather() {
        fetch(apiUrl + this.props.city)
            .then((res) => res.json())
            .then(
                (result) => {
                    let fallout = falloutTypes[Math.floor(result.weather[0].id / 100)];

                    this.setState({
                        isLoaded: true,
                        data: {
                            city: result.name,
                            temp: Math.round(result.main.temp),
                            humidity: result.main.humidity,
                            description: this.capitalizeFirstLetter(result.weather[0].description),
                            clouds: result.clouds.all,
                            fallout: fallout,
                            icon: result.weather[0].icon
                        }
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });    
                }
            )
    }

    componentDidMount() {
        this.updateWeather();
    }

    render() {
        console.log(this.state);
        let picture;
        let cityName;

        if (this.state.data.city === 'Moscow') {
            cityName = 'Москва';
        } else {
            cityName = this.state.data.city;
        }

        if (this.state.isLoaded) {
            picture = <img className='weather-picture' src={`http://openweathermap.org/img/w/${this.state.data.icon}.png`} alt=""/>;
        } else {
            picture = <div className='weather-picture' />;
        }

        return (
            <div className='weather-card'>
                <div className='weather-city'>
                    <h3>{cityName}</h3>
                </div>
                {picture}
                <div className='weather-temp'>
                    <h1>{this.state.isLoaded ? this.state.data.temp : "--"} {String.fromCharCode(176)}C</h1>
                    <h4>{this.state.isLoaded ? this.state.data.description : "--"}</h4>
                </div>
                <div className='weather-details'>
                    <p>Влажность: {this.state.isLoaded ? this.state.data.humidity : "--"}%</p>
                    <p>Облачность: {this.state.isLoaded ? this.state.data.clouds : "--"}%</p>
                    <p>Осадки: {this.state.data.fallout}</p>
                </div>
            </div>
        )
    }
}