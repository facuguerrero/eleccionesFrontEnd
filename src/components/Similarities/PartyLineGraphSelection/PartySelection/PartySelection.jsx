import React from 'react';
import PartyHeader from "./PartyHeader";

const PARTIES = [
    {
        party: 'Frente De Todos',
    },
    {
        party: 'Juntos Por El Cambio',
    },
    {
        party: 'Consenso Federal',
    },
    {
        party: 'Frente De Izquierda',
    },
    {
        party: 'Frente Despertar',
    }
].sort(function() { return 0.5 - Math.random() });

class PartySelection extends React.Component {

    render() {
        return (
            <div className="flex-row party-selection">
                {PARTIES.map(
                    (party, index) => <PartyHeader
                        key={index}
                        partyName={party.party}
                        isPartyActive={this.props.activeParties.includes(party.party)}
                        onClick={this.props.onClick}
                    />)
                }
            </div>
        );
    }

}

export default PartySelection;
