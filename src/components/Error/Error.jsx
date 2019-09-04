import React from 'react';
import "./Error.scss"
import {Info} from "@material-ui/icons";

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className={"error " + (this.props.noMargin ? "error-small-margin" : "")}>
                <Info fontSize="large" htmlColor="white" className="error-icon"/>
                <span className="error-message font-lg white-font-color-light">
                    {this.props.errorMessage}
                </span>
            </div>
        );
    }
}

export default Error;
