import React from 'react';
import '../../assets/components/app/main.css';

const App = () => {

  const project_name_block = <div className="logo-text">
        <span>React</span>Internship
      </div>;

  const left_top_menu_1 = 'название',
      left_top_menu_2 = 'краткое описание',
      left_top_menu_3 = 'рабочая область',
      left_top_menu_4 = 'ссылки';

  const left_top_menu_href_1 = 'project-name',
      left_top_menu_href_2 = 'short-desc',
      left_top_menu_href_3 = 'working-area',
      left_top_menu_href_4 = 'footer-links';

  const right_top_menu_1 = 'вход',
      right_top_menu_2 = 'FAQ';

  const right_top_menu_href_1 = 'login',
    right_top_menu_href_2 = 'faq';

  const lesson_name = 'ReactInternship.Lesson4';

  const screen_cast_element_1 = 'Введение, компонентный подход',
      screen_cast_element_2 = 'Настройка окружения, create-react-app',
      screen_cast_element_3 = 'JSX - синтаксис для разметки в React.js',
      screen_cast_element_4 = 'React-компонент, передача данных',
      screen_cast_element_5 = 'Интерактивность, состояние компонентов',
      screen_cast_element_6 = 'Virtual DOM - основной алгоритм React.js',
      screen_cast_element_7 = 'Отображение массивов, смысл аттрибута key',
      screen_cast_element_8 = 'Оформление компонентов, работа с CSS';

  const footer_links_text_1 = 'оригинал-макет',
      footer_links_text_2 = 'Дуванов Алексей';

  const footer_links_href_1 = 'https://handprinter.org/pages/home',
      footer_links_href_2 = 'https://github.com/kommandant-topp/react-internship';

  return(
      <div>
        <header>

          <div className="top-block">
              {project_name_block}
            <div className="main-menu">
              <ul>
                <li><a href={'#' + left_top_menu_href_1}>{left_top_menu_1}</a></li>
                <li><a href={'#' + left_top_menu_href_2}>{left_top_menu_2}</a></li>
                <li><a href={'#' + left_top_menu_href_3}>{left_top_menu_3}</a></li>
                <li><a href={'#' + left_top_menu_href_4}>{left_top_menu_4}</a></li>
              </ul>
            </div>
            <div className="right-menu">
              <ul>
                <li><a href={'#' + right_top_menu_href_1}>{right_top_menu_1}</a></li>
                <li><a href={'#' + right_top_menu_href_2}>{right_top_menu_2}</a></li>
              </ul>
            </div>
          </div>

        </header>
        <main>
          <div className="main-block">
            <section>
              <div className="name-area">
                <h3 id="project-name">{lesson_name}</h3>
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
                  <li>{screen_cast_element_1}</li>
                  <li>{screen_cast_element_2}</li>
                  <li>{screen_cast_element_3}</li>
                  <li>{screen_cast_element_4}</li>
                  <li>{screen_cast_element_5}</li>
                  <li>{screen_cast_element_6}</li>
                  <li>{screen_cast_element_7}</li>
                  <li>{screen_cast_element_8}</li>
                </ol>
              </div>
            </section>
          </div>
        </main>
        <footer>
          <div className="bottom-block">
            <a href={footer_links_href_1} target="_blank" rel="noopener noreferrer" >{footer_links_text_1}</a>
            <a href={footer_links_href_2} target="_blank" rel="noopener noreferrer" >{footer_links_text_2}</a>
          </div>
        </footer>
      </div>
  );
};

export default App;
