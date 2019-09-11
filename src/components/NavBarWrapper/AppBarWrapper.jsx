import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Home, Timeline, TrendingUp, InfoOutlined, PermIdentity, Assessment} from "@material-ui/icons";

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

class AppBarWrapper extends React.Component {

    handleChange = (event, newValue) => {
        this.props.onSelected(newValue);
    };

    render() {
        return (
            <div className="flex-row main-nav-bar">
                <AppBar position="relative" color="default">
                    <Tabs
                        value={this.props.selected}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="General" icon={<Home />} {...a11yProps(0)} />
                        <Tab label="Seguidores" icon={<TrendingUp />} {...a11yProps(1)} />
                        <Tab label="Tópicos" icon={<Timeline />} {...a11yProps(2)} />
                        <Tab label="Actividad" icon={<PermIdentity />} {...a11yProps(3)} />
                        <Tab label="Partidos" icon={<Assessment />} {...a11yProps(4)} />
                        <Tab label="Información" icon={<InfoOutlined />} {...a11yProps(5)} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }

}

export default AppBarWrapper;
