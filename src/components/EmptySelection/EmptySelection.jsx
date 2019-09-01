import React from 'react';
import './EmptySelection.scss'


class EmptySelection extends React.Component {
    render() {
        return (
            <span className="empty-selection font-lg white-font-color-light">
                {this.props.message}
            </span>
        );
    }
}

export default EmptySelection;
