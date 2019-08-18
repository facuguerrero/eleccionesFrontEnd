import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Graphs.scss';
import {gFormatter, kFormatter} from "../../../utils/graphFunctions";

const COLORS = {
    "mauriciomacri": "#b3a712",
    "CFKArgentina": "#1ea6bb",
    "urtubeyjm": "#2C18DA",
    "rlavagna": "#7139aa",
    "sergiomassa": "#E41F14",
    "jlespert": "#133474",
    "alferdez": "#2287aa",
    "NicolasdelCano": "#ad1a32",
    "MiguelPichetto": "#d8c413",
    "RominaDelPla": "#ad3829",
    "luisrosalesARG": "#1448a1",
};

class SimpleLineGraph extends React.Component {

    generateLines = () => {
        return this.props.activeCandidates.map((candidate, index) =>
            <Line key={index} type="monotone" dataKey={candidate.name} stroke={COLORS[candidate.screenName]} />);
    };

    render() {
        return (
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={this.props.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"
                               tickFormatter={(tick) => tick.replace("/2019","")}
                               angle={-45}
                               textAnchor="end"
                               height={80}
                        />
                        <YAxis tickFormatter={(tick) => kFormatter(tick)} />
                        <Tooltip formatter={(value) => gFormatter(value)}/>
                        <Legend />
                        {this.generateLines()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SimpleLineGraph;
