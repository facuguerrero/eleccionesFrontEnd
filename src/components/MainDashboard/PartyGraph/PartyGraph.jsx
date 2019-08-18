import React from "react";
import GenericGraph from "../../Followers/Graphs/GenericGraph";
import SimpleStackedBarGraph from "./SimpleStackedBarGraph";

const ACTIVE_COLORS = [
    {
        name: 'Usuarios Activos',
        color: '#1c5876'
    },
    {
        name: 'Usuarios Inactivos',
        color: '#649ebe'
    },
];

// const CANDIDATES_COLORS = [
//     {
//         name: 'Alberto Fernández',
//         color: '#2287aa'
//     },
//     {
//         name: 'Cristina Kirchner',
//         color: '#1ea6bb'
//     },
//     {
//         name: 'Mauricio Macri',
//         color: '#b3a712'
//     },
//     {
//         name: 'Miguel Ángel Pichetto',
//         color: '#d8c413'
//     },
//     {
//         name: 'Roberto Lavagna',
//         color: '#8431aa'
//     },
//     {
//         name: 'Juan Manuel Urtubey',
//         color: '#7139aa '
//     },
//     {
//         name: 'Nicolas del Caño',
//         color: '#ad1a32'
//     },
//     {
//         name: 'Romina Del Plá',
//         color: '#ad3829'
//     },
//     {
//         name: 'Jose Luis Espert',
//         color: '#133474'
//     },
//     {
//         name: 'Luis Rosales',
//         color: '#1448a1'
//     },
// ];

export default class PartyGraph extends React.Component {

    render() {
        return (
            <div className="followers-graph full-basis white-bc-color-light">
                <GenericGraph
                    title={this.props.title}
                    showLabels={false}
                    showInfo={this.props.showInfo}
                    infoMessage={this.props.infoMessage}
                    type={<SimpleStackedBarGraph data={this.props.data} labels={ACTIVE_COLORS}/>}
                />
            </div>
        );
    }
}


