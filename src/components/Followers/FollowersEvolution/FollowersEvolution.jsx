import React from 'react';
import { connect } from "react-redux";
import SimpleLineGraph from "../Graphs/SimpleLineGraph";
import GenericGraph from "../Graphs/GenericGraph";

const mapStateToProps = state => {
    return {
        activeCandidates: state.activeCandidates,
        processedCandidates: state.processedCandidates,
    };
};

class FollowersEvolutionConnected extends React.Component {
    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <GenericGraph
                    title="Cantidad de seguidores agregados por día"
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
                    showLabels={true}
                    type={<SimpleLineGraph
                        data={this.props.processedCandidates}
                        activeCandidates={this.props.activeCandidates}
                    />}
                />
            </div>
        );
    }
}

const FollowersEvolution = connect(mapStateToProps, null)(FollowersEvolutionConnected);
export default FollowersEvolution;
