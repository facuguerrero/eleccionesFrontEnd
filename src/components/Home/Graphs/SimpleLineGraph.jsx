import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Graphs.scss';

class SimpleLineGraph extends React.Component {

    generateLines = () => {
        return this.props.activeCandidates.map((candidate, index) =>
            <Line key={index} type="monotone" dataKey={candidate.name} stroke="#8884d8" />);
    };

    render() {
        return (
            <div style={{ width: '100%', height: 600 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={this.props.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {this.generateLines()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SimpleLineGraph;
