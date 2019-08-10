import React from 'react';
import './EmptySelection.scss'


class EmptySelection extends React.Component {
    render() {
        return (
            <span className="empty-selection font-lg fifth-font-color">
                {this.props.message}
            </span>
        );
    }
}

export default EmptySelection;
