import React from "react";
import SimplePieGraph from "./SimplePieGraph";
import GenericGraph from "../../Followers/Graphs/GenericGraph";

export default class UsersGraph extends React.Component {

    render() {
        return (
            <div className="followers-graph white-bc-color-light">
                <GenericGraph
                    title="Usuarios Obtenidos"
                    showLabels={false}
                    type={<SimplePieGraph data={this.props.data}/>}
                    showInfo={this.props.showInfo}
                    infoMessage={this.props.infoMessage}
                />
            </div>
        );
    }
}


