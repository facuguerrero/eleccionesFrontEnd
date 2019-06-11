import React from 'react';
import {Menu, TrendingUp, Timeline} from "@material-ui/icons";


class NavButton extends React.Component {

    getIcon = () => {
        switch(this.props.icon) {
            case 'TrendingUp':
                return <TrendingUp className="nav-button-icon" fontSize="large"/>;
            case 'Timeline':
                return <Timeline className="nav-button-icon" fontSize="large"/>;
            default:
                return <Menu className="nav-button-icon" fontSize="large"/>;
        }
    };

    render() {
        return (
            <div className={"flex-row nav-button " + (this.props.isSelected ? "second-bc-color-light" : "") }
                 onClick={() => this.props.onClick(this.props.name)}
            >
                {this.getIcon()}
                <span className="nav-button-text font-md">{this.props.text}</span>
            </div>
        );
    }
}

export default NavButton;
