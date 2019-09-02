import React from 'react';
import { css } from '@emotion/core';
import {HashLoader} from 'react-spinners';
import "./Loader.scss"

const override = css`
    display: block;
    margin: auto;
`;

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className={this.props.smallMargin ? "loader-small-margin" : "loader"}>
                <HashLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#002232'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Loader;
