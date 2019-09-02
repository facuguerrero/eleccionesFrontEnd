import React from 'react';
import './PartyLineGraphSelection.scss'
import PartySelection from "./PartySelection/PartySelection";
import PartyLineGraph from "./PartyLineGraph/PartyLineGraph";

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
                    <PartyLineGraph
                        title="Proporción de uso por partido (%)"
                        showInfo={true}
                        infoMessage="Porcentaje de seguidores del partido que lo utilizó en cada día."
                        data={this.props.data}
                        max={this.props.max}
                        activeParties={this.state.activeParties}
                    />
                    : null
                }

            </div>
        );
    }

}

export default PartyLineGraphSelection;
