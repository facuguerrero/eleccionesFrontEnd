import React from 'react';
import "./TopicTitleBar.scss"
import Information from "../../Information/Information";
import GenericButton from "../../Button/GenericButton";


class TopicTitleBar extends React.Component {

    render() {
        return (
            <div className="flex-row title-and-info">
                <div className="flex-row">
                    <span className={"graph-title graph-basis" + this.props.titleSize}>{this.props.title}</span>
                    {this.props.withPrevious ?
                        <GenericButton onClick={this.props.showPrevious} text="Grafo Anterior" disabled={this.props.disabled}/>
                        : null
                    }
                </div>
                {this.props.showInfo ? <Information infoMessage={this.props.infoMessage}/> : null}
            </div>
        );
    }
}
export default TopicTitleBar;
