import React from "react";

class TextBullet extends React.Component {

    handleClick = () => {
        this.props.onClickNode(this.props.mainText);
    };

    render() {
        return (
            <div className="flex-row fifth-font-color-dark bullet" onClick={this.handleClick}>
                <span className="bullet-text font-xmd second-font-color-dark bold-text">{this.props.index + 1 + "."}</span>
                <span className="bullet-text">{this.props.mainText}</span>
                <span className="">{this.props.secondaryText}</span>
            </div>
        );
    }
}

export default TextBullet;
