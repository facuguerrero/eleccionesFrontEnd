import React from 'react';
import CandidatesGraph from "./CandidatesGraph/CandidatesGraph";
import AllTopicsGraph from "./AllTopicsGraph/AllTopicsGraph";
import "./Topics.scss"
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Particles from "react-particles-js";
import axios from "axios";
import moment from "moment";

class TopicHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphsAreLoaded: false,
            showErrorMessage: false,
            errorMessage: "",
            data: [],
            date: moment("12/10/2019").subtract(1, 'days')
        };
    }

    getMainGraphData = (date) => {
        axios.get('http://elecciones2019.fi.uba.ar/topics' +
            '?start_date=' +
            date.clone().subtract(28, 'days').format("YYYY-MM-DD").toString() +
            '&end_date=' +
            // '2019-08-07')
            //TODO veda
            date.format("YYYY-MM-DD").toString())
            .then((response) => {
                this.setState({
                    graphsAreLoaded: true,
                    showErrorMessage: false,
                    data: response.data,
                    date:date
                });
                this.forceUpdate();
            })
            .catch((error) => {
                this.setState({
                    showErrorMessage: true,
                    graphsAreLoaded: false,
                    errorMessage: "Hubo un error al cargar los datos, intentá nuevamente más tarde",
                })
            });
    };

    componentDidMount = () => {
        this.getMainGraphData(moment("12/10/2019").subtract(1, 'days'));
    };

    render() {
        return (
            <main className="main">
                {
                    !this.state.showErrorMessage ?
                        <div className="topics z-index-top">
                        {this.state.graphsAreLoaded ? <CandidatesGraph
                                id="graph1"
                                topicsShowing={this.state.topicsShowing}
                                selectionMessage={this.state.selectionMessage}
                                data={this.state.data}
                                date={this.state.date}
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
