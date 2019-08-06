import React from 'react';
import {connect} from "react-redux";
import {getGraphs} from "../../actions";
import CandidatesGraph from "./CandidatesGraph/CandidatesGraph";
import AllTopicsGraph from "./AllTopicsGraph/AllTopicsGraph";
import "./Topics.scss"
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

class TopicHomeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphsAreLoaded: false,
            showErrorMessage: false,
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.props.getGraphs().then((response) => {
            response === 200 ?
                this.setState({ graphsAreLoaded: true, showErrorMessage: false })
                : this.setState({
                    showErrorMessage: true,
                    graphsAreLoaded: false,
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
                            {/*<div>*/}
                                {/*<div className="main-filters header-box card-mg-pd white-bc-color-light">*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="topic-graph">
                            {this.state.graphsAreLoaded ? <CandidatesGraph id="graph1"/> : <Loader/>}
                            {/*{ this.state.graphsAreLoaded ? <AllTopicsGraph id="graph2" /> : null }*/}
                            </div>
                        </div>
                    : <Error errorMessage={this.state.errorMessage}/>
                }
            </main>
        );
    }
}

const TopicHome = connect(null, {getGraphs})(TopicHomeConnected);
export default TopicHome;
