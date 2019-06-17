import React from 'react';
import {connect} from "react-redux";
import {getGraphs} from "../../actions";
import CandidatesGraph from "./CandidatesGraph/CandidatesGraph";

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
            <div>
                { this.state.graphsAreLoaded ? <CandidatesGraph /> : null }
            </div>
        );
    }
}

const TopicHome = connect(null, {getGraphs})(TopicHomeConnected);
export default TopicHome;
