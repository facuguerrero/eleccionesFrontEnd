import React from 'react';
import { connect } from "react-redux";
import './TopHeader.scss';
import { addActiveCandidate, removeActiveCandidate } from "../../../actions/index";
import HeaderCandidate from "./HeaderCandidate/HeaderCandidate";

function mapDispatchToProps(dispatch) {
    return {
        addActiveCandidate: candidate => dispatch(addActiveCandidate(candidate)),
        removeActiveCandidate: candidate => dispatch(removeActiveCandidate(candidate))
    };
}

class TopHeaderConnected extends React.Component {

    alterCandidateState = (name, screenName, isActive) => {
        isActive ? this.props.removeActiveCandidate({ name, screenName }) : this.props.addActiveCandidate({ name, screenName });
    };

    render() {
        return (
            <div className="top-header">
                <div className="candidate-header">
                    {this.props.candidates.map(
                        (candidate, index) => <HeaderCandidate
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

const TopHeader = connect(null, mapDispatchToProps)(TopHeaderConnected);
export default TopHeader;
