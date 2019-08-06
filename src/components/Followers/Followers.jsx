import React from 'react';
import { connect } from "react-redux";
import { getCandidates } from "../../actions/index";
import './Followers.scss';
import TopHeader from "./TopHeader/TopHeader";
import FollowersEvolution from "./FollowersEvolution/FollowersEvolution";
import CumulativeFollowersEvolution from "./CumulativeFollowersEvolution/CumulativeFollowersEvolution";
import DatesFilter from "./DatesFilter/DatesFilter";
import EmptySelection from "./EmptySelection/EmptySelection";
import HistoricCumulativeFollowers from "./HistoricCumulativeFollowers/HistoricCumulativeFollowers";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const CANDIDATES = [
    {
        party: 'Frente De Todos',
        candidates: [
            {screen_name: 'alferdez', name: 'Alberto Fernández', image: 'static/candidateImages/fernandez.jpg'},
            {screen_name: 'CFKArgentina', name:'Cristina Kirchner' , image:'static/candidateImages/kirchner.jpg'},
        ]
    },
    {
        party: 'Juntos Por El Cambio',
        candidates: [
            {screen_name: 'mauriciomacri', name:'Mauricio Macri' , image:'static/candidateImages/macri.png'},
            {screen_name: 'MiguelPichetto', name:'Miguel Ángel Pichetto' , image:'static/candidateImages/MiguelPichetto.jpg'},
        ]
    },
    {
        party: 'Consenso Federal',
        candidates: [
            {screen_name: 'rlavagna', name:'Roberto Lavagna' , image:'static/candidateImages/lavgna.jpg'},
            {screen_name: 'urtubeyjm', name:'Juan Manuel Urtubey' , image:'static/candidateImages/urtubey.jpg'},
        ]
    },
    {
        party: 'Frente De Izquierda',
        candidates: [
            {screen_name: 'NicolasdelCano', name:'Nicolas del Caño' , image:'static/candidateImages/caño.jpg'},
            {screen_name: 'RominaDelPla', name:'Romina Del Plá' , image:'static/candidateImages/pla.jpg'},
        ]
    },
    {
        party: 'Frente Despertar',
        candidates: [
            {screen_name: 'jlespert', name:'Jose Luis Espert' , image:'static/candidateImages/espert.jpg'},
            {screen_name: 'luisrosalesARG', name:'Luis Rosales' , image:'static/candidateImages/rosales.jpeg'},
        ]
    },
    // {screen_name: 'sergiomassa', name:'Sergio Massa' , image:'static/candidateImages/massa.jpg'},
].sort(function() { return 0.5 - Math.random() });

class HomeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCandidates: false,
            areCandidatesActive: false,
            openDates: false,
            showErrorMessage: false,
            errorMessage: "",
        };
    }

    changeDateState = () => {
        this.setState({ openDates: !this.state.openDates });
    };

    areCandidatesActive = (areActive) => {
        this.setState({areCandidatesActive: areActive});
    };

    componentDidMount() {
        this.props.getCandidates().then((response) => {
            response === 200 ?
                this.setState({ showCandidates: true, showErrorMessage: false })
                : this.setState({
                    showErrorMessage: true,
                    showCandidates: false,
                    errorMessage: "Hubo un error al cargar los datos, intentá nuevamente más tarde",
                })
        });
    }

    render() {
        return (
            <main className="main">
                {
                    !this.state.showErrorMessage ?

                        <div>
                            {
                                this.state.showCandidates ?
                                    <div>
                                        <div className="main-filters flex-column">
                                            <TopHeader
                                                candidates={CANDIDATES}
                                                areCandidatesActive={this.areCandidatesActive}
                                            />
                                            <div className="-filter-card-mg-pd dates-filter
                                         header-box white-bc-color-light">
                                                <div className="flex-row date-and-arrow">
                                                    <span className="filter-text font-xmd second-font-color-dark">Filtros Por Fecha</span>
                                                    {this.state.openDates ?
                                                        <KeyboardArrowLeft
                                                            className="date-button"
                                                            fontSize="large"
                                                            onClick={this.changeDateState}
                                                        /> :
                                                        <KeyboardArrowRight
                                                            className="date-button fifth-font-color-dark"
                                                            fontSize="large"
                                                            onClick={this.changeDateState}
                                                        />}
                                                </div>
                                                {this.state.openDates ? <DatesFilter/> : null}
                                            </div>
                                        </div>
                                        {this.state.areCandidatesActive ?
                                            <div>
                                                <div className="followers-graphs">
                                                    <FollowersEvolution/>
                                                </div>
                                                <div className="followers-graphs">
                                                    <CumulativeFollowersEvolution/>
                                                    <HistoricCumulativeFollowers/>
                                                </div>
                                            </div>
                                            : <EmptySelection/>
                                        }
                                    </div>
                                    : <Loader/>
                            }
                        </div>

                        : <Error errorMessage={this.state.errorMessage}/>
                }

            </main>
        );
    }
}


const Followers = connect(null, {getCandidates})(HomeConnected);
export default Followers;
