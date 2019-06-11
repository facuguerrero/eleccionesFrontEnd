import { TemporaryDrawer } from '@materialr/drawer';
import React from 'react';
import {Menu} from "@material-ui/icons";
import NavButton from "./NavButton/NavButton";

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
                <TemporaryDrawer onClose={this.close} open={this.state.open}>
                    <NavButton
                        name="followers"
                        text="Análisis de Seguidores"
                        icon="TrendingUp"
                        onClick={this.props.onSelected}
                        isSelected={this.props.selected.showFollowersWindow}
                    />
                    <NavButton
                        name="topics"
                        text="Análisis de Tópicos"
                        icon="Timeline"
                        onClick={this.props.onSelected}
                        isSelected={this.props.selected.showTopicsWindow}
                    />
                </TemporaryDrawer>
                <div className="drawer__sample__toolbar-holder">
                    <Menu className="menu-button" fontSize="large" onClick={this.open} />
                </div>
            </div>
        );
    }
}

export default NavDrawer;
