import React from 'react';
import {connect} from "react-redux";
import {getGraphs} from "../../actions";
import CandidatesGraph from "./CandidatesGraph/CandidatesGraph";
import AllTopicsGraph from "./AllTopicsGraph/AllTopicsGraph";
import "./Topics.scss"
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Particles from "react-particles-js";

const topicMessage = "Seleccioná un Tópico para ver sus hashtags asociados";
const hashtagMessage = "Seleccioná un Hashtag para ver su evolución";

class TopicHomeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphsAreLoaded: false,
            showErrorMessage: false,
            errorMessage: "",
            selectionMessage: topicMessage,
            topicsShowing: true,
        };
    }

    componentDidMount() {
        this.props.getGraphs().then((response) => {
            response === 200 ?
                this.setState({ graphsAreLoaded: true, showErrorMessage: false })
                : this.setState({
                    showErrorMessage: true,
                    graphsAreLoaded: false,
                    errorMessage: "Hubo un error al cargar los datos, intentá nuevamente más tarde",
                })
        });
    }

    changeMessage = (type) => {
        const message = type === "topic" ? topicMessage : hashtagMessage;
        this.setState({
            selectionMessage: message,
            topicsShowing: !this.state.topicsShowing,
        })
    };

    render() {
        return (
            <main className="main">
                {
                    !this.state.showErrorMessage ?
                        <div className="topics z-index-top">
                        {this.state.graphsAreLoaded ? <CandidatesGraph
                                id="graph1"
                                changeMessage={this.changeMessage}
                                topicsShowing={this.state.topicsShowing}
                                selectionMessage={this.state.selectionMessage}
                            />
                            : <Loader/>
                        }
                        {/*{ this.state.graphsAreLoaded ? <AllTopicsGraph id="graph2" /> : null }*/}
                        </div>
                    : <Error errorMessage={this.state.errorMessage}/>
                }
                <Particles
                    className="particles"
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        }
                    }} />
            </main>
        );
    }
}

const TopicHome = connect(null, {getGraphs})(TopicHomeConnected);
export default TopicHome;

// NAV TUTORIAL
{/*<div>*/}
    {/*<div className="main-filters header-box graph-nav white-bc-color-light flex-column forth-br-color">*/}
        {/*<span className="title-nav font-md fifth-font-color-dark">Navegación</span>*/}
        {/*<span className="fifth-font-color-dark">-Clickear un nodo para acceder a su subgrafo</span>*/}
        {/*<span className="fifth-font-color-dark">-Clickear la flecha contigua al título para volver al grafo anterior</span>*/}
        {/*<span className="fifth-font-color-dark">-Utilizar el scroll para modificar el zoom</span>*/}
    {/*</div>*/}
{/*</div>*/}
