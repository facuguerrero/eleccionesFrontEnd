import React from 'react';
import {connect} from "react-redux";
import {getGraphs} from "../../actions";
import CandidatesGraph from "./CandidatesGraph/CandidatesGraph";
import AllTopicsGraph from "./AllTopicsGraph/AllTopicsGraph";
import "./Topics.scss"
import Loader from "../Loader/Loader";

class TopicHomeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphsAreLoaded: false,
            showError: false,
        };
    }

    componentDidMount() {
        this.props.getGraphs().then(() => {
            this.setState({ graphsAreLoaded: true, showError: false });
        }, (error) => {
            this.setState({ graphsAreLoaded: false, showError: true });
            //TODO show error message and loading screen
        });
    }

    render() {
        return (
            <main className="main">
                {/*<div>*/}
                    {/*<div className="main-filters header-box card-mg-pd white-bc-color-light">*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="topic-graph">
                    { this.state.graphsAreLoaded ? <CandidatesGraph id="graph1" /> : <Loader/> }
                    {/*{ this.state.graphsAreLoaded ? <AllTopicsGraph id="graph2" /> : null }*/}
                </div>
            </main>
        );
    }
}

const TopicHome = connect(null, {getGraphs})(TopicHomeConnected);
export default TopicHome;
