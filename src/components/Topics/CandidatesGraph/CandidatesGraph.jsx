import React from 'react';
import GenericTopic from "../GenericTopic";
import {connect} from "react-redux";
import "./CandidatesGraph.scss"
import TopicTitleBar from "../TopicTitleBar/TopicTitleBar";
import axios from "axios";
import moment from "moment";
import Error from "../../Error/Error";

const mapStateToProps = state => {
    return {
        candidateGraphs: state.candidateGraphs
    };
};

class CandidatesGraphConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainGraph: true,
            currentGraph: this.props.candidateGraphs,
            showErrorMessage: false,
            errorMessage: "",
        };
    }

    changeGraph = (nodeId) => {

        this.state.mainGraph ?
            axios.get(
                'http://elecciones2019.fi.uba.ar/topics/' +
                nodeId +
                '?start_date=2019-01-01&end_date=' + moment()
                    .subtract(1, 'days').format("YYYY-MM-DD").toString(),
                {
                    proxy: false
                })
                .then((response) => {
                    this.setState({
                        currentGraph: response.data,
                        mainGraph: false,
                    })
                })
                .catch((error) => {
                    this.setState({
                        showErrorMessage: true,
                        errorMessage: "Hubo un error al cargar el grafo, intentá nuevamente más tarde",
                    })
                })
            : null

    };

    changeToPreviousGraph = () => {
        !this.state.mainGraph ?
            this.setState({
                mainGraph: true,
                currentGraph: this.props.candidateGraphs,
            })
            : null
    };

    processGraphData = () => {
        let processedGraph = {};
        const processedNodes = this.state.currentGraph.nodes.map(node => {
            let newNode = {};
            newNode["id"] = node.id;
            newNode["size"] = node.size / 100;
            return newNode;

        });
        processedGraph["links"] = this.state.currentGraph.links;
        processedGraph["nodes"] = processedNodes;
        return processedGraph;
    };

    render() {
        return (
            <div>
                { !this.state.showErrorMessage ?
                    <div className="followers-graph white-bc-color-light">
                        <TopicTitleBar withPrevious={true}
                                       showPrevious={this.changeToPreviousGraph}
                                       title={"Grafo con Navegación"}/>
                        <GenericTopic id={this.props.id}
                                      data={this.processGraphData()}
                                      onClickNode={this.changeGraph}/>
                    </div>
                : <Error errorMessage={this.state.errorMessage}/>
                }
            </div>
    )
    }
}

const CandidatesGraph = connect(mapStateToProps, null)(CandidatesGraphConnected);
export default CandidatesGraph;
