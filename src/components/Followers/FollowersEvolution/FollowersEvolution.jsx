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
            <div className="followers-graph full-basis white-bc-color-light">
                <GenericGraph
                    title="Cantidad de seguidores ganados por día"
                    xLabel="Cantidad de seguidores"
                    yLabel="Tiempo"
                    showLabels={true}
                    showInfo={true}
                    infoMessage={"En ésta visualización no se contemplan a los usuarios que dejaron de " +
                    "seguir a los candidatos, solamente se ven sus nuevos seguidores."
                    }
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
