import React from 'react';

class InfoCard extends React.Component {
    render() {
        return (
            <div className={
                this.props.show ? "info-card first-bc-color-light font-color-super-light" : "info-card-no-show"
            }>
                <p>Info sobre el gráfico Info sobre el gráfico Info
                    sobre el gráfico Info sobre el gráfico
                    Info sobre el gráfico Info sobre el gráfico </p>
            </div>
        );
    }
}

export default InfoCard;
