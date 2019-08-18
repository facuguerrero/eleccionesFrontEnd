import React from "react";
import { Graph } from 'react-d3-graph';



function calculateWindowSize(){
    return window.innerWidth > 1280 ? window.innerWidth / 2.5 : window.innerWidth - 50
}

const myConfig = {
    "automaticRearrangeAfterDropNode": false,
    "collapsible": false,
    "directed": false,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 400,
    "highlightDegree": 1,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 8,
    "minZoom": 0,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "width": calculateWindowSize(),
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 500,
        "linkStrength": 2
    },
    "node": {
        "color": "#1c5876",
        "fontColor": "black",
        "fontSize": 12,
        "fontWeight": "normal",
        "highlightColor": "#1c5876",
        "highlightFontSize": 12,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": 1.5,
        "labelProperty": "name",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": true,
        "size": 10,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "symbolType": "circle"
    },
    "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "#8FC1E3",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 4,
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
