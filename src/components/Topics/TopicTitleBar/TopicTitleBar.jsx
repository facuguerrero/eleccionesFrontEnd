import React from 'react';
import "./TopicTitleBar.scss"
import {NavigateBefore} from "@material-ui/icons";
import Information from "../../Information/Information";


class TopicTitleBar extends React.Component {

    render() {
        return (
            <div className="flex-row title-and-info">
                <div className="flex-row">
                    {this.props.withPrevious ?
                        <NavigateBefore className="graph-back-button" fontSize="large" onClick={this.props.showPrevious}/> :
                        null
                    }
                    <span className="graph-title font-lg">{this.props.title}</span>
                </div>
                {this.props.showInfo ? <Information infoMessage={this.props.infoMessage}/> : null}
            </div>
        );
    }
}
export default TopicTitleBar;
