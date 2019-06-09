import React from 'react';
import Home from "../Home/Home";
import NavDrawer from "./ResponsiveDrawer";

class NavBarWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
    }

    render() {
        return (
            <div>
                <div className="flex-row main-nav">
                    <NavDrawer />
                    <img className="logo" src="../../../../static/logo.png" />
                </div>
                <Home />
            </div>
        );
    }
}

export default NavBarWrapper;
