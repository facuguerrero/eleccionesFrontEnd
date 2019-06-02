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
            <div className="followers-graph">
                <GenericGraph
                    title="Evolución de la cantidad de seguidores en el tiempo"
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
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
