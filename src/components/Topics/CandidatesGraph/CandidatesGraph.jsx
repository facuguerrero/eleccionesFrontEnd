import React from 'react';
import GenericTopic from "../GenericTopic";
import {connect} from "react-redux";
import "./CandidatesGraph.scss"
import TopicTitleBar from "../TopicTitleBar/TopicTitleBar";
import axios from "axios";
import Error from "../../Error/Error";
import TopOptions from "./TopOptions/TopOptions";
import TopicsLineGraph from "./TopicsLineGraph";
import moment from "moment";
import GenericGraph from "../../Followers/Graphs/GenericGraph";
import TweetEmbed from "react-tweet-embed/dist/tweet-embed";
import EmptySelection from "../../EmptySelection/EmptySelection";

const mapStateToProps = state => {
    return {
        candidateGraphs: state.candidateGraphs
    };
};

class CandidatesGraphConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainGraph: true,
            processedGraph: this.processGraphData(this.props.candidateGraphs),
            showErrorMessage: false,
            errorMessage: "",
            evolutionData: [],
            showEvolution: false,
            showEvolutionError: false,
            activeNode: "",
            tweetId: "",
        };
    }

    getTopicGraph = (topicId) => {
        axios.get(
            'http://elecciones2019.fi.uba.ar/topics/' +
            topicId +
            '?start_date=2019-01-01&end_date=' +
            //"2019-08-07"
            //TODO veda
            moment() .subtract(1, 'days').format("YYYY-MM-DD").toString()
            )
            .then((response) => {
                this.props.changeMessage("hashtag");
                this.setState({
                    mainGraph: false,
                    processedGraph: this.processGraphData(response.data),
                })
            })
            .catch((error) => {
                this.setState({
                    showErrorMessage: true,
                    errorMessage: "Hubo un error al cargar el grafo, intentá nuevamente más tarde",
                })
            })
    };

    getTopicEvolution = (topicId) => {
        axios.get(
            'http://elecciones2019.fi.uba.ar/topic_usage/' +
            topicId +
            '?start_date=2019-01-01&end_date=' +
            // "2019-08-07"
            //TODO veda
            moment().subtract(1, 'days').format("YYYY-MM-DD").toString()
            )
            .then((response) => {
                this.setState({
                    showEvolution: true,
                    evolutionData: this.processEvolutionData(response.data, topicId),
                    activeNode: topicId,
                    showEvolutionError: false,
                    tweetId: response.data.tweet_id
                })
            })
            .catch((error) => {
                this.setState({
                    showEvolutionError: true,
                })
            })
    };

    getHashtagEvolution = (hashtagId) => {
        axios.get(
            'http://elecciones2019.fi.uba.ar/hashtag_usage/' +
            hashtagId +
            '?start_date=2019-01-01&end_date=' +
            // "2019-08-07"
            //TODO veda
            moment().subtract(1, 'days').format("YYYY-MM-DD").toString()
        )
            .then((response) => {
                this.setState({
                    showEvolution: true,
                    evolutionData: this.processEvolutionData(response.data, hashtagId),
                    activeNode: hashtagId,
                    showEvolutionError: false,
                    tweetId: response.data.tweet_id
                })
            })
            .catch((error) => {
                this.setState({
                    showEvolutionError: true,
                })
            })
    };

    changeGraph = (nodeId) => {

        if(this.state.mainGraph){
            this.getTopicGraph(nodeId);
            this.getTopicEvolution(nodeId);
        } else {
            this.getHashtagEvolution(nodeId);
        }

    };

    changeToPreviousGraph = () => {
        if(!this.state.mainGraph) {
            this.props.changeMessage("topic");
            this.setState({
                mainGraph: true,
                processedGraph: this.processGraphData(this.props.candidateGraphs),
                showEvolutionError: false,
            })
        }
    };

    processGraphData = (currentGraph) => {
        let newProcessedGraph = {};
        const processedNodes = currentGraph.nodes.map(node => {
            let newNode = {};
            newNode["id"] = node.id;
            newNode["size"] = node.size / 100;
            return newNode;

        })
            .sort(function(nodeA, nodeB) {
                return nodeB.size - nodeA.size;
            });
        newProcessedGraph["links"] = currentGraph.links;
        newProcessedGraph["nodes"] = processedNodes;
        return newProcessedGraph;
    };

    processEvolutionData = (evolutionData, nodeId) => {
        let processedData = [];

        evolutionData.count_axis.forEach((point, index) => {
            let data = {};
            data["date"] = moment(evolutionData.date_axis[index] * 1000).format("DD/MM/YYYY");
            data[nodeId] = point;
            processedData.push(data);
        });
        return processedData;
    };

    render() {
        return (
            <div>
                { !this.state.showErrorMessage ?
                    <div>
                        <EmptySelection message={this.props.selectionMessage} />
                        <div className="main-topics">
                            <div className="top-topics flex-column followers-graph white-bc-color-light">
                                <TopicTitleBar withPrevious={false}
                                               title={(this.props.topicsShowing ? "Tópicos" : "Hashtags") +
                                                   " En Orden de Importancia"}
                                               showInfo={false}
                                               titleSize={"font-xmd"}
                                />
                                <TopOptions options={this.state.processedGraph} onClickNode={this.changeGraph}/>
                            </div>
                            <div className="topic-graph followers-graph white-bc-color-light">
                                <TopicTitleBar withPrevious={true}
                                               disabled={this.state.mainGraph}
                                               showPrevious={this.changeToPreviousGraph}
                                               title={"Grafo de " + (this.props.topicsShowing ? "Tópicos" : "Hashtags")}
                                               titleSize={"font-md"}
                                               showInfo={true}
                                               infoMessage={"Los tópicos representan un conjunto de " +
                                               (this.props.topicsShowing ? "Tópicos" : "Hashtags") +
                                               " agrupados según su contenido."}
                                />
                                <GenericTopic id={this.props.id}
                                              data={this.state.processedGraph}
                                              onClickNode={this.changeGraph}
                                />
                            </div>
                        </div>
                        {!this.state.showEvolutionError ?
                            <div>
                                {
                                    this.state.showEvolution ?
                                        <div className="main-topics">
                                            <div className="followers-graph evolution-basis white-bc-color-light">
                                                <GenericGraph
                                                    title="Cantidad de usuarios únicos que lo usaron por día"
                                                    showLabels={false}
                                                    showInfo={false}
                                                    type={<TopicsLineGraph
                                                        data={this.state.evolutionData}
                                                        name={this.state.activeNode}
                                                    />}
                                                />
                                            </div>
                                            {!this.props.topicsShowing ?
                                                <div className="flex-column tweet-wrapper">
                                                    <div className="tweet-title white-bc-color-light">
                                                    <span className="bold-text font-md">
                                                        {"Tweet donde se originó el hashtag #" + this.state.activeNode}
                                                    </span>
                                                    </div>
                                                    <TweetEmbed
                                                        id={this.state.tweetId}
                                                        // placeholder={'loading'}
                                                        options={{dnt: true, lang: "es"}}
                                                    />
                                                </div>
                                                : null
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                            : <Error noMargin={true} errorMessage="Entrá más tarde para ver la evolución histórica"/>
                        }
                    </div>
                : <Error errorMessage={this.state.errorMessage}/>
                }
            </div>
    )
    }

    tweetLoadError = (error) => {
        console.log(error)
    }
}

const CandidatesGraph = connect(mapStateToProps, null)(CandidatesGraphConnected);
export default CandidatesGraph;
