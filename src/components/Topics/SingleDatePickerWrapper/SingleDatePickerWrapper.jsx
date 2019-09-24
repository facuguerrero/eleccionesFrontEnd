import React from 'react';
import SingleDatePick from "./SingleDatePick";

class SingleDatePickerWrapper extends React.Component {

    updateDate = (date) => {
        this.props.updateDate(date);
    };

    render() {
        return (
            <SingleDatePick date={this.props.date} updateDate={this.updateDate}/>
        );
    }
}

export default SingleDatePickerWrapper;
