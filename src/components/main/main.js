import React, {Component} from 'react';

import Loader from '../loader/loader';
import ErrorContainer from '../error-container/error-container';
import MainList from '../main-list/main-list';

export default class Main extends Component{
    constructor() {
        super();

        this.currentDraggedItem = null;
        this.stopDraggedItem = null;

        this.handleKeyPress = function(e) {
            let num = 1 * e.key;

            if (isNaN(num)
                || this.state.loading
                || this.state.error
                || !this.state.mainData[num]
            ){
                return;
            }

            num = num !== 0
                ? num - 1
                : this.state.mainData.length - 1;


            this.setState(({mainDataSelected}) => {
                const list = [...mainDataSelected];

                list[num] = list[num] === undefined
                    ? true
                    : !list[num];

                return {
                    mainDataSelected: list
                }
            });

        };

        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            loading: false,
            error: false,
            mainData: null,
            mainDataSelected: [],
        };

        this.getStarshipList = async () => {

            this.setState({
                loading: true
            });

            let response = await fetch(
                process.env.REACT_APP_STARWARS_API_BASE
                + process.env.REACT_APP_STARSHIPS_ENDPOINT
            );

            let jsonData = await response.json();

            this.setState({
                loading: false,
                mainData: jsonData.results
            });
        };

        this.onDragStart = (e, index) => {
            this.currentDraggedItem = this.state.mainData[index];

            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", e.target);
        };

        this.onDragOver = (e, index) => {
            this.stopDraggedItem = this.state.mainData[index];

            if (this.currentDraggedItem === this.stopDraggedItem){
                return;
            }

            let list = this.state.mainData.filter(
                item => item !== this.currentDraggedItem
            );

            list.splice(index, 0, this.currentDraggedItem);

            this.setState({
                mainData: list
            });
        };

        this.onDragEnd = () => {
            this.currentDraggedItem = null;
            this.stopDraggedItem = null;
        };

        this.handleOnLoad = e => {
            alert('image loaded');
        };

        this.handleOnError = e => {
            alert('image loading error');
        }
    }

    componentDidMount(){
        this.getStarshipList()
            .catch( err => {
                console.log(err);

                this.setState({
                    loading: false,
                    error: true
                });
            });

        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render(){
        const { mainData, mainDataSelected, loading, error } = this.state;

        const dataContainer = (!loading && !error && mainData)
            ? <MainList mainData={mainData} mainDataSelected={mainDataSelected} onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDragEnd={this.onDragEnd} />
            : null;
        const loadingContainer = loading ? <Loader /> : null;
        const errorContainer = error ? <ErrorContainer /> : null;

        return(
            <main>
                <div className="main-block">
                    <section>
                        <div className="name-area">
                            <h3 id="project-name">ReactInternship.Lesson9</h3>
                        </div>
                    </section>
                    <section>
                        <div className="desc-area">
                            <h3 id="short-desc">Краткое описание</h3>

                            <p>
                                ознакомиться с компонентами в React, ознакомиться с чистыми функциями и необходимостью их применения
                            </p>
                        </div>

                    </section>
                    <section>
                        <div className="main-area">
                            <h3 id="working-area">Рабочая область</h3>
                            <p>корабли</p>
                            {loadingContainer}
                            {dataContainer}
                            {errorContainer}

                            <div className="info">
                                нажатие 1-9 меняет статус пунктов 1-9, нажатие 0 меняет статус пункта 10
                            </div>
                            <div>
                                <img
                                    alt="catz!"
                                    src={process.env.REACT_APP_IMAGE_FOR_EVENTS}
                                    onLoad={this.handleOnLoad}
                                    onError={this.handleOnError}
                                 />
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        );
    }
}