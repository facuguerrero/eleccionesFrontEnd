import React from 'react';
import PartyLineGraphSelection from "./PartyLineGraphSelection/PartyLineGraphSelection";
import './Similarities.scss'
import axios from "axios";
import moment from "moment";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import Particles from "react-particles-js";
import {g3Formatter} from "../../utils/graphFunctions";


class Similarities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            showData: false,
            showErrorMessage: false,
            maxData: 0,
            minData: 0,
            errorMessage: "",
            radarData1: [],
            radarMax1:1,
            radarMin1:-1,
            radarData2: [],
            radarMax2:1,
            radarMin2:-1,
            date1: moment().subtract(1, 'days'),
            date2: moment().subtract(1, 'days')
        };
    }

    getData = () => {
        axios.get(
            'http://elecciones2019.fi.uba.ar/similarities?start_date=2019-6-23'
        )
            .then((response) => {
                this.setState({
                    originalData: response.data,
                    data: this.processData(response.data),
                    maxData: this.getMaxData(response.data),
                    minData: this.getMinData(response.data),
                    radarData1: this.processRadarData(response.data, 1),
                    radarMax1: this.processRadarMax(response.data, 1),
                    radarMin1: this.processRadarMin(response.data, 1),
                    radarData2: this.processRadarData(response.data, 8),
                    radarMax2: this.processRadarMax(response.data, 8),
                    radarMin2: this.processRadarMin(response.data, 8),
                    showData: true,
                    showErrorMessage: false
                })
            })
            .catch((error) => {
                this.setState({
                    showData: false,
                    showErrorMessage: true,
                    errorMessage: "Hubo un error al cargar los datos, intentá nuevamente más tarde",
                })
            })
    };

    getRadarData = (radar, date) => {
        switch (radar) {
            case 1:
                return this.setState({
                    radarData1: this.processRadarData(this.state.originalData, moment().diff(date, "days") + 1),
                    radarMax1: this.processRadarMax(this.state.originalData, moment().diff(date, "days") + 1),
                    radarMin1: this.processRadarMin(this.state.originalData, moment().diff(date, "days") + 1),
                    date1: date,
                });
            case 2:
                return this.setState({
                    radarData2: this.processRadarData(this.state.originalData, moment().diff(date, "days") + 1),
                    radarMax2: this.processRadarMax(this.state.originalData, moment().diff(date, "days") + 1),
                    radarMin2: this.processRadarMin(this.state.originalData, moment().diff(date, "days") + 1),
                    date2: date,
                })
        }
    };

    processData = (data) => {
        return data.map(point => {
            let newData = {};
            newData["date"] = moment(point.date).format("DD/MM/YYYY");
            newData["Frente De Todos"] = parseFloat(g3Formatter(point["frentedetodos-frentedetodos"]));
            newData["Consenso Federal"] = parseFloat(g3Formatter(point["consensofederal-consensofederal"]));
            newData["Frente De Izquierda"] = parseFloat(g3Formatter(point["frentedeizquierda-frentedeizquierda"]));
            newData["Juntos Por El Cambio"] = parseFloat(g3Formatter(point["juntosporelcambio-juntosporelcambio"]));
            newData["Frente Despertar"] = parseFloat(g3Formatter(point["frentedespertar-frentedespertar"]));
            return newData;
        });
    };

    getMaxData = (data) => {

        let max = 0;

        data.forEach(point => {
            max = Math.max(max, Math.max(
                point["frentedetodos-frentedetodos"],
                point["consensofederal-consensofederal"],
                point["frentedeizquierda-frentedeizquierda"],
                point["juntosporelcambio-juntosporelcambio"],
                point["frentedespertar-frentedespertar"]
            ))
        });

        return max;
    };

    getMinData = (data) => {

        let min = 0;

        data.forEach(point => {
            min = Math.min(min, Math.min(
                point["frentedetodos-frentedetodos"],
                point["consensofederal-consensofederal"],
                point["frentedeizquierda-frentedeizquierda"],
                point["juntosporelcambio-juntosporelcambio"],
                point["frentedespertar-frentedespertar"]
            ))
        });

        return min;
    };

    processRadarData = (data, day) => {
        const radarData = [];
        const point = data[data.length - day];

        radarData.push({
            party:"Frente De \n Todos",
            "Frente De Todos": parseFloat(g3Formatter(point["frentedetodos-frentedetodos"])),
            "Consenso Federal": parseFloat(g3Formatter(point["frentedetodos-consensofederal"])),
            "Frente De Izquierda": parseFloat(g3Formatter(point["frentedetodos-frentedeizquierda"])),
            "Juntos Por El Cambio": parseFloat(g3Formatter(point["frentedetodos-juntosporelcambio"])),
            "Frente Despertar": parseFloat(g3Formatter(point["frentedetodos-frentedespertar"])),
            "fullMark": 1
        });

        radarData.push({
            party:"Juntos Por El Cambio",
            "Frente De Todos": parseFloat(g3Formatter(point["frentedetodos-juntosporelcambio"])),
            "Consenso Federal": parseFloat(g3Formatter(point["juntosporelcambio-consensofederal"])),
            "Frente De Izquierda": parseFloat(g3Formatter(point["juntosporelcambio-frentedeizquierda"])),
            "Juntos Por El Cambio": parseFloat(g3Formatter(point["juntosporelcambio-juntosporelcambio"])),
            "Frente Despertar": parseFloat(g3Formatter(point["juntosporelcambio-frentedespertar"])),
            "fullMark": 1
        });

        radarData.push({
            party:"Consenso Federal",
            "Frente De Todos": parseFloat(g3Formatter(point["frentedetodos-consensofederal"])),
            "Consenso Federal": parseFloat(g3Formatter(point["consensofederal-consensofederal"])),
            "Frente De Izquierda": parseFloat(g3Formatter(point["consensofederal-frentedeizquierda"])),
            "Juntos Por El Cambio": parseFloat(g3Formatter(point["juntosporelcambio-consensofederal"])),
            "Frente Despertar": parseFloat(g3Formatter(point["consensofederal-frentedespertar"])),
            "fullMark": 1
        });

        radarData.push({
            party:"Frente Despertar",
            "Frente De Todos": parseFloat(g3Formatter(point["frentedetodos-frentedespertar"])),
            "Consenso Federal": parseFloat(g3Formatter(point["consensofederal-frentedespertar"])),
            "Frente De Izquierda": parseFloat(g3Formatter(point["frentedespertar-frentedeizquierda"])),
            "Juntos Por El Cambio": parseFloat(g3Formatter(point["juntosporelcambio-frentedespertar"])),
            "Frente Despertar": parseFloat(g3Formatter(point["frentedespertar-frentedespertar"])),
            "fullMark": 1
        });

        radarData.push({
            party:"Frente De Izquierda",
            "Frente De Todos": parseFloat(g3Formatter(point["frentedetodos-frentedeizquierda"])),
            "Consenso Federal": parseFloat(g3Formatter(point["consensofederal-frentedeizquierda"])),
            "Frente De Izquierda": parseFloat(g3Formatter(point["frentedeizquierda-frentedeizquierda"])),
            "Juntos Por El Cambio": parseFloat(g3Formatter(point["juntosporelcambio-frentedeizquierda"])),
            "Frente Despertar": parseFloat(g3Formatter(point["frentedespertar-frentedeizquierda"])),
            "fullMark": 1
        });

        return radarData;
    };

    processRadarMax = (data, day) => {

        const point = data[data.length - day];

        return Math.max(
                point["frentedetodos-frentedetodos"],
                point["consensofederal-consensofederal"],
                point["frentedeizquierda-frentedeizquierda"],
                point["juntosporelcambio-juntosporelcambio"],
                point["frentedespertar-frentedespertar"]
        );
    };

    processRadarMin = (data, day) => {
        const point = data[data.length - day];

        return Math.min(
            point["frentedetodos-frentedetodos"],
            point["consensofederal-consensofederal"],
            point["frentedeizquierda-frentedeizquierda"],
            point["juntosporelcambio-juntosporelcambio"],
            point["frentedespertar-frentedespertar"]
        );
    };

    componentDidMount = () => {
        this.getData();
    };

    render() {
        return (
            <main className="main">

                {
                    !this.state.showErrorMessage ?

                        <div className="z-index-top similarities">
                            {
                                this.state.showData ?
                                    <div className="followers-graph white-bc-color-light">
                                        <span className="bold-text party-selection-text font-lg text-center second-font-color-dark">
                                        Seleccioná múltiples partidos para ver sus similitudes
                                        </span>
                                            <PartyLineGraphSelection
                                                data={this.state.data}
                                                max={this.state.maxData}
                                                min={this.state.minData}
                                                title={"Similitud de cada partido"}
                                                infoMessage={"Cada curva muestra la similitud entre los seguidores de cada partido"}
                                                showRadar={true}
                                                radarTitle={"Gráfico de similitudes entre partidos"}
                                                radarInfoMessage={"Cada polígono representa la similitud de un partido contra los demás"}
                                                radarData1={this.state.radarData1}
                                                maxRadar1={this.state.radarMax1}
                                                minRadar1={this.state.radarMin1}
                                                date1={this.state.date1}
                                                radarData2={this.state.radarData2}
                                                maxRadar2={this.state.radarMax2}
                                                minRadar2={this.state.radarMin2}
                                                date2={this.state.date2}
                                                updateDates={this.getRadarData}
                                            />
                                    </div>
                                    : <Loader/>
                            }
                        </div>

                        : <Error errorMessage={this.state.errorMessage}/>
                }

                <Particles
                    className="particles"
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        }
                    }} />
            </main>
        );
    }
}

export default Similarities;
