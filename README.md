# Лабораторная работа NodeJS + React
## Введение
React – js-фреймворк/библиотека (комьюнити так и не определилось что это), применяемая для построения интерактивных пользовательских интерфейсов. Изначально react был создан в facebook для эффективного управления состоянием веб-приложения. С ростом сложности и «навороченности» фейсбука стало очень трудно контролировать происходящее на странице. На сервер и обратно постоянно отправлялось много запросов, возникали всевозможные события и нужен был инструмент для контроля всего этого. React решил эту проблему, однако позже была разработана концепция [flux](https://ru.wikipedia.org/wiki/Flux-архитектура) (note: не путать с одноимённой библиотекой, которая является практической реализацией данной концепции) и модифицированная реализация – redux. Они предназначены для хранение состояния приложения.

## Немного теории
React доступен на нескольких платформах:
* WEB
* Android
* iOS
* VR

Для визуальной отрисовки на каждой из них используется отдельная библиотека:
* [react-dom](https://reactjs.org/docs/react-dom.html) – для веб-приложений
* [React Native](https://facebook.github.io/react-native/) – для android и ios
* [React VR](https://facebook.github.io/react-vr/) – для VR

Такой подход позволяет не переписывать заново всю логику клиентской части приложения, при разработке версий приложения для разных платформ, а изменять только лишь код, отвечающий исключительно за визуальную часть приложения. Далее мы будем рассматривать react и react-dom как единое целое, так как мы разрабатываем веб-приложение.

React позволяет создавать не только веб-приложения, целиком построенные на нём, но и отдельные модули (например, поиск в Яндекс Почте), что выгодно отличает его, например, от Angular. Мы же будем полностью создавать наше приложение на react.

React-приложение состоит из компонентов. Каждый react-компонент – это элемент страницы. На сколько мелким будет такое разбиение решает сам программист, но обычно чем мельче – тем лучше (в разумных приделах). В качестве примера рассмотрим обычное меню в шакпке сайта. Предположим, что оно содержит несколько пунктов - ссылок и форму поиска по сайту. В таком случае данный элмент страницы будет состоять из множества компонентов, при этом сам будет являться «контейнером» (о разделении на компоненты и контейнеры мы поговорим чуть позже). Каждый пункт меню разумно было бы сделать отдельным компонентом, так как он имеет своё состояние - пункт меню выделен «активным» и не является ссылкой, если он соответствует текущей странице. Однако возможен и другой вариант: не выделять пункт меню в отдельный компонент, а отрисовывать их все прямо в контейнере, при этом информацию о том, какой пункт должен быть сейчас активным, хранить в состоянии контейнера. Форма поиска в меню очевидно будет отдельным компонентом. И если в ней нет всяких наворотов, вроде автокомплита и т.п. – это просто инпут + кнопка, то более мелких подкомпонентов скорее всего не будет, т.к. ни инпут, ни кнопка не будут иметь своего состояния.
 
## Реализация
Для разработки на react нам понадобится npm (пакетный менеджер nodejs), который также используется в лабораторной работе по NodeJS. Скачать установщик NodeJS, который содержит в себе npm, вы можете с [официального сайта](https://nodejs.org/en/).  Если он у вас уже установлен, можете выполнять следующие шаги:
* Наберите в терминале :
npm install -g create-react-app
Данная команда установит глобально специальный npm-пакет, который позволяет легко и просто создать новое react-приложение, избежав ручной настройки файла package.json, настройки сборщика и создание файлов статики (папка public).
* После того как пакет установится, в нужной папке запустите команду:
create-react-app my-app
Будет создан проект с названием «my-app». После этого перейдите в папку проекта:
cd my-app
Это корневая папка проекта. Она содержит примерно следующее (может незначительно изменяться с обновлениями):
```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```
Подробнее об этом вы можете прочитать в [официальной документации проекта create-react-app](https://github.com/facebook/create-react-app). *Далее повествование будет вестись в контексте того, что мы находимся в папке src (если явно не указано другое).*
* На данном этапе стоит сказать пару слов о структуре проекта. Так как react позиционирует себя как библиотека, он не навязывает нам архитектуру проекта, мы сами вольны создавать её такой, как нам удобно. Однако существуют некоторые общепринятые правила. «Умные» компоненты – контейнеры – о которых мы уже немного говорили раньше, располагаются в папке containers. «Глупые» компоненты – в папке components. Как же разделять компоненты на умные и глупые? Глупыми считаются компоненты, отвечающие только за вывод информации (рендер html). Они обычно не реализуют много логики и чаще всего содержат в себе только лишь метод render. Умные компоненты наоборот содержат всю логику приложения. Какой-то конкретной границы нет, по которой можно было бы очевидно определить компонент как контейнер, а по тому часто встречаются глупые компоненты «умнее» контейнеров, лежащих в соседней папке.
* Для начала работы нам потребуется ещё библиотека – superagent. Она отвечает за обмен данными с сервером. И библиотека react-bootstrap, предоставляющая готовые bootstrap3-компоненты.
* Итак, для того, чтобы запустить проект и начать работу нужно корневой папке проекта (my-app) выполнить команду npm start. После того, как проект запустится, в браузере откроется страница с нашим проектом. Страница будет автоматически перезагружаться, когда вы будете вносит изменения в код.

## Разбор примера приложения
В репозитории на github вы можете найти полный код приложения. Здесь мы на примере одного компонента ознакомимся с react-компонентом и с работой с сервером с помощью superagent.
Проект предоставляет интерфейс для работы с базой данных с 36 пьесами Шекспира из лабораторной работы MongoDB.
Для примера возьмём компонент SingleAction.
```javascript
import * as React from 'react';
import API from '../../API/index';
import { Button, Glyphicon, ListGroup } from 'react-bootstrap';
import { Say } from '../Says';
import { NewSay } from './NewSay';

export class SingleAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playId: '',
      act: {
        key: -1,
        body: '',
      },
      scene: {
        key: -1,
        body: '',
      },
      action: {
        key: -1,
        body: {
          title: '',
          character: '',
        },
      },
      says: [],
    };
  }

  componentDidMount() {
    if (
      (this.props.actIndex !== -1)
      && (this.props.sceneIndex !== -1)
      && (this.props.actionIndex !== -1)
    ) {
      // console.log('will send request getScenes');
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.playId !== this.props.playId)
      || (prevProps.actIndex !== this.props.actIndex)
      || (prevProps.sceneIndex !== this.props.sceneIndex)
      || (prevProps.actionIndex !== this.props.actionIndex)
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    API.getSingleAction(this.props.playId, this.props.actIndex, this.props.sceneIndex, this.props.actionIndex)
      .then(response => {
        this.setState({
          playId: response.play,
          act: response.act,
          scene: response.scene,
          action: response.action,
          says: response.says,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayAdd = (value) => {
    API.addSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      value
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayEdit = (sayIndex) => (newValue) => {
    API.editSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      sayIndex,
      newValue
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayDel = (sayIndex) => () => {
    API.delSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      sayIndex
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  render() {
    return (
      <div>
        <h2 className={'action-title'}>
          {this.state.action.body.title}
          <Button onClick={this.fetchData}>
            <Glyphicon glyph={'repeat'}/>
          </Button>
        </h2>
        <h3>Character: {this.state.action.body.character}</h3>
        <ListGroup>
          {
            this.state.says.map((say, index) => {
              return <Say
                key={index}
                say={say.body}
                sayEdit={this.sayEdit(index)}
                sayDel={this.sayDel(index)}
              />
            })
          }
        </ListGroup>
        <NewSay sayAdd={this.sayAdd}/>
      </div>
    );
  }
}
```
* Начнём с **конструктора**. В нём мы видим, что в своём состоянии компонент хранит id пьесы, ключ (индекс) и название для акта, сцены и действия; для действия дополнительно хранится персонаж. Также в состоянии хранится массив реплик.
* **componentDidMount** и **componentDidUpdate** вызываются сразу после первого рендера и после каждого последующего соответственно.
* **fetchData** отвечает за получение данных для отображаемого сейчас действия и задания ими состояния компонента. В ней вызывается метод некоего класса *API*. API – это созданный нами статический класс, являющийся обёрткой (прежде всего смысловой) над *superagent*.
* **sayAdd**, **sayEdit** и **sayDel** отвечают соответственно за добавление, изменение и удаление реплики (предложения) в действии.
* О методе **render** стоит рассказать немного подробнее. В нём мы видим *JSX*-разметку. Это очень удобная штука, предоставляемая react. JSX – это так называемый html-in-js. Здесь мы можем выводить наши компоненты в виде обычных html-тегов. В виде атрибутов компонентам передаются props'ы, их использование мы видели в рассмотренных чуть ранее методах. То, что мы пишем между открывающим и закрывающим тегом – тоже props, имеющий зарезервированное имя children. Соответственно, в коде к такому props'у мы можем обратится так: *this.props.children*. Стоит отметить, что даже обычные на вид теги вроде div, h2 и пр. здесь являются не html-тегами, а react-компонентами, реализованными библиотекой react-dom. Чтобы react мог их как-то отличать от написанных нами, существует правило – компоненты мы называем только с большой буквы. И здесь же мы видим bootstrap'овские компоненты, такие как Button, Glyphicon и ListGroup. Так как bootstrap не входит в реакт, bootstrap'овские компоненты также именуются с большой буквы.
И, наконец, отметим ещё одну интересную деталь. Пожалуй, даже самую интересную. Это js внутри html (вернее внутри JSX). В тех местах, где мы в качестве значения props хотим передать переменную, или то, что вернёт функция, или что-то подобное, мы можем написать {} и между ними js-код, который вернёт какое-то значение. Но заметим, что это должно быть одно выражение. То есть, там нельзя написать, например, конструкцию if…else…
### И в заключении пара слов о superagent.
Обратимся к нашему статическому классу API. На самом деле, работать с superagent очень просто. Мы рассмотрим работу с ним на примере post-запроса, более подробную информацию о нём можно найти в [оф. документации](http://visionmedia.github.io/superagent/). Итак, post-запрос. Для его отправки нужно вызвать соответствующий метод .post(), в качестве аргумента передать url (за формирование url в нашем случае отвечает простейшая функция formatUrl), после чего в виде цепочки вызывать любой из методов, описанных для соответствующего запроса в документации. Например, для отправки тела post-запроса вызовем метод .send() в который передадим некоторые данные. Эти данные будут отправлены на сервер в теле запроса. Для задания заголовков может быть использован метод .set() в который могут быть переданы 2 строки – название http-заголовка и его значение, либо объект, в котором каждый ключ – название http-заголовка, а значение – значение http-заголовка. Методов довольно много, они полностью охватывают всё взаимодействие «клиент-сервер» для веб-приложения, со всеми можно ознакомится в [документации](http://visionmedia.github.io/superagent/).
Полный пример реализации ассинхронных запросов через библиотеку SuperAgent вы можете посмотреть в этом репозитории в файле [nodejs_react/front/src/API/index.js](blob/master/front/src/API/index.js).

## Порядок выполнения
1. [Скачать](https://nodejs.org/en/) и установить NodeJS
2. Установить create-react-app выполнив в термниале команду `npm install -g create-react-app`
3. Создать приложение в нужной папке выполнив команду `create-react-app my-app`, где `my-app` название вашего приложения
4. Перейти в папку приложения `cd my-app`
Со структурой приложения, расположенного в данной папке, а также с рекомендациями по формировании структуры в дальнейшем развитии приложения, мы уже ознакомились выше.
5. Убедимся в работоспособности созданного приложения, выполнив команду `npm start`. Данная команда запустит приложение, после чего оно откроется в браузере. Остановить приложение можно нажав *Ctrl + c*, находясь в терминале.
6. Откроем для редактирования файл `src/App.js`, который на данный момент является единственным компонентом приложения.
7. Напишем в нём простейший компонент, демонстрирующий основные возможности React:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Enthused extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.addText('!');
    }, 15);
  }
  
  componentWillUnmount(prevProps, prevState) {
    clearInterval(this.interval);
  }

  render() {
    return (
      <button onClick={this.props.toggle}>
        Stop!
      </button>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enthused: false,
      text: ''
    };
  }

  toggleEnthusiasm = () => {
    this.setState({
      enthused: !this.state.enthused
    });
  }

  setText = (text) => {
    this.setState({ text: text });
  }

  addText = (newText) => {
    let text = this.state.text + newText;
    this.setState({ text: text });
  }

  handleChange = (event) => {
    this.setText(event.target.value);
  }

  render() {
    let button;
    if (this.state.enthused) {
      button = (
        <Enthused toggle={this.toggleEnthusiasm} addText={this.addText} />
      );
    } else {
      button = (
        <button onClick={this.toggleEnthusiasm}>
          Add Enthusiasm!
        </button>
      );
    }

    return (
      <div>
        <h1>Auto-Enthusiasm</h1>
        <textarea rows="7" cols="40" value={this.state.text} 
          onChange={this.handleChange}>
        </textarea>
        {button}
        <h2>{this.state.text}</h2>
      </div>
    );
  }
}
```
Мы добавили ещё один компонент. С точки зрения грамотности архитектуры, правильнее было бы его вынести в отдельный файл, но здесь для простоты примеры мы оставим его в этом же файле.
В данном примере были использованы рассмотренные ранее lifecycle-методы, методы render и constructor. Как вы могли заметить, в качестве props'ов мы можем передавать и функции, вызвая их `this.props.addText('!');`.

## Ссылки на инструменты и документацию
* NodeJS - https://nodejs.org/en/
* React - https://reactjs.org/
* React DOM - https://reactjs.org/docs/react-dom.html
* React Native - https://facebook.github.io/react-native/
* React VR - https://facebook.github.io/react-native/
* SuperAgent - http://visionmedia.github.io/superagent/
* create-react-app - https://github.com/facebook/create-react-app
* Подробнее о JSX - https://reactjs.org/docs/introducing-jsx.html
* Подробнее о состоянии и lifecycle-методах (в них входят упомянутые componentDidMount и componentDidUpdate) - https://reactjs.org/docs/state-and-lifecycle.html
* Flux концепция - https://ru.wikipedia.org/wiki/Flux-архитектура
* Flux библиотека - https://github.com/facebook/flux
* Redux библиотека - https://github.com/reactjs/redux
