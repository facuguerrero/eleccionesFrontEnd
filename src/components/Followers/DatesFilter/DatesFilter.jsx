import React from 'react';
import { connect } from "react-redux";
import DatesPicker from "./DatesPicker";
import { updateDate } from "../../../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        updateDate: date => dispatch(updateDate(date))
    };
}


class DatesFilterConnected extends React.Component {

    updateDate = (minDate, maxDate) => {
        this.props.updateDate({ minDate, maxDate });
    };

    render() {
        return (
            <DatesPicker updateDate={this.updateDate}/>
        );
    }
}

const DatesFilter = connect(null, mapDispatchToProps)(DatesFilterConnected);
export default DatesFilter;
