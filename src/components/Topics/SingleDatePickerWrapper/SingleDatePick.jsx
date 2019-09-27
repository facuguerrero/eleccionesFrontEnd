import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import DateRangePicker from "../../Followers/DatesFilter/DatesPicker";

export default class SingleDatePick extends React.Component {
    state= {
        calendarFocused: false
    };

    onDateChange = (createdAt) => {
        this.props.updateDate(createdAt)
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };

    render() {
        return (
            <div className="single-date-style">
                <form>
                    <SingleDatePicker
                        date={this.props.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        hideKeyboardShortcutsPanel={true}
                        enableOutsideDays={true}
                        isOutsideRange={date => date.isBefore(moment("07/01/2019"), 'day') || date.isAfter(moment().subtract(1, 'days'), 'day')}
                        numberOfMonths={1}
                        displayFormat="DD/MM/YYYY"
                    />
                </form>
            </div>
        )
    }
}
