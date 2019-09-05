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
import About from "../About/About";
import Similarities from "../Similarities/Similarities";
import Summary from "../Summary/Summary";

class NavBarWrapperConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSummaryWindow: true,
            showDashboardWindow: false,
            showFollowersWindow: false,
            showTopicsWindow: false,
            showInfoWindow: false,
            showSimilarities: false,
            showing: 0,
        };
    }

    changeWindow = (windowName) => {
        switch (windowName) {
            case 0:
                return this.setState({
                    showSummaryWindow: true,
                    showDashboardWindow: false,
                    showFollowersWindow: false,
                    showTopicsWindow: false,
                    showInfoWindow: false,
                    showSimilarities: false,
                    showing: 0,
                });
            case 1:
                this.props.resetCandidates();
                return this.setState({
                    showSummaryWindow: false,
                    showDashboardWindow: false,
                    showFollowersWindow : true,
                    showTopicsWindow : false,
                    showInfoWindow: false,
                    showSimilarities: false,
                    showing: 1,
                });
            case 2:
                return this.setState({
                    showSummaryWindow: false,
                    showDashboardWindow: false,
                    showFollowersWindow : false,
                    showTopicsWindow : true,
                    showInfoWindow: false,
                    showSimilarities: false,
                    showing: 2,
                });
            case 3:
                return this.setState({
                    showSummaryWindow: false,
                    showDashboardWindow: true,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                    showInfoWindow: false,
                    showSimilarities: false,
                    showing: 3,
                });
            case 4:
                return this.setState({
                    showSummaryWindow: false,
                    showDashboardWindow: false,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                    showInfoWindow: true,
                    showSimilarities: false,
                    showing: 4,
                });
            case 5:
                return this.setState({
                    showSummaryWindow: false,
                    showDashboardWindow: false,
                    showFollowersWindow : false,
                    showTopicsWindow : false,
                    showInfoWindow: false,
                    showSimilarities: true,
                    showing: 5,
                });
            default:
                return this.setState({
                    showSummaryWindow: true,
                    showDashboardWindow: false,
                    showFollowersWindow: false,
                    showTopicsWindow: false,
                    showInfoWindow: false,
                    showSimilarities: false,
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
                {this.state.showSummaryWindow ? <Summary changeWindow={this.changeWindow} /> : null}
                {this.state.showDashboardWindow ? <MainDashboard /> : null}
                {this.state.showTopicsWindow ? <TopicHome /> : null}
                {this.state.showFollowersWindow ? <Followers /> : null}
                {/*{this.state.showSimilarities ? <Similarities /> : null}*/}
                {this.state.showInfoWindow ? <About /> : null}

            </div>
        );
    }
}

const NavBarWrapper = connect(null, {resetCandidates})(NavBarWrapperConnected);
export default NavBarWrapper;
