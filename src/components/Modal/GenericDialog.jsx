import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './Modal.scss'

class GenericDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen:true
        };
    }

    handleClose = () => {
        this.setState({isOpen:false});
    };

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.isOpen}>
                <span className="modal-title text-center font-md bold-text">{this.props.title}</span>
                <p className="modal-description font-xmd">{this.props.description}</p>
            </Dialog>
        );
    }
}

export default GenericDialog;
