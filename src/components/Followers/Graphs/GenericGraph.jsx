import React from 'react';
import './Graphs.scss';
import Information from "../../Information/Information";


class GenericGraph extends React.Component {
    render() {
        return (
            <div>
                <div className="flex-row title-and-info">
                    <span className="graph-title font-md">{this.props.title}</span>
                    {this.props.showInfo ? <Information infoMessage={this.props.infoMessage}/> : null}
                </div>
                <div className="flex-row graph">
                    {this.props.showLabels ? <span className="graph-x-axis font-md">{this.props.xLabel}</span> : null}
                    {this.props.type}
                </div>
                {this.props.showLabels ? <span className="graph-y-axis font-md">{this.props.yLabel}</span> : null}
            </div>
        );
    }
}

export default GenericGraph;
