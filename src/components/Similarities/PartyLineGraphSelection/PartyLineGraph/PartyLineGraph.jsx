import React from 'react';
import GenericGraph from "../../../Followers/Graphs/GenericGraph";
import SimplePartyLineGraph from "./SimplePartyLineGraph";

class PartyLineGraph extends React.Component {
    render() {
        return (
            <div className="followers-graph full-basis white-bc-color-light">
                <GenericGraph
                    title={this.props.title}
                    showLabels={false}
                    showInfo={this.props.showInfo}
                    infoMessage={this.props.infoMessage}
                    type={<SimplePartyLineGraph
                        data={this.props.data}
                        activeParties={this.props.activeParties}
                    />}
                />
            </div>
        );
    }
}

export default PartyLineGraph;
