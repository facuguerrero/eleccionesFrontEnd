import React from 'react';

class InfoCard extends React.Component {
    render() {
        return (
            <div className={
                this.props.show ? "info-card forth-bc-color-light font-color-super-light bold-text" : "info-card-no-show"
            }>
                <p className="info-text">{this.props.infoMessage}</p>
            </div>
        );
    }
}

export default InfoCard;
