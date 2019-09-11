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
            errorMessage: "",
            radarData: [],
            radarMax:1,
            radarMin:-1
        };
    }

    getData = () => {
        axios.get(
            'http://elecciones2019.fi.uba.ar/similarities?start_date=2019-6-23'
        )
            .then((response) => {
                this.setState({
                    data: this.processData(response.data),
                    maxData: this.getMaxData(response.data),
                    radarData: this.processRadarData(response.data),
                    radarMax: this.processRadarMax(response.data),
                    radarMin: this.processRadarMin(response.data),
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

    processRadarData = (data) => {
        const radarData = [];
        const point = data[data.length - 1];

        radarData.push({
            party:"Frente De Todos",
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

    processRadarMax = (data) => {

        const point = data[data.length - 1];

        return Math.max(
                point["frentedetodos-frentedetodos"],
                point["consensofederal-consensofederal"],
                point["frentedeizquierda-frentedeizquierda"],
                point["juntosporelcambio-juntosporelcambio"],
                point["frentedespertar-frentedespertar"]
        );
    };

    processRadarMin = (data) => {
        const point = data[data.length - 1];

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
                                        Seleccioná múltiples partidos para ver las similitudes entre ellos
                                        </span>
                                            <PartyLineGraphSelection
                                                data={this.state.data}
                                                max={this.state.maxData}
                                                title={"Similaridad por partido"}
                                                infoMessage={"Las similaridades ilustradas son las de cada partido contra si mismo"}
                                                showRadar={true}
                                                radarTitle={"Grafico radial de similitudes"}
                                                radarInfoMessage={"Las similaridades ilustradas son las de cada partido contra si mismo"}
                                                radarData={this.state.radarData}
                                                maxRadar={this.state.radarMax}
                                                minRadar={this.state.radarMin}
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
