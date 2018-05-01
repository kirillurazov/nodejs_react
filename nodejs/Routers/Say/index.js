const express = require('express');
const app = express.Router();

// создаем модель по схеме, указывая на коллекцию 'shakespeare_plays'
const ShakespeareModel = require('../../MongooseModel').ShakespeareModel;

app.route('/:playId/:actIndex/:sceneIndex/:actionIndex')
/*.all((request, response, next) => {
    console.log(request.method);
    next();
})*/
    .get((request, response) => {
        const { playId, actIndex, sceneIndex, actionIndex } = request.params;
        ShakespeareModel.findOne(
            { _id: playId },
            (err, play) => {
                if (err) return console.error(err);
                if (
                    play
                    && play.acts
                    && play.acts[actIndex]
                    && play.acts[actIndex].scenes
                    && play.acts[actIndex].scenes[sceneIndex]
                    && play.acts[actIndex].scenes[sceneIndex].action
                    && play.acts[actIndex].scenes[sceneIndex].action[actionIndex]
                ) {
                    response.json({
                        play: play._id,
                        act: {
                            key: actIndex,
                            body: play.acts[actIndex].title,
                        },
                        scene: {
                            key: sceneIndex,
                            body: play.acts[actIndex].scenes[sceneIndex].title,
                        },
                        action: {
                            key: actionIndex,
                            body: {
                                title: `Action ${Number(actionIndex) + 1}`,
                                character: play.acts[actIndex].scenes[sceneIndex].action[actionIndex].character,
                            }
                        },
                        says: play.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                            return {
                                key: index,
                                body: say,
                            };
                        }),
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    })
    .post((request, response) => {
        const { playId, actIndex, sceneIndex, actionIndex } = request.params;
        console.log(request.body.say);
        ShakespeareModel.findOneAndUpdate(
            { _id: playId },
            {
                $push: { [`acts.${actIndex}.scenes.${sceneIndex}.action.${actionIndex}.says`]: request.body.say, },
            },
            {
                new: true,
            },
            (error, updated) => {
                if (error) return console.error(error);
                if (updated) {
                    console.log(updated.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                    response.json(updated.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                } else {
                    console.log('Not error, not update');
                    response.sendStatus(404);
                }
            }
        );
    });
app.route('/:playId/:actIndex/:sceneIndex/:actionIndex/:sayIndex')
    .put((request, response) => {
        const { playId, actIndex, sceneIndex, actionIndex, sayIndex } = request.params, newSay = request.body.say;
        console.log('newSay: ', newSay);
        console.log('request.body: ', request.body);
        console.log('request.body.say: ', request.body.say);
        ShakespeareModel.findOneAndUpdate(
            { _id: playId },
            {
                $set: { [`acts.${actIndex}.scenes.${sceneIndex}.action.${actionIndex}.says.${sayIndex}`]: newSay, },
            },
            {
                new: true,
            },
            (error, updated) => {
                if (error) return console.error(error);
                if (updated) {
                    console.log(updated.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                    response.json(updated.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                } else {
                    console.log('Not error, not update');
                    response.sendStatus(404);
                }
            }
        );
    })
    .delete((request, response) => {
        const { playId, actIndex, sceneIndex, actionIndex, sayIndex } = request.params;
        ShakespeareModel.findOne(
            { _id: playId },
            (error, result) => {
                if (error) return console.error(error);
                if (result) {
                    result.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.splice(sayIndex, 1);
                    result.save()
                        .then(afterSave => {
                            console.log(afterSave.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                                return {
                                    key: index,
                                    body: say,
                                };
                            }));
                            response.json(afterSave.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                                return {
                                    key: index,
                                    body: say,
                                };
                            }));
                        });
                } else {
                    console.log('Not error, not update');
                    response.sendStatus(404);
                }
            }
        );
        /*ShakespeareModel.findOneAndDelete(
            { _id: request.params.playId },
            (error, result) => {
                if (error) return console.error(error);
                if (result) {
                    console.log(result.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                    response.json(result.acts[actIndex].scenes[sceneIndex].action[actionIndex].says.map((say, index) => {
                        return {
                            key: index,
                            body: say,
                        };
                    }));
                } else {
                    console.log('Not error, not update');
                    response.sendStatus(404);
                }
            }
        );*/
    });
exports.Say = app;
