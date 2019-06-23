import React from 'react';
import Home from "../Home/Home";
import NavDrawer from "./ResponsiveDrawer";
import TopicHome from "../Topics/TopicHome";
import {resetCandidates} from "../../actions/index";
import './NavBar.scss'
import {connect} from "react-redux";


class NavBarWrapperConnected extends React.Component {
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
                this.props.resetCandidates();
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
            <div className="fifth-bc-color-light">
                <div className="flex-row main-nav white-bc-color-light">
                    <NavDrawer onSelected={this.changeWindow} selected={this.state}/>
                    <img className="logo" src="../../../../static/logo.png" />
                </div>
                {this.state.showFollowersWindow ? <Home /> : null}
                {this.state.showTopicsWindow ? <TopicHome /> : null}
            </div>
        );
    }
}

const NavBarWrapper = connect(null, {resetCandidates})(NavBarWrapperConnected);
export default NavBarWrapper;
