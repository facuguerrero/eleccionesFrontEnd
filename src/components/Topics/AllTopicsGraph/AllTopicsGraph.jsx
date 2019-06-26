import React from 'react';
import GenericTopic from "../GenericTopic";
import {connect} from "react-redux";
import graph from "../../../jsonsDummy/static_graph_dummy.json"
import TopicTitleBar from "../TopicTitleBar/TopicTitleBar";


// const mapStateToProps = state => {
//     return {
//         candidateGraphs: state.candidateGraphs.main
//     };
// };

class AllTopicsGraphConnected extends React.Component {

    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <TopicTitleBar withPrevious={false}
                               title={"Grafo Estático"}/>
                <GenericTopic id={this.props.id}
                              data={graph}
                              onClickNode={null} />
            </div>
        );
    }
}

// const AllTopicsGraph = connect(mapStateToProps, null)(AllTopicsGraphConnected);
const AllTopicsGraph = connect(null, null)(AllTopicsGraphConnected);
export default AllTopicsGraph;
