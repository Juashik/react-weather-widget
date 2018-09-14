import React from 'react'

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=fb0ad270a9d54fed321ffe270f87ac9f&q='

export default class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: {
                city: "",
                temp: "--",
                humidity: "--",
                description: "--",
                clouds: "--",
                main: "--",
                rainValue: "--",
                icon: null
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
                    console.log(result);
                    let weatherData = {
                        city: result.name,
                        temp: result.main.temp,
                        humidity: result.main.humidity,
                        description: result.weather[0].description,
                        clouds: result.clouds.all,
                        main: result.weather[0].main,
                        rainValue: result.rain || result.snow,
                        icon: result.weather[0].icon
                    }
                    weatherData.description = weatherData.description[0].toUpperCase() + weatherData.description.substring(1)
                    this.setState({
                        isLoaded: true,
                        data: weatherData
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

    componentWillUnmount() {

    }

    render() {
        console.log(this.state);
        //let imgUrl = "http://openweathermap.org/img/w/" + this.state.data.weather[0].icon + ".png"
        return (
            <div>
                <h3>Погода в городе {this.state.data.city}:</h3>
                <img src={`http://openweathermap.org/img/w/${this.state.data.icon}.png`} alt=""/>
                <ul>
                    <li>Температура: {this.state.data.temp} {String.fromCharCode(176)}C</li>
                    <li>Влажность: {this.state.data.humidity}%</li>
                    <li>Описание: {this.state.data.description}</li>
                    <li>Облачность: {this.state.data.clouds}%</li>
                    <li>Тип осадков: {this.state.data.main}</li>
                    <li>Количество осадков: {this.state.data.rainValue}</li>
                </ul>
            </div>
        )
    }
}