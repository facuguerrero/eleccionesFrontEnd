import React from 'react';
import './PartyLineGraphSelection.scss'
import PartySelection from "./PartySelection/PartySelection";
import PartyLineGraph from "./PartyLineGraph/PartyLineGraph";
import PartyRadarGraph from "./PartyRadarGraph/PartyRadarGraph";
import moment from "moment";
import SingleDatePickerWrapper from "../../Topics/SingleDatePickerWrapper/SingleDatePickerWrapper";

class PartyLineGraphSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeParties : []
        };
    }

    handleParty = (newParty) => {

        this.state.activeParties.includes(newParty)
            ? this.setState({activeParties: this.state.activeParties.filter(party => party !== newParty)})
            : this.setState({activeParties: this.state.activeParties.concat(newParty)});

    };

    render() {
        console.log(this.props.data)
        return (
            <div>
                <PartySelection
                    activeParties={this.state.activeParties}
                    onClick={this.handleParty}
                />
                {this.state.activeParties.length > 0 ?
                    <div>
                        <PartyLineGraph
                            title={this.props.title}
                            showInfo={true}
                            infoMessage={this.props.infoMessage}
                            data={this.props.data}
                            max={this.props.max}
                            min={this.props.min}
                            activeParties={this.state.activeParties}
                            showHorizontalLine={this.props.showRadar}
                        />
                        {this.props.showRadar ?
                            <div>
                                <div className="h"/>
                                {/*<div className="-filter-card-mg-pd dates-filter header-box white-bc-color-light">*/}
                                    {/*<div className="flex-row date-and-arrow">*/}
                                        {/*<span className="filter-text font-xmd second-font-color-dark">Elegí una fecha</span>*/}
                                        {/*<SingleDatePickerWrapper*/}
                                            {/*date={this.props.date1}*/}
                                            {/*updateDate={(newDate) => this.props.updateDates(1, newDate)}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                <PartyRadarGraph
                                    title={this.props.radarTitle + " de la fecha: " + moment().format("YYYY-MM-DD").toString()}
                                    showInfo={true}
                                    infoMessage={this.props.radarInfoMessage}
                                    data={this.props.radarData1}
                                    activeParties={this.state.activeParties}
                                    max={this.props.maxRadar1}
                                    min={this.props.minRadar1}
                                />
                                <div className="h"/>
                                {/*<div className="-filter-card-mg-pd dates-filter header-box white-bc-color-light">*/}
                                    {/*<div className="flex-row date-and-arrow">*/}
                                        {/*<span className="filter-text font-xmd second-font-color-dark">Elegí una fecha</span>*/}
                                        {/*<SingleDatePickerWrapper*/}
                                            {/*date={this.props.date2}*/}
                                            {/*updateDate={(newDate) => this.props.updateDates(2, newDate)}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                <PartyRadarGraph
                                    title={this.props.radarTitle + " de la fecha: " + moment().subtract(7, 'days').format("YYYY-MM-DD").toString()}
                                    showInfo={true}
                                    infoMessage={this.props.radarInfoMessage}
                                    data={this.props.radarData2}
                                    activeParties={this.state.activeParties}
                                    max={this.props.maxRadar2}
                                    min={this.props.minRadar2}
                                />
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
            </div>
        );
    }

}

export default PartyLineGraphSelection;
