import React from 'react';

class PartyHeader extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.partyName);
    };

    render() {
        const partyBackground = this.props.isPartyActive ? this.props.partyName.replace(/ /g, "") + "-bc-color" : "";
        const font = this.props.isPartyActive ? "white-font-color-light" : "fifth-font-color-dark";
        return (
            <div className="party-selection-header">
                <div
                    className={"header-party-size header-box -filter-card-mg-pd white-bc-color-light "
                        + this.props.partyName.replace(/ /g, "") + "-br-color "
                        + partyBackground
                    }
                    onClick={this.handleClick}
                >
                    <span className={"font-xmd party-header-title " + font}>{this.props.partyName}</span>
                </div>
            </div>
        );
    }

}

export default PartyHeader;
