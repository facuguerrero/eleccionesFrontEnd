import React from 'react';
import DataBox from "./DataBox/DataBox";

class DataContainer extends React.Component {

    render() {
        return (
            <div className="data-container flex-row">
                {this.props.data.map((box, index) => <DataBox key={index} title={box.title} value={box.value} />)}
            </div>
        );
    }
}

export default DataContainer;
