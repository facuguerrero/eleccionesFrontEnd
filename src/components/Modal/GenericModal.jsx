import React from 'react';
import "./Modal.scss"
import {Info} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";

class GenericModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    setShow = () => {
        this.setState({show:false})
    };

    render() {
        console.log(this.state.show)
        return (
            <div>
                <Dialog
                    title="Dialog Without"
                    modal={false}
                    open={this.state.show}
                    onRequestClose={this.setShow}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}

export default GenericModal;
