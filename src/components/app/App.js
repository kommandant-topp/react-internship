import React, {Component} from 'react';
import '../../assets/components/app/main.css';

export default class App extends Component{
    constructor() {
        super();

        this.ID = 0;
        this.menuID = 0;

        this.createObjectCustomKey = (key, value) => {
          let obj = {};
          obj[key] = value;

          return obj;
        };

        this.arrayToObject = array => {
            return array.reduce( (obj, current) => {
                let tobj = {};
                tobj[current[0]] = current[1];

                Object.assign(obj, tobj );

                return obj;
            }, {});
        };

        this.createItem = (year, label) => {
           return this.createObjectCustomKey(
               'entry' + this.ID++,
               {
                   year: year,
                   label: label
               }
           );
        };

        this.addMenuElement = (title, href) => {
          return {
            id: this.menuID++,
            title: title,
            href: href
          }
        };

        this.state = {
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

          footerLinks: [
              this.addMenuElement('оригинал-макет', 'https://handprinter.org/pages/home'),
              this.addMenuElement('Дуванов Алексей', 'https://github.com/kommandant-topp/react-internship'),
          ],

          bio: {
              ...this.createItem(1999, 'ЦНТУ'),
              ...this.createItem(2004, 'ИВЦ ЦНТУ'),
              ...this.createItem(2005, 'YasenDesign'),
              ...this.createItem(2006, 'KoreDesign'),
              ...this.createItem(2007, 'WebHata'),
              ...this.createItem(2013, 'freelance'),
              ...this.createItem(2017, 'ROMAD LLC')
          },
          sortDest: -1
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

        this.mainList = () => {
            let list = [];

            for (let key in this.state.bio){
                list.push(<li key={key}>{this.state.bio[key].year}&nbsp;{this.state.bio[key].label}</li>);
            }

            return list.map( val => {
               return val;
            })
        };

        this.footerLinks = this.state.footerLinks.map(({id, title, href}) => {
            return (
               <a href={'#' + href} target="_blank" rel="noopener noreferrer" key={id}>{title}</a>
            );
        });

        this.addListItem = () => {
            this.setState(({bio}) => {
              return {
                bio: {
                    ...bio,
                    ...this.createItem(1988, 'Школа')
                }
              }
            });
        };

        this.deleteListItem = () => {
            this.setState(({bio}) => {
                let lastKey = '',
                    list = {...bio};

                for (let key in bio){
                    lastKey = key;
                }

                delete list[lastKey];

                return {
                    bio: list
                }
            });
        };

        this.sortList = () => {
          this.setState(({bio, sortDest}) => {
              let list = {...bio};

              list = this.commonSortList(Object.entries(bio), sortDest);
              //list = this.customSortList(Object.entries(bio), sortDest);

              return {
                bio: this.arrayToObject(list),
                sortDest: sortDest * -1
              }
          });
        };

        this.commonSortList = (arr, dest) => {
            return arr.sort(
                (a, b) => {
                    return (a[1].year - b[1].year) * dest;
                }
            );
        };

        this.customSortList = (arr, dest) =>
        {
            let arrayLength = arr.length, delta = Math.floor(arrayLength/2);

            let getDest = (dest, deltaValue, currentValue) => {
              if (dest > 0){
                  return deltaValue > currentValue;
              } else {
                  return deltaValue < currentValue;
              }
            };

            while (delta > 0)
            {
                for (let mainIndex = 0; mainIndex < arrayLength; mainIndex++)
                {
                    let k = mainIndex,
                        currentValue = arr[mainIndex];

                    while (k >= delta && getDest(dest, arr[k-delta][1].year, currentValue[1].year))
                    {
                        arr[k] = arr[k-delta];
                        k -= delta;
                    }

                    arr[k] = currentValue;
                }

                delta = Math.floor(delta/2);
            }
            return arr;
        }

    }

    render(){
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
                    <h3 id="project-name">ReactInternship.Lesson5</h3>
                  </div>
                </section>
                <section>
                  <div className="desc-area">
                    <h3 id="short-desc">Краткое описание</h3>

                    <p>
                      основы js, массивы
                    </p>
                  </div>

                </section>
                <section>
                  <div className="main-area">
                    <h3 id="working-area">Рабочая область</h3>
                    <p>био</p>
                    <ol className="main-list" onClick={this.sortList}>
                        {this.mainList()}
                    </ol>
                    <div className="control-buttons">
                      <button onClick={this.addListItem}>добавить поле</button>
                      <button onClick={this.deleteListItem}>удалить поле</button>
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


