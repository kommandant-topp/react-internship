import React, {Component} from 'react';
import '../../assets/components/app/main.css';

export default class App extends Component{
    constructor() {
        super();

        this.ID = 0;
        this.menuID = 0;

        this.starwarsApiBase = 'https://swapi.co/api';
        this.starhipsEndpoint = '/starships/';

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
                this.starwarsApiBase + this.starhipsEndpoint
            );

            let jsonData = await response.json();

            this.setState({
                loading: false,
                mainData: jsonData.results
            });
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
    }

    render(){

      const { mainData, loading, error } = this.state;
      const hasData = !loading && !error && mainData;

      const loadingContainer = loading ? <b>загрузка...</b> : null;
      const dataContainer = hasData
          ? <ol className="main-list" >
              {mainData.map(item => {
                  return (<li key={item.name.replace(/\s+/g, '').toLowerCase()}>{item.name} <i>{item.model}</i></li>);
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
                        основы js, область видимости, fetch
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


