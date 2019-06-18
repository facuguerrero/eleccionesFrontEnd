import React from 'react';
import {Info} from "@material-ui/icons";
import InfoCard from './InfoCard'
import "./Information.scss"

class Information extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoCard: false,
        };
    }

    showInfoCard = (bool) => {
        this.setState({ showInfoCard: bool })
    };

    render() {
        return (
            <div>
                <InfoCard show={this.state.showInfoCard}/>
                <Info
                    className="info-button"
                    fontSize="large"
                    onMouseEnter={() => this.showInfoCard(true)}
                    onMouseLeave={() => this.showInfoCard(false)}
                />
            </div>
        );
    }
}

export default Information;
