const express = require('express');
const app = express.Router();

// создаем модель по схеме, указывая на коллекцию 'shakespeare_plays'
const ShakespeareModel = require('../../MongooseModel').ShakespeareModel;


app.route('/:id/:act')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (play && play.acts[request.params.act]) {
                    response.json({
                        play: play._id,
                        act: {
                            index: request.params.act,
                            title: play.acts[request.params.act].title,
                            scenes: play.acts[request.params.act].scenes.length,
                        },
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    });
app.route('/:id/:act/scenes')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (play && play.acts[request.params.act]) {
                    response.json({
                        play: play._id,
                        act: {
                            key: request.params.act,
                            body: play.acts[request.params.act].title,
                        },
                        scenes: play.acts[request.params.act].scenes.map((scene, index) => {
                            return {
                                key: index,
                                body: scene.title,
                            };
                        }),
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    });

exports.Act = app;
