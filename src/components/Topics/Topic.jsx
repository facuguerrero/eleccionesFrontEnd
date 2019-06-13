import React, {cloneElement} from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import lesMisJSON from './les-miserables.json';
import * as d3 from "d3-scale";

class Topic extends React.Component {

    render() {
        return (
            <InteractiveForceGraph
                highlightDependencies
                simulationOptions={{ animate: true }}
                onSelectNode={(node) => console.log(node)}
                onDeselectNode={(node) => console.log(node)}
            >
                {lesMisJSON.nodes.map(node => (
                    <ForceGraphNode
                        key={node.id}
                        fill={node.group}
                        node={{ ...node, radius: 5 }}
                    />
                ))}
                {lesMisJSON.links.map(link => (
                    <ForceGraphLink
                        key={`${link.source}=>${link.target}`}
                        link={{ ...link, value: 2 }}
                    />
                ))}
            </InteractiveForceGraph>
        );
    }
}

export default Topic;
