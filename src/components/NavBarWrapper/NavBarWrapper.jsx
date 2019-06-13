import React from 'react';
import Home from "../Home/Home";
import NavDrawer from "./ResponsiveDrawer";
import Topic from "../Topics/Topic";
import './NavBar.scss'
import GenericTopic from "../Topics/GenericTopic";


class NavBarWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFollowersWindow: true,
            showTopicsWindow: false
        };
    }

    changeWindow = (windowName) => {
        switch (windowName) {
            case "followers":
                return this.setState({
                    showFollowersWindow : true,
                    showTopicsWindow : false,
                });
            case "topics":
                return this.setState({
                    showFollowersWindow : false,
                    showTopicsWindow : true,
                });
            default:
                return this.setState({
                    showFollowersWindow : true,
                    showTopicsWindow : false,
                });
        }
    };

    render() {
        return (
            <div>
                <div className="flex-row main-nav">
                    <NavDrawer onSelected={this.changeWindow} selected={this.state}/>
                    <img className="logo" src="../../../../static/logo.png" />
                </div>
                {this.state.showFollowersWindow ? <Home /> : null}
                {this.state.showTopicsWindow ? <GenericTopic /> : null}
            </div>
        );
    }
}

export default NavBarWrapper;
