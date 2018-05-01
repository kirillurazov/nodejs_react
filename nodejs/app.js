const config = require('./config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// используем body-parser для обработки запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


console.log('will connect to db');
const mongoose = require('mongoose');
mongoose.connect(`${config.DB_PROTOCOL}://${config.DB_SERVER}/${config.DB_NAME}`)
    .then(() => {
        console.log('then');
        // routers
        const { HeadersRouter, PlayRouter, ActRouter, SceneRouter, SayRouter } = require('./Routers');
        app.use(HeadersRouter);
        app.use(PlayRouter);
        app.use(ActRouter);
        app.use(SceneRouter);
        app.use(SayRouter);

        //Вешаем сервер на порт, который нам понравится
        app.listen(config.PORT, () => {
            console.log(`Express server listening on port ${config.PORT}`);
        });
    })
    .catch(err => console.log('Mongoose Connect Error: ', err));
console.log('did connected to db');
