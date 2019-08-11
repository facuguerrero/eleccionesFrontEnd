import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';

const COLORS = { Activos: "#649ebe", Inactivos: "#1c5876"};

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1);
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#1c5876"}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#1c5876"}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={"#1c5876"}
            />
            {/*<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />*/}
            {/*<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />*/}
            <text
                x={ex + (cos >= 0 ? -70 : +70)} y={ey + (cos >= 0 ? +60 : -60)}
                textAnchor={textAnchor}
                fill="white">{`${(percent * 100).toFixed(2)}%`}
            </text>
            {/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">*/}
                {/*{`(${(percent * 100).toFixed(2)}%)`}*/}
            {/*</text>*/}
        </g>
    );
};


export default class SimplePieGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={this.props.data}
                            innerRadius={80}
                            // outerRadius={80}
                            fill="#5e91b1"
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
