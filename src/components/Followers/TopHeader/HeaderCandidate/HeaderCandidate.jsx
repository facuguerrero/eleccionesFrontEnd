import React from 'react';
import { hot } from 'react-hot-loader';
import './HeaderCandidate.scss';

class HeaderCandidate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive,
        };
    }

    changeActive = () => {
        this.setState({ isActive: !this.state.isActive });
        this.props.onClick(this.props.candidate.name, this.props.candidate.screen_name, this.state.isActive);
    };

    render() {
        return (
            <div className="header-candidate-wrapper" onClick={this.changeActive}>
                <img
                    alt={this.props.candidate.name}
                    className={"header-candidate-img " + (this.state.isActive ?
                        this.props.candidate.screen_name + "-br-color" : "fifth-br-color")}
                    src={this.props.candidate.image}
                />
                {this.props.candidate.name.split(' ').map((name, index) =>
                    <span
                        key={index}
                        className={"header-candidate-text font-sm " + (this.state.isActive ?
                        this.props.candidate.screen_name + "-font-color" : "fifth-font-color-dark")}>
                        {name}
                    </span>
                )}
            </div>
        );
    }
}

export default hot(module)(HeaderCandidate);
