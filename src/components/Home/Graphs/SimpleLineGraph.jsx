import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Graphs.scss';

const COLORS = {
    "mauriciomacri": "#ECE822",
    "CFKArgentina": "#20C5EA",
    "urtubeyjm": "#2C18DA",
    "rlavagna": "#16C410",
    "sergiomassa": "#E41F14",
    "jlespert": "#743430",
    "alferdez": "#1BD1D4"
};

class SimpleLineGraph extends React.Component {

    generateLines = () => {
        return this.props.activeCandidates.map((candidate, index) =>
            <Line key={index} type="monotone" dataKey={candidate.name} stroke={COLORS[candidate.screenName]} />);
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
