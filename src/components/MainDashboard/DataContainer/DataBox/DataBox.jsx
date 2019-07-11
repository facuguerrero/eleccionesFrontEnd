import React from 'react';

class DataBox extends React.Component {

    render() {
        return (
            <div className="data-box -filter-card-mg-pd white-bc-color-light flex-column">
                <span className="font-xmd ">{this.props.title}</span>
                <span className="font-md " >{this.props.value}</span>
            </div>
        );
    }
}

export default DataBox;
