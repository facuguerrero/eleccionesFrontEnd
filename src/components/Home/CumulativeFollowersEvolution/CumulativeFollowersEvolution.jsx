import React from 'react';
import { connect } from "react-redux";
import SimpleLineGraph from "../Graphs/SimpleLineGraph";
import GenericGraph from "../Graphs/GenericGraph";

const mapStateToProps = state => {
    return {
        activeCandidates: state.activeCandidates,
        cumulativeCandidates: state.cumulativeCandidates,
    };
};

class CumulativeFollowersEvolutionConnected extends React.Component {

    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <GenericGraph
                    title="Cantidad de seguidores acumulados por día"
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
                    type={<SimpleLineGraph
                        data={this.props.cumulativeCandidates}
                        activeCandidates={this.props.activeCandidates}
                    />}
                />
            </div>
        );
    }
}

const CumulativeFollowersEvolution = connect(mapStateToProps, null)(CumulativeFollowersEvolutionConnected);
export default CumulativeFollowersEvolution;
