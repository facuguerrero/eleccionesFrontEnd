import React from 'react';
import './EmptySelection.scss'


class EmptySelection extends React.Component {
    render() {
        const selectionStyle = "empty-selection font-lg white-font-color-light ";
        return (
            <span className={selectionStyle + (this.props.topics ? "empty-selection-topic" : "")}>
                {this.props.message}
            </span>
        );
    }
}

export default EmptySelection;
