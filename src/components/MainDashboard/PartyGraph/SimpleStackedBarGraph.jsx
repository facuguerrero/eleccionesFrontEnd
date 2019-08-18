import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {gFormatter, mFormatter} from "../../../utils/graphFunctions";

export default class SimpleStackedBarGraph extends PureComponent {

    render() {
        return (
            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={400}
                        data={this.props.data}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={140}
                        />
                        <YAxis tickFormatter={(tick) => mFormatter(tick)} />
                        <Legend />
                        <Tooltip formatter={(value) => gFormatter(value)}/>
                        {this.props.labels.map((candidate, index) =>
                            <Bar key={index} dataKey={candidate.name} stackId="a" fill={candidate.color} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
