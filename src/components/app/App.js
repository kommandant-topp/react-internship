import React from 'react';
import './main.css';

const App = () => {
  return(
      <div>
        <header>

          <div className="top-block">
            <div className="logo-text">
              <span>React</span>Internship
            </div>
            <div className="main-menu">
              <ul>
                <li><a href="#project-name">название</a></li>
                <li><a href="#short-desc">краткое описание</a></li>
                <li><a href="#working-area">рабочая область</a></li>
                <li><a href="#footer-links">ссылки</a></li>
              </ul>
            </div>
            <div className="right-menu">
              <ul>
                <li><a href="#login">вход</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </div>

        </header>
        <main>
          <div className="main-block">
            <section>
              <div className="name-area">
                <h3 id="project-name">ReactInternship.Lesson3</h3>
              </div>
            </section>
            <section>
              <div className="desc-area">
                <h3 id="short-desc">Краткое описание</h3>

                <p>
                  Ознакомиться с node и npm, получить базовые понятия о том что такое react, развернуть первый проект с помощью react cli
                </p>
              </div>

            </section>
            <section>
              <div className="main-area">
                <h3 id="working-area">Рабочая область</h3>
                <p>Выпуски скринкаста</p>
                <ol className="main-list">
                  <li>Введение, компонентный подход</li>
                  <li>Настройка окружения, create-react-app</li>
                  <li>JSX - синтаксис для разметки в React.js</li>
                  <li>React-компонент, передача данных</li>
                  <li>Интерактивность, состояние компонентов</li>
                  <li>Virtual DOM - основной алгоритм React.js</li>
                  <li>Отображение массивов, смысл аттрибута key</li>
                  <li>Оформление компонентов, работа с CSS</li>
                </ol>
              </div>
            </section>
          </div>
        </main>
        <footer>
          <div className="bottom-block">
            <a href="https://handprinter.org/pages/home" target="_blank" rel="noopener noreferrer" >оригинал-макет</a>
            <a href="https://github.com/kommandant-topp/react-internship" target="_blank" rel="noopener noreferrer" >Дуванов Алексей</a>
          </div>
        </footer>
      </div>
  );
};

export default App;
