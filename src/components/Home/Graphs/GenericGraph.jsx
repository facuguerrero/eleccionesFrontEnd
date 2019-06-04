import React from 'react';
import './Graphs.scss';


class GenericGraph extends React.Component {
    render() {
        return (
            <div>
                <span className="graph-title font-lg">{this.props.title}</span>
                <div className="flex-row graph">
                    <span className="graph-x-axis font-md">{this.props.xLabel}</span>
                    {this.props.type}
                </div>
                <span className="graph-y-axis font-md">{this.props.yLabel}</span>
            </div>
        );
    }
}

export default GenericGraph;
