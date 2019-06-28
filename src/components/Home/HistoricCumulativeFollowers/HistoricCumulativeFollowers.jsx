import React from 'react';
import { connect } from "react-redux";
import SimpleLineGraph from "../Graphs/SimpleLineGraph";
import GenericGraph from "../Graphs/GenericGraph";

const mapStateToProps = state => {
    return {
        activeCandidates: state.activeCandidates,
        historicCumulativeCandidates: state.historicCumulativeCandidates
    };
};

class HistoricCumulativeFollowersConnected extends React.Component {

    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <GenericGraph
                    title="Cantidad de seguidores acumulados"
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
                    type={<SimpleLineGraph
                        data={this.props.historicCumulativeCandidates}
                        activeCandidates={this.props.activeCandidates}
                    />}
                />
            </div>
        );
    }
}

const HistoricCumulativeFollowers = connect(mapStateToProps, null)(HistoricCumulativeFollowersConnected);
export default HistoricCumulativeFollowers;
