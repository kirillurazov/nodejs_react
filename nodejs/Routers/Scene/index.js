const express = require('express');
const app = express.Router();

// создаем модель по схеме, указывая на коллекцию 'shakespeare_plays'
const ShakespeareModel = require('../../MongooseModel').ShakespeareModel;


app.route('/:id/:act/:scene')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (play && play.acts[request.params.act] && play.acts[request.params.act].scenes[request.params.scene]) {
                    response.json({
                        play: play._id,
                        act: play.acts[request.params.act].title,
                        scene: {
                            title: play.acts[request.params.act].scenes[request.params.scene].title,
                            action: play.acts[request.params.act].scenes[request.params.scene].action.length,
                        },
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    });
app.route('/:id/:act/:scene/actions')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (
                    play
                    && play.acts[request.params.act]
                    && play.acts[request.params.act].scenes[request.params.scene]
                ) {
                    response.json({
                        play: play._id,
                        act: {
                            key: request.params.act,
                            body: play.acts[request.params.act].title,
                        },
                        scene: {
                            key: request.params.scene,
                            body: play.acts[request.params.act].scenes[request.params.scene].title,
                        },
                        actions: play.acts[request.params.act].scenes[request.params.scene].action.map((action, index) => {
                            return {
                                key: index,
                                body: `Action ${index + 1}`,
                            };
                        }),
                        /*actions: play.acts[request.params.act].scenes[request.params.scene].action.map((action) => {
                            return {
                                character: action.character,
                                says: action.says,
                            };
                        }),*/
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    });

exports.Scene = app;
