import React from "react";
import TextBullet from "./TextBullet";

class TopOptions extends React.Component {
    render() {
        return (
            <div className="flex-column bullets">
                {this.props.options.nodes.map((topic, index) =>
                    <TextBullet key={index} index={index} mainText={topic.id} onClickNode={this.props.onClickNode}/>
                )}
            </div>
        );
    }
}

export default TopOptions;
