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
    handleClick = (windowName) => {
        this.close();
        this.props.onSelected(windowName);
    };
    render() {
        return (
            <div className="drawer__sample">
                <TemporaryDrawer onClose={this.close} open={this.state.open}>
                    <NavButton
                        name="dashboard"
                        text="Información General"
                        icon="Home"
                        onClick={this.handleClick}
                        isSelected={this.props.selected.showDashboardWindow}
                    />
                    <NavButton
                        name="followers"
                        text="Análisis de Seguidores"
                        icon="TrendingUp"
                        onClick={this.handleClick}
                        isSelected={this.props.selected.showFollowersWindow}
                    />
                    <NavButton
                        name="topics"
                        text="Análisis de Tópicos"
                        icon="Timeline"
                        onClick={this.handleClick}
                        isSelected={this.props.selected.showTopicsWindow}
                    />
                </TemporaryDrawer>
                <div className="drawer__sample__toolbar-holder menu-button">
                    <Menu fontSize="large" onClick={this.open} />
                </div>
            </div>
        );
    }
}

export default NavDrawer;
