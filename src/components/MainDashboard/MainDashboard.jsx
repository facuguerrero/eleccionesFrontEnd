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
        this.timer = setInterval(()=> this.getData(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async getData(){
        axios.get(
            //TODO change when deployed
            // 'http://elecciones2019.fi.uba.ar:9290/dashboard',
            'http://elecciones2019.fi.uba.ar:9290/dashboard',
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
                            <PartyGraph data={this.state.partiesData} />
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

    mapPartyData(data) {

        if(!this.state.partiesDataLoaded){
            const partiesData = [
                {
                    name: 'Frente De Todos',
                    'Alberto Fernández': data.followers_by_candidate.alferdez.followers,
                    'Cristina Kirchner': data.followers_by_candidate.CFKArgentina.followers
                },
                {
                    name: 'Juntos por el Cambio',
                    'Mauricio Macri': data.followers_by_candidate.mauriciomacri.followers,
                    'Miguel Ángel Pichetto': data.followers_by_candidate.MiguelPichetto.followers
                },
                {
                    name: 'Consenso Federal',
                    'Roberto Lavagna': data.followers_by_candidate.rlavagna.followers,
                    'Juan Manuel Urtubey': data.followers_by_candidate.urtubeyjm.followers
                },
                {
                    name: 'Frente De Izquierda',
                    'Nicolas del Caño': data.followers_by_candidate.NicolasdelCano.followers,
                    'Romina Del Plá': data.followers_by_candidate.RominaDelPla.followers
                },
                {
                    name: 'Frente Despertar',
                    'Jose Luis Espert': data.followers_by_candidate.jlespert.followers,
                    'Luis Rosales': data.followers_by_candidate.luisrosalesARG.followers
                },
            ].sort(function() { return 0.5 - Math.random() });

            this.setState({ partiesDataLoaded: true, partiesData:partiesData });
            return partiesData
        }

    }
}

export default MainDashboard;
