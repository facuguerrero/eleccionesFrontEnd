import React from 'react';
import {
    Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {g3Formatter} from "../../../../utils/graphFunctions";
import CustomizedAxisTick from "./CustomizedAxisTick";

const COLORS = {
    "Frente De Todos": "#188bb6",
    "Consenso Federal": "#9f2099",
    "Frente De Izquierda": "#b02f38",
    "Frente Despertar": "#4449ad",
    "Juntos Por El Cambio": "#b9b939"
};

function calculateWindowSize(){
    return window.innerWidth > 370 ? 90 : 60
}

class RadarGraph extends React.Component {

    generateRadars = () => {
        return this.props.activeParties.map((party, index) =>
            <Radar key={index} name={party} dataKey={party} stroke={COLORS[party]} fill={COLORS[party]} fillOpacity={0.6} />
        );
    };

    render() {
        return (
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <RadarChart
                        outerRadius={calculateWindowSize()}
                        data={this.props.data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="party"
                                        tick={<CustomizedAxisTick/>}
                        />
                        <PolarRadiusAxis angle={30}
                                         domain={[parseFloat(g3Formatter(this.props.min)), parseFloat(g3Formatter(this.props.max))]} />
                        {this.generateRadars()}
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default RadarGraph;
