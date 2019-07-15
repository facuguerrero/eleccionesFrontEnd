import React from 'react';
import axios from "axios";
import DataContainer from "./DataContainer/DataContainer";
import "./MainDashboard.scss"
import UsersGraph from "./UsersGraph/UsersGraph";
import PartyGraph from "./PartyGraph/PartyGraph";

class MainDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dashboardInfo: {},
            showDashboard: false,
            partiesDataLoaded: false,
            partiesData:{}
        };
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getData(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async getData(){
        axios.get(
            //TODO change when deployed
            // 'http://elecciones2019.fi.uba.ar:9290/dashboard',
            'http://0.0.0.0:9290/src/jsonsDummy/dashboard.json',
            {
                proxy: false
            })
            .then((response) => {
                this.setState({
                    dashboardInfo: response.data,
                    showDashboard: true,
                });
            })
            .catch((error) => {
                //TODO handle error
            });
    }

    render() {
        return (
            <main className="main">
                {this.state.showDashboard ?
                    <div>
                        <DataContainer title="Valores Totales obtenidos" data={this.mapTwitterRawData()} />
                        <div className="followers-graphs">
                            <UsersGraph data={this.mapUsersData()} />
                            <PartyGraph data={this.mapPartyData()} />
                        </div>
                    </div>
                :null}
            </main>
        );
    }

    mapTwitterRawData() {
        return [
            {
                title: "Tweets Totales",
                value: this.state.dashboardInfo.tweets
            },
            {
                title: "Usuarios Totales",
                value: this.state.dashboardInfo.total_users
            },
            {
                title: "Hashtags Encontrados",
                value: this.state.dashboardInfo.hashtag_count
            },
            {
                title: "Tópicos Calculados",
                value: this.state.dashboardInfo.topic_count
            },
            // {
            //     title: "Coocurrencias Encontradas",
            //     value: this.state.dashboardInfo.cooccurrences_count
            // }
        ];

    }

    mapUsersData() {
        return [
            { name: 'Activos', value: this.state.dashboardInfo.active_users },
            { name: 'Inactivos', value:
                this.state.dashboardInfo.total_users - this.state.dashboardInfo.active_users
            },
        ];
    }

    mapPartyData() {

        if(this.state.partiesDataLoaded){
            return this.state.partiesData
        }

        const partiesData = [
            {
                name: 'Frente De Todos',
                'Alberto Fernández': this.state.dashboardInfo.followers_by_candidate.alferdez.followers,
                'Cristina Kirchner': this.state.dashboardInfo.followers_by_candidate.CFKArgentina.followers
            },
            {
                name: 'Juntos por el Cambio',
                'Mauricio Macri': this.state.dashboardInfo.followers_by_candidate.mauriciomacri.followers,
                'Miguel Ángel Pichetto': this.state.dashboardInfo.followers_by_candidate.MiguelPichetto.followers
            },
            {
                name: 'Consenso Federal',
                'Roberto Lavagna': this.state.dashboardInfo.followers_by_candidate.rlavagna.followers,
                'Juan Manuel Urtubey': this.state.dashboardInfo.followers_by_candidate.urtubeyjm.followers
            },
            {
                name: 'Frente De Izquierda',
                'Nicolas del Caño': this.state.dashboardInfo.followers_by_candidate.NicolasdelCano.followers,
                'Romina Del Plá': this.state.dashboardInfo.followers_by_candidate.RominaDelPla.followers
            },
            {
                name: 'Frente Despertar',
                'Jose Luis Espert': this.state.dashboardInfo.followers_by_candidate.jlespert.followers,
                'Luis Rosales': this.state.dashboardInfo.followers_by_candidate.luisrosalesARG.followers
            },
        ].sort(function() { return 0.5 - Math.random() });

        this.setState({ partiesDataLoaded: true, partiesData:partiesData })
        return partiesData

    }
}

export default MainDashboard;
