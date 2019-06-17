import React from 'react';
import Home from "../Home/Home";
import NavDrawer from "./ResponsiveDrawer";
import TopicHome from "../Topics/TopicHome";
import './NavBar.scss'


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
                {this.state.showTopicsWindow ? <TopicHome /> : null}
            </div>
        );
    }
}

export default NavBarWrapper;
