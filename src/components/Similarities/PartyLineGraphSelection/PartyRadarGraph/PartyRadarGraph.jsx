import React from 'react';
import GenericGraph from "../../../Followers/Graphs/GenericGraph";
import RadarGraph from "./RadarGraph";

class PartyRadarGraph extends React.Component {
    render() {
        return (
            <div className="full-basis white-bc-color-light">
                <GenericGraph
                    title={this.props.title}
                    showLabels={false}
                    showInfo={this.props.showInfo}
                    infoMessage={this.props.infoMessage}
                    type={<RadarGraph
                        data={this.props.data}
                        activeParties={this.props.activeParties}
                        max={this.props.max}
                        min={this.props.min}
                    />}
                />
            </div>
        );
    }
}

export default PartyRadarGraph;
