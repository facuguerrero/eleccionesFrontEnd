import React from 'react';
import '../TopHeader.scss';
import HeaderCandidate from "../HeaderCandidate/HeaderCandidate";
import {connect} from "react-redux";
import {addActiveCandidate, removeActiveCandidate} from "../../../../actions";

function mapDispatchToProps(dispatch) {
    return {
        addActiveCandidate: candidate => dispatch(addActiveCandidate(candidate)),
        removeActiveCandidate: candidate => dispatch(removeActiveCandidate(candidate))
    };
}

const mapStateToProps = state => {
    return {
        activeCandidates: state.activeCandidates,
    };
};

class HeaderPartyConnected extends React.Component {

    alterCandidateState = (name, screenName, isActive) => {
        isActive ? this.props.removeActiveCandidate({ name, screenName }) : this.props.addActiveCandidate({ name, screenName });
        this.props.areCandidatesActive(
            (this.props.activeCandidates.length > 1 && isActive)
            ||
            (this.props.activeCandidates.length >=  0 && !isActive)
        );
    };

    render() {
        return (
            <div className={"header-party -filter-card-mg-pd flex-column header-box white-bc-color-light "
            + this.props.partyName.replace(/ /g, "") + "-br-color"}>
                <span className="font-xmd party-name fifth-font-color-dark">{this.props.partyName}</span>
                <div className="flex-row candidates">
                    {this.props.candidates.map(
                        (candidate, index) => <HeaderCandidate
                            isActive={this.props.activeCandidates.filter(
                                activeCandidate => activeCandidate.name === candidate.name).length > 0}
                            candidate={candidate}
                            key={index}
                            onClick={this.alterCandidateState}/>
                    )
                    }
                </div>
            </div>
        );
    }
}

const HeaderParty = connect(mapStateToProps, mapDispatchToProps)(HeaderPartyConnected);
export default HeaderParty;
