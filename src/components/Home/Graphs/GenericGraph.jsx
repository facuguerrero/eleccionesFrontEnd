import React from 'react';
import './Graphs.scss';


class GenericGraph extends React.Component {
    render() {
        return (
            <div>
                <span className="graph-title">{this.props.title}</span>
                <div className="flex-row">
                    <span className="graph-x-axis">{this.props.xLabel}</span>
                    {this.props.type}
                </div>
                <span className="graph-y-axis">{this.props.yLabel}</span>
            </div>
        );
    }
}

export default GenericGraph;
