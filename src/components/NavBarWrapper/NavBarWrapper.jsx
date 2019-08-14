import React from 'react';
import Followers from "../Followers/Followers";
import NavDrawer from "./ResponsiveDrawer";
import TopicHome from "../Topics/TopicHome";
import {resetCandidates} from "../../actions/index";
import './NavBar.scss'
import {connect} from "react-redux";
import MainDashboard from "../MainDashboard/MainDashboard";
import GenericDialog from "../Modal/GenericDialog";
import AppBarWrapper from "./AppBarWrapper";

class NavBarWrapperConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDashboardWindow: true,
            showFollowersWindow: false,
            showTopicsWindow: false,
            showing: 0,
        };
    }

    changeWindow = (windowName) => {
        switch (windowName) {
            case 0:
                return this.setState({
                    showDashboardWindow: true,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                    showing: 0,
                });
            case 1:
                this.props.resetCandidates();
                return this.setState({
                    showDashboardWindow: false,
                    showFollowersWindow : true,
                    showTopicsWindow : false,
                    showing: 1,
                });
            case 2:
                return this.setState({
                    showDashboardWindow: false,
                    showFollowersWindow : false,
                    showTopicsWindow : true,
                    showing: 2,
                });
            default:
                return this.setState({
                    showDashboardWindow: true,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                    showing: 0,
                });
        }
    };

    render() {
        return (
            <div className="fifth-bc-color-light">
                <img className="logo" src="../../../../static/logo.png" />
                <AppBarWrapper onSelected={this.changeWindow} selected={this.state.showing}/>
                {/*<div className="flex-row main-nav white-bc-color-light">*/}
                    {/*<NavDrawer onSelected={this.changeWindow} selected={this.state}/>*/}
                    {/*<img className="logo" src="../../../../static/logo.png" />*/}
                {/*</div>*/}
                {/*<GenericDialog*/}
                    {/*title="Elecciones Primarias, Abiertas, Simultáneas y Obligatorias"*/}
                    {/*description="Debido a la veda electoral continuaremos recopilando información*/}
                        {/*pero las visualizaciones sólo se alimentarán con datos de hasta el 08/08/2019."*/}
                {/*/>*/}
                {this.state.showDashboardWindow ? <MainDashboard /> : null}
                {this.state.showTopicsWindow ? <TopicHome /> : null}
                {this.state.showFollowersWindow ? <Followers /> : null}
            </div>
        );
    }
}

const NavBarWrapper = connect(null, {resetCandidates})(NavBarWrapperConnected);
export default NavBarWrapper;
