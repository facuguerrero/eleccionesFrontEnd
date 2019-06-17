import React from "react";
import { Graph } from 'react-d3-graph';
import example from '../../jsonsDummy/graph-example.json';

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    "automaticRearrangeAfterDropNode": true,
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 800,
    "highlightDegree": 2,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "width": 1400,
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -250,
        "linkLength": 120,
        "linkStrength": 2
    },
    "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 10,
        "fontWeight": "normal",
        "highlightColor": "red",
        "highlightFontSize": 14,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "red",
        "highlightStrokeWidth": 1.5,
        "mouseCursor": "crosshair",
        "opacity": 0.9,
        "renderLabel": true,
        "size": 200,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "svg": "",
        "symbolType": "circle"
    },
    "link": {
        "color": "lightgray",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "red",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": true,
        "strokeWidth": 3
    }
};

class GenericTopic extends React.Component {

    render() {
        return (
            <Graph
                    id="marvel-id"
                    data={this.props.data}
                    config={myConfig}
                    onClickNode={this.props.onClickNode}
                />
        );
    }
}

export default GenericTopic;
