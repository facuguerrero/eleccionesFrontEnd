import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {g3Formatter} from "../../../../utils/graphFunctions";
import ReferenceLine from "recharts/es6/cartesian/ReferenceLine";

const COLORS = {
    "Frente De Todos": "#188bb6",
    "Consenso Federal": "#9f2099",
    "Frente De Izquierda": "#b02f38",
    "Frente Despertar": "#4449ad",
    "Juntos Por El Cambio": "#b9b939"
};

class SimplePartyLineGraph extends React.Component {

    generateLines = () => {
        return this.props.activeParties.map((party, index) =>
            <Line key={index} type="monotone" dataKey={party} stroke={COLORS[party]}/>);
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
                        <YAxis domain={[parseFloat(g3Formatter(this.props.min)), parseFloat(g3Formatter(this.props.max))]}/>
                        <ReferenceLine x="11/08/2019" stroke="orange" strokeDasharray="3 3" label="PASO" />
                        <ReferenceLine y={0} label="Similitud media de la sociedad" stroke="orange" strokeDasharray="3 3" />
                        <Tooltip/>
                        <Legend />
                        {this.generateLines()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SimplePartyLineGraph;
