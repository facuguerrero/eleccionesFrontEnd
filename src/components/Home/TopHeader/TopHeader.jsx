import React from 'react';
import './TopHeader.scss';
import HeaderParty from "./HeaderParty/HeaderParty";

class TopHeader extends React.Component {

    render() {
        return (
            <div className="candidate-header flex-row">
                {this.props.candidates.map(
                    (party, index) => <HeaderParty
                        key={index}
                        partyName={party.party}
                        candidates={party.candidates}
                        areCandidatesActive={this.props.areCandidatesActive}
                    />)
                }
            </div>
        );
    }
}

export default TopHeader;
