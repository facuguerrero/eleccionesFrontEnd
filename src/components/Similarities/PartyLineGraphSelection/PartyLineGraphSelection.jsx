import React from 'react';
import './PartyLineGraphSelection.scss'
import PartySelection from "./PartySelection/PartySelection";
import PartyLineGraph from "./PartyLineGraph/PartyLineGraph";
import PartyRadarGraph from "./PartyRadarGraph/PartyRadarGraph";

class PartyLineGraphSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeParties : []
        };
    }

    handleParty = (newParty) => {

        this.state.activeParties.includes(newParty)
            ? this.setState({activeParties: this.state.activeParties.filter(party => party !== newParty)})
            : this.setState({activeParties: this.state.activeParties.concat(newParty)});

    };

    render() {
        return (
            <div>
                <PartySelection
                    activeParties={this.state.activeParties}
                    onClick={this.handleParty}
                />
                {this.state.activeParties.length > 0 ?
                    <div>
                        <PartyLineGraph
                            title={this.props.title}
                            showInfo={true}
                            infoMessage={this.props.infoMessage}
                            data={this.props.data}
                            max={this.props.max}
                            activeParties={this.state.activeParties}
                        />
                        {this.props.showRadar ?
                            <div>
                                <div className="h"/>
                                <PartyRadarGraph
                                    title={this.props.radarTitle}
                                    showInfo={true}
                                    infoMessage={this.props.radarInfoMessage}
                                    data={this.props.radarData}
                                    activeParties={this.state.activeParties}
                                    max={this.props.maxRadar}
                                    min={this.props.minRadar}
                                />
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
            </div>
        );
    }

}

export default PartyLineGraphSelection;
