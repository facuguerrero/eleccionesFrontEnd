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

    alterCandidateState = (candidate, isActive) => {
        isActive ? this.props.removeActiveCandidate({ candidate }) : this.props.addActiveCandidate({ candidate });
    };

    render() {
        return (
            <div className="top-header">
                <img className="logo" src="../../../../build/static/logo.png" />
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
