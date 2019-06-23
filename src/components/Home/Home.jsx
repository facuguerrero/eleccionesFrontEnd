import React from 'react';
import { connect } from "react-redux";
import { getCandidates } from "../../actions/index";
import './Home.scss';
import TopHeader from "./TopHeader/TopHeader";
import FollowersEvolution from "./FollowersEvolution/FollowersEvolution";
import CumulativeFollowersEvolution from "./CumulativeFollowersEvolution/CumulativeFollowersEvolution";
import DatesFilter from "./DatesFilter/DatesFilter";

const CANDIDATES = [
    {screen_name: 'CFKArgentina', name:'Cristina Kirchner' , image:'static/candidateImages/kirchner.jpg'},
    {screen_name: 'mauriciomacri', name:'Mauricio Macri' , image:'static/candidateImages/macri.png'},
    {screen_name: 'sergiomassa', name:'Sergio Massa' , image:'static/candidateImages/massa.jpg'},
    {screen_name: 'rlavagna', name:'Roberto Lavagna' , image:'static/candidateImages/lavgna.jpg'},
    {screen_name: 'urtubeyjm', name:'Juan Manuel Urtubey' , image:'static/candidateImages/urtubey.jpg'},
    {screen_name: 'jlespert', name:'Jose Luis Espert' , image:'static/candidateImages/espert.jpg'},
    {screen_name: 'alferdez', name:'Alberto Fernández' , image:'static/candidateImages/fernandez.jpg'},
];

class HomeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCandidates: false,
            showError: false,
        };
    }

    componentDidMount() {
        this.props.getCandidates().then(() => {
            this.setState({ showCandidates: true, showError: false });
        }, (error) => {
            this.setState({ showCandidates: false, showError: true });
            //TODO show error message and loading screen
        });
    }

    render() {
        return (
            <main className="main">
                { this.state.showCandidates ?
                    <div>
                        <div className="main-filters header-box card-mg-pd white-bc-color-light">
                            <TopHeader candidates={CANDIDATES.sort(function() { return 0.5 - Math.random() })} />
                            <div className="dates-filter flex-column">
                                <span className="font-md">Filtros Por Fecha</span>
                                <DatesFilter />
                            </div>
                        </div>
                        <div className="followers-graphs">
                            <FollowersEvolution />
                            <CumulativeFollowersEvolution />
                        </div>
                    </div>
                : null}
            </main>
        );
    }
}


const Home = connect(null, {getCandidates})(HomeConnected);
export default Home;
