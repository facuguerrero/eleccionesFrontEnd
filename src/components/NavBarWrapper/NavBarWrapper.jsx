import React from 'react';
import Followers from "../Followers/Followers";
import NavDrawer from "./ResponsiveDrawer";
import TopicHome from "../Topics/TopicHome";
import {resetCandidates} from "../../actions/index";
import './NavBar.scss'
import {connect} from "react-redux";
import MainDashboard from "../MainDashboard/MainDashboard";

class NavBarWrapperConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDashboardWindow: true,
            showFollowersWindow: false,
            showTopicsWindow: false
        };
    }

    changeWindow = (windowName) => {
        switch (windowName) {
            case "dashboard":
                return this.setState({
                    showDashboardWindow: true,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                });
            case "followers":
                this.props.resetCandidates();
                return this.setState({
                    showDashboardWindow: false,
                    showFollowersWindow : true,
                    showTopicsWindow : false,
                });
            case "topics":
                return this.setState({
                    showDashboardWindow: false,
                    showFollowersWindow : false,
                    showTopicsWindow : true,
                });
            default:
                return this.setState({
                    showDashboardWindow: true,
                    showFollowersWindow : false,
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
                {this.state.showDashboardWindow ? <MainDashboard /> : null}
                {this.state.showFollowersWindow ? <Followers /> : null}
                {this.state.showTopicsWindow ? <TopicHome /> : null}
            </div>
        );
    }
}

const NavBarWrapper = connect(null, {resetCandidates})(NavBarWrapperConnected);
export default NavBarWrapper;
