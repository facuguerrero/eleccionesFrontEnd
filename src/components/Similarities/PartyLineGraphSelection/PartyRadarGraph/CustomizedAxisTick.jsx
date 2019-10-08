import React from "react";

class CustomizedAxisTick extends React.Component {

    render () {
        const {x, y, stroke, payload} = this.props;
        let yAdjust = 10;
        let trueX = 0;

        switch (payload.value) {
            case "Frente De Todos":
                yAdjust = 60;
                break;
            case "Juntos Por El Cambio":
                trueX = 30;
                yAdjust = 35;
                break;
            case "Frente De Izquierda":
                trueX = -30;
                yAdjust = 35;
                break;

        }

        return (
            <g transform={`translate(${x},${y - yAdjust})`}>
                <text>
                    {payload.value.split(" ").map((word, index) => {
                        return <tspan textAnchor="middle" key={index} dy="20" x={trueX}>{word}</tspan>;
                    })}
                </text>
            </g>
        );
    }

}

export default CustomizedAxisTick;
