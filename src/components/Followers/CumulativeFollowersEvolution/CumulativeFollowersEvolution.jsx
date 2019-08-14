import React from 'react';
import { connect } from "react-redux";
import SimpleLineGraph from "../Graphs/SimpleLineGraph";
import GenericGraph from "../Graphs/GenericGraph";

const mapStateToProps = state => {
    return {
        activeCandidates: state.activeCandidates,
        cumulativeCandidates: state.cumulativeCandidates
    };
};

class CumulativeFollowersEvolutionConnected extends React.Component {

    render() {
        return (
            <div className="followers-graph full-basis white-bc-color-light">
                <GenericGraph
                    title={"Cantidad de seguidores ganados y acumulados"}
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
                    showLabels={true}
                    showInfo={true}
                    infoMessage={"En ésta visualización no se contemplan a los usuarios que dejaron de " +
                    "seguir a los candidatos, solamente se ven sus nuevos seguidores."}
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
