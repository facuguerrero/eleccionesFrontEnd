import React from 'react';
import axios from "axios";
import "./MainDashboard.scss"
import UsersGraph from "./UsersGraph/UsersGraph";
import PartyGraph from "./PartyGraph/PartyGraph";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Particles from "react-particles-js";

class MainDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dashboardInfo: {},
            showDashboard: false,
            partiesDataLoaded: false,
            partiesData:{},
            candidatesData:{},
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
            'http://elecciones2019.fi.uba.ar/dashboard',
            {
                proxy: false
            })
            .then((response) => {
                this.mapPartyData(response.data)
                this.setState({
                    dashboardInfo: response.data,
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

    render() {

        return (
            <main className="main">

                {
                    !this.state.showErrorMessage ?

                    <div className="z-index-top">
                        {this.state.showDashboard ?
                                <div>
                                    <div className="followers-graphs">
                                        <UsersGraph
                                            data={this.mapUsersData()}
                                            showInfo={true}
                                            infoMessage={"A partir de los usuarios de Twitter capturados, " +
                                            "determinamos a uno como \"activo\" si éste tiene más de una " +
                                            "publicación desde el 01/01/2019"
                                            }/>
                                        <PartyGraph
                                            title={"Seguidores Totales Por Partido"}
                                            data={this.state.partiesData}
                                            showInfo={true}
                                            infoMessage={"Los usuarios por candidato pueden repetirse ya que es posible" +
                                            " que un usuario siga a más de un candidato"}
                                        />
                                    </div>
                                    <div className="followers-graphs full-basis">
                                        <PartyGraph
                                            title={"Seguidores Totales Por Candidato a Presidente y Vicepresidente"}
                                            data={this.state.candidatesData}
                                            showInfo={true}
                                            infoMessage={"Los usuarios por partido se pueden repetir ya que es " +
                                            "posible que un usuario siga a candidatos de más de un partido"}
                                        />
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

    mapUsersData() {
        return [
            { name: 'Activos', value: this.state.dashboardInfo.active_users, color:"#1c5876" },
            { name: 'Inactivos', color:"#649ebe", value:
                this.state.dashboardInfo.total_users - this.state.dashboardInfo.active_users
            },
        ];
    }

    mapPartyData(data) {

        if(!this.state.partiesDataLoaded){
            const partiesData = [
                {
                    name: 'Frente De Todos',
                    'Usuarios Activos': this.getActiveAmount(
                        data.followers_by_candidate.alferdez,
                        data.followers_by_candidate.CFKArgentina),
                    'Usuarios Inactivos': this.getInactiveAmount(
                        data.followers_by_candidate.alferdez,
                        data.followers_by_candidate.CFKArgentina)
                },
                {
                    name: 'Juntos por el Cambio',
                    'Usuarios Activos': this.getActiveAmount(
                        data.followers_by_candidate.mauriciomacri,
                        data.followers_by_candidate.MiguelPichetto),
                    'Usuarios Inactivos': this.getInactiveAmount(
                        data.followers_by_candidate.mauriciomacri,
                        data.followers_by_candidate.MiguelPichetto)
                },
                {
                    name: 'Consenso Federal',
                    'Usuarios Activos': this.getActiveAmount(
                        data.followers_by_candidate.rlavagna,
                        data.followers_by_candidate.urtubeyjm),
                    'Usuarios Inactivos': this.getInactiveAmount(
                        data.followers_by_candidate.rlavagna,
                        data.followers_by_candidate.urtubeyjm)
                },
                {
                    name: 'Frente De Izquierda',
                    'Usuarios Activos': this.getActiveAmount(
                        data.followers_by_candidate.NicolasdelCano,
                        data.followers_by_candidate.RominaDelPla),
                    'Usuarios Inactivos': this.getInactiveAmount(
                        data.followers_by_candidate.NicolasdelCano,
                        data.followers_by_candidate.RominaDelPla)
                },
                {
                    name: 'Frente Despertar',
                    'Usuarios Activos': this.getActiveAmount(
                        data.followers_by_candidate.jlespert,
                        data.followers_by_candidate.luisrosalesARG),
                    'Usuarios Inactivos': this.getInactiveAmount(
                        data.followers_by_candidate.jlespert,
                        data.followers_by_candidate.luisrosalesARG)
                },
            ].sort(function() { return 0.5 - Math.random() });

            const candidatesData = [
                {
                    name: 'Alberto Fernández',
                    'Usuarios Activos': data.followers_by_candidate.alferdez.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.alferdez.followers -
                        data.followers_by_candidate.alferdez.active_followers,
                },
                {
                    name: 'Mauricio Macri',
                    'Usuarios Activos': data.followers_by_candidate.mauriciomacri.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.mauriciomacri.followers -
                        data.followers_by_candidate.mauriciomacri.active_followers,
                },
                {
                    name: 'Roberto Lavagna',
                    'Usuarios Activos': data.followers_by_candidate.rlavagna.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.rlavagna.followers -
                        data.followers_by_candidate.rlavagna.active_followers,
                },
                {
                    name: 'Nicolas del Caño',
                    'Usuarios Activos': data.followers_by_candidate.NicolasdelCano.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.NicolasdelCano.followers -
                        data.followers_by_candidate.NicolasdelCano.active_followers,
                },
                {
                    name: 'Jose Luis Espert',
                    'Usuarios Activos': data.followers_by_candidate.jlespert.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.jlespert.followers -
                        data.followers_by_candidate.jlespert.active_followers,
                },
                {
                    name: 'Cristina Kirchner',
                    'Usuarios Activos': data.followers_by_candidate.CFKArgentina.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.CFKArgentina.followers -
                        data.followers_by_candidate.CFKArgentina.active_followers,
                },
                {
                    name: 'Juan Manuel Urtubey',
                    'Usuarios Activos': data.followers_by_candidate.urtubeyjm.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.urtubeyjm.followers -
                        data.followers_by_candidate.urtubeyjm.active_followers,
                },
                {
                    name: 'Miguel Ángel Pichetto',
                    'Usuarios Activos': data.followers_by_candidate.MiguelPichetto.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.MiguelPichetto.followers -
                        data.followers_by_candidate.MiguelPichetto.active_followers,
                },
                {
                    name: 'Romina Del Plá',
                    'Usuarios Activos': data.followers_by_candidate.RominaDelPla.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.RominaDelPla.followers -
                        data.followers_by_candidate.RominaDelPla.active_followers,
                },
                {
                    name: 'Luis Rosales',
                    'Usuarios Activos': data.followers_by_candidate.luisrosalesARG.active_followers,
                    'Usuarios Inactivos': data.followers_by_candidate.luisrosalesARG.followers -
                        data.followers_by_candidate.luisrosalesARG.active_followers,
                },

            ].sort(function() { return 0.5 - Math.random() });

            this.setState({
                partiesDataLoaded: true,
                partiesData:partiesData,
                candidatesData: candidatesData
            });
        }

    }

    getActiveAmount(candidateA, candidateB){
        return candidateA.active_followers + candidateB.active_followers;
    }

    getInactiveAmount(candidateA, candidateB){
        return candidateA.followers + candidateB.followers - this.getActiveAmount(candidateA, candidateB);
    }

}

export default MainDashboard;
