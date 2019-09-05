import React from 'react';
import PartyLineGraphSelection from "./PartyLineGraphSelection/PartyLineGraphSelection";
import './Similarities.scss'
import axios from "axios";
import moment from "moment";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import Particles from "react-particles-js";


class Similarities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            showData: false,
            showErrorMessage: false

        };
    }

    getData = () => {
        axios.get(
            'http://0.0.0.0/src/jsonsDummy/parties_dummy.json'
        )
            .then((response) => {
                this.setState({
                    data: this.processData(response.data),
                    showData: true,
                    showErrorMessage: false
                })
            })
            .catch((error) => {
                this.setState({
                    showData: false,
                    showErrorMessage: true
                })
            })
    };

    processData = (data) => {
        let processedData = [];

        data["Frente De Todos"].forEach((point, index) => {
            let newData = {};
            newData["date"] = moment(data.date_axis[index] * 1000).format("DD/MM/YYYY");
            newData["Frente De Todos"] = data["Frente De Todos"][index];
            newData["Consenso Federal"] = data["Consenso Federal"][index];
            newData["Frente De Izquierda"] = data["Frente De Izquierda"][index];
            newData["Juntos Por El Cambio"] = data["Juntos Por El Cambio"][index];
            newData["Frente Despertar"] = data["Frente Despertar"][index];
            processedData.push(newData);
        });

        return processedData;
    };

    componentDidMount = () => {
        this.getData();
    };

    render() {
        return (
            <main className="main similarities">

                {
                    !this.state.showErrorMessage ?

                        <div className="z-index-top">
                            {
                                this.state.showData ?
                                    <PartyLineGraphSelection data={this.state.data}/>
                                    : <Loader/>
                            }
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

export default Similarities;
