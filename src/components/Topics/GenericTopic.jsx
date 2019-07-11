import React from "react";
import { Graph } from 'react-d3-graph';



function calculateWindowSize(){
    return window.innerWidth > 1280 ? window.innerWidth/3 - 30 : window.innerWidth - 40
}

const myConfig = {
    "automaticRearrangeAfterDropNode": true,
    "collapsible": false,
    "directed": false,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 500,
    "highlightDegree": 2,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "width": calculateWindowSize(),
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -250,
        "linkLength": 1,
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
        "size": 0.1,
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
        "strokeWidth": 300
    }
};

class GenericTopic extends React.Component {
    render() {
        return (
            <div className="graph-border">
                <Graph
                    id={this.props.id}
                    data={this.props.data}
                    config={myConfig}
                    onClickNode={this.props.onClickNode}
                />
            </div>
        );
    }
}

export default GenericTopic;
