import React from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import DataContainer from "../MainDashboard/DataContainer/DataContainer";
import "./Summary.scss"
import {PermIdentity, Timeline, TrendingUp} from "@material-ui/icons";
import Particles from "react-particles-js";
import GenericButton from "../Button/GenericButton";

class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dashboardInfo: {},
            showDashboard: false,
            showErrorMessage: false,
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getData(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async getData(){
        axios.get(
            'http://elecciones2019.fi.uba.ar/dashboard')
            .then((response) => {
                this.setState({
                    dashboardInfo: this.mapTwitterRawData(response.data),
                    showDashboard: true,
                });
            })
            .catch((error) => {
                this.setState({
                    showErrorMessage: true,
                    errorMessage: "Hubo un error al cargar los datos, intentá nuevamente más tarde",
                })
            });
    }

    changeWindow = (newWindow) => {
        this.props.changeWindow(newWindow);
    };

    render() {

        return (
            <main className="main-summary">

                {
                    !this.state.showErrorMessage ?

                        <div className="z-index-top">
                            {this.state.showDashboard ?
                                <div>
                                    <div className="summary-text">
                                        <span className="white-font-color-light font-xlg bold-text">Twitter: Elecciones Argentina 2019</span>
                                        <p className="font-md white-font-color-light">
                                            Análisis en tiempo real de las elecciones presidenciales argentinas del 2019 en Twitter
                                            realizado por alumnos de la Facultad de Ingeniería de la Universidad de Buenos Aires.
                                            Puede encontrar información más detallada
                                            <span> </span>
                                            <span className="text-pointer" onClick={() => this.props.changeWindow(4)} >aquí</span>
                                            <span>.</span>
                                        </p>
                                        <span className="summary-subtitle white-font-color-light font-lg bold-text">Información Recolectada</span>
                                    </div>
                                    <DataContainer title="Valores Totales obtenidos" data={this.state.dashboardInfo}/>
                                    <div className="summary-boxes">
                                        <div
                                            className="summary-box flex-row white-bc-color-light"
                                            onClick={() => this.props.changeWindow(1)}
                                        >
                                            <TrendingUp fontSize="large" htmlColor="#004560"/>
                                            <div className="flex-column summary-box-text">
                                                <span className="summary-box-title second-font-color-dark black-font-color-light font-lg bold-text">
                                                    Seguidores
                                                </span>
                                                <span className="fifth-font-color-dark font-xmd">
                                                    ¿Cómo evoluciona la cantidad de seguidores de cada candidato a
                                                    Presidente y Vicepresidente?
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="summary-box flex-row white-bc-color-light"
                                            onClick={() => this.props.changeWindow(2)}
                                        >
                                            <Timeline fontSize="large" htmlColor="#004560"/>
                                            <div className="flex-column summary-box-text">
                                                <span className="summary-box-title second-font-color-dark black-font-color-light font-lg bold-text">
                                                    Tópicos
                                                </span>
                                                <span className="fifth-font-color-dark font-xmd">
                                                    ¿Cómo se alinean los seguidores de cada partido a distintos hashtags
                                                    y temas de discusión?
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="summary-box flex-row white-bc-color-light"
                                            onClick={() => this.props.changeWindow(3)}
                                        >
                                            <PermIdentity fontSize="large" htmlColor="#004560"/>
                                            <div className="flex-column summary-box-text">
                                                <span className="summary-box-title second-font-color-dark black-font-color-light font-lg bold-text">
                                                    Actividad
                                                </span>
                                                <span className="fifth-font-color-dark font-xmd">
                                                    ¿Qué tanto influyen los usuarios activos e inactivos a cada partido?
                                                </span>
                                            </div>
                                        </div>
                                    </div>
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

    mapTwitterRawData = (data) => {
        return [
            {
                title: "Tweets Totales",
                value: data.tweets
            },
            {
                title: "Usuarios Totales",
                value: data.total_users
            },
            {
                title: "Hashtags Encontrados",
                value: data.hashtag_count
            },
            {
                title: "Tópicos Calculados",
                value: data.topic_count
            },
            // {
            //     title: "Coocurrencias Encontradas",
            //     value: this.state.dashboardInfo.cooccurrences_count
            // }
        ];

    }

}

export default Summary;
