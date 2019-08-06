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
            <div className="error">
                <Info fontSize="large" htmlColor="#878889" className="error-icon"/>
                <span className="error-message font-lg fifth-font-color">
                    {this.props.errorMessage}
                </span>
            </div>
        );
    }
}

export default Error;
