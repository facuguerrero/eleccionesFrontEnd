import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {gFormatter, kFormatter} from "../../../utils/graphFunctions";

class TopicsLineGraph extends React.Component {

    render() {
        return (
            <div style={{ width: '100%', height: 500 }}>
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
                        <Line type="monotone" dataKey={this.props.name} stroke={"#31708E"} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default TopicsLineGraph;
