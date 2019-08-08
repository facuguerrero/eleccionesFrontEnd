import React from 'react';
import {gFormatter} from "../../../../utils/graphFunctions";

class DataBox extends React.Component {

    render() {
        return (
            <div className="data-box -filter-card-mg-pd white-bc-color-light flex-column">
                <span className="fifth-font-color-dark bold-text text-center font-md ">{this.props.title}</span>
                <span className="fifth-font-color-dark font-md " >{gFormatter(this.props.value)}</span>
            </div>
        );
    }
}

export default DataBox;
