import React, {Component} from 'react';
import '../../assets/components/app/main.css';

export default class App extends Component{
    constructor() {
        super();

        this.menuID = 0;

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

        this.addMenuElement = (title, href) => {
          return {
            id: this.menuID++,
            title: title,
            href: href
          }
        };

        this.state = {
          loading: false,
          error: false,
          leftTopMenu: [
              this.addMenuElement('название', 'project-name'),
              this.addMenuElement('краткое описание', 'short-desc'),
              this.addMenuElement('рабочая область', 'working-area'),
              this.addMenuElement('ссылки', 'footer-links'),
          ],

          rightTopMenu: [
              this.addMenuElement('вход', 'login'),
              this.addMenuElement('FAQ', 'faq'),
          ],

          mainData: null,
          mainDataSelected: [],

          footerLinks: [
              this.addMenuElement('оригинал-макет', 'https://handprinter.org/pages/home'),
              this.addMenuElement('Дуванов Алексей', 'https://github.com/kommandant-topp/react-internship'),
          ],

        };

        this.leftTopMenu = this.state.leftTopMenu.map(({id, title, href}) => {
          return (
                <li key={id}>
                  <a href={'#' + href}>{title}</a>
                </li>
          );
        });

        this.rightTopMenu = this.state.rightTopMenu.map(({id, title, href}) => {
            return (
                  <li key={id}>
                    <a href={'#' + href}>{title}</a>
                  </li>
            );
        });

        this.footerLinks = this.state.footerLinks.map(({id, title, href}) => {
            return (
               <a href={'#' + href} target="_blank" rel="noopener noreferrer" key={id}>{title}</a>
            );
        });

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
      const hasData = !loading && !error && mainData;

      const loadingContainer = loading ? <b>загрузка...</b> : null;
      const dataContainer = hasData
          ? <ol className="main-list" >
              {mainData.map( (item, index) => {

                  let activeIndex = index;

                  let activeClass = mainDataSelected[activeIndex]
                    ? 'active'
                    : '';

                  return (<li
                      className={activeClass}
                      key={item.name.replace(/\s+/g, '').toLowerCase()}
                      draggable
                      onDragStart={e => this.onDragStart(e, index)}
                      onDragOver={e => this.onDragOver(e, index)}
                      onDragEnd={this.onDragEnd}
                   >{item.name} <i>{item.model}</i>
                  </li>);
              })}
            </ol>
          : null;
      const errorContainer = error ? <h4>ошибка загрузки, проверьте консоль!</h4> : null;

      return(
          <div className="main-container">
            <header>

              <div className="top-block">
                <div className="logo-text">
                  <span>React</span>Internship
                </div>
                <div className="main-menu">
                  <ul>
                      {this.leftTopMenu}
                  </ul>
                </div>
                <div className="right-menu">
                  <ul>
                      {this.rightTopMenu}
                  </ul>
                </div>
              </div>

            </header>
            <main>
              <div className="main-block">
                <section>
                  <div className="name-area">
                    <h3 id="project-name">ReactInternship.Lesson7</h3>
                  </div>
                </section>
                <section>
                  <div className="desc-area">
                    <h3 id="short-desc">Краткое описание</h3>

                    <p>
                        ознакомиться с событиями в js и react
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
                              onError={this.handleOnError} />
                      </div>

                  </div>
                </section>
              </div>
            </main>
            <footer>
              <div className="bottom-block">
                  {this.footerLinks}
              </div>
            </footer>
          </div>
      );
    }
};


