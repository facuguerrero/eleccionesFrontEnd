import React from 'react';
import PartyLineGraphSelection from "./PartyLineGraphSelection/PartyLineGraphSelection";
import './Similarities.scss'
import axios from "axios";
import moment from "moment";


class Similarities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
    }

    getData = () => {
        axios.get(
            'http://0.0.0.0/src/jsonsDummy/parties_dummy.json'
        )
            .then((response) => {
                this.setState({
                    data: this.processData(response.data),
                })
            })
            .catch((error) => {
                // this.setState({
                //     showEvolutionError: true,
                // })
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
                <PartyLineGraphSelection data={this.state.data}/>
            </main>
        );
    }

}

export default Similarities;
