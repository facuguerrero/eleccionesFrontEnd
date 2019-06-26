import React from 'react';
import GenericTopic from "../GenericTopic";
import {connect} from "react-redux";
import "./CandidatesGraph.scss"
import TopicTitleBar from "../TopicTitleBar/TopicTitleBar";

const mapStateToProps = state => {
    return {
        candidateGraphs: state.candidateGraphs
    };
};

class CandidatesGraphConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGraph: this.props.candidateGraphs.main,
            previousGraphs: ["main"],
        };
    }

    changeGraph = (nodeId) => {
        const selectedNode = this.state.currentGraph.nodes.filter(node => node.id === nodeId)[0];
        if (selectedNode.has_subgraph){
            this.setState({
                previousGraph: this.state.previousGraphs.push(nodeId),
                currentGraph: this.props.candidateGraphs[nodeId],
            })
        }
    };

    changeToPreviousGraph = () => {
        const newPreviousGraphs = this.state.previousGraphs.length > 1 ? this.state.previousGraphs.splice(0, 1) : this.state.previousGraphs;
        this.setState({
            previousGraphs: newPreviousGraphs,
            currentGraph: this.props.candidateGraphs[newPreviousGraphs[newPreviousGraphs.length-1]],
        })
    };

    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <TopicTitleBar withPrevious={true}
                               showPrevious={this.changeToPreviousGraph}
                               title={"Grafo con Navegación"}/>
                <GenericTopic id={this.props.id}
                              data={this.state.currentGraph}
                              onClickNode={this.changeGraph} />
            </div>
        );
    }
}

const CandidatesGraph = connect(mapStateToProps, null)(CandidatesGraphConnected);
export default CandidatesGraph;
