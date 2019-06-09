import { TemporaryDrawer } from '@materialr/drawer';
import React from 'react';
import {Menu} from "@material-ui/icons";

class NavDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    close = () => {
        this.setState({ open: false });
    };
    open = () => {
        this.setState({ open: true });
    };
    render() {
        return (
            <div className="drawer__sample">
                <Menu fontSize="large" onClick={this.open} />
                <TemporaryDrawer onClose={this.close} open={this.state.open}>
                    {/* Drawer content */}
                </TemporaryDrawer>
                <div className="drawer__sample__toolbar-holder">
                    {/* Toolbar - button 'onClick' calls 'open' */}
                    {/* Page content */}
                </div>
            </div>
        );
    }
}

export default NavDrawer;
