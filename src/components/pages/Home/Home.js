import React, {Component} from 'react';

import HomeView from './HomeView';

export default class Home extends Component{
    constructor(props) {
        super(props);

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

        this.handleOnLoad = () => {
            alert('image loaded');
        };

        this.handleOnError =() => {
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

        return(
            <HomeView
                mainData={mainData}
                mainDataSelected={mainDataSelected}
                loading={loading}
                error={error}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDragEnd={this.onDragEnd}
                handleOnLoad={this.handleOnLoad}
                handleOnError={this.handleOnError}
            />
        );
    };
};