import React from 'react'

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=fb0ad270a9d54fed321ffe270f87ac9f&q='

export default class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: {} };
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Погода в городе {this.props.city}:</h3>
                <ul>
                    <li>Температура: </li>
                    <li>Влажность: </li>
                    <li>Описание: </li>
                    <li>Облачность: </li>
                    <li>Тип осадков: </li>
                    <li>Количество осадков: </li>
                </ul>
            </div>
        )
    }
}