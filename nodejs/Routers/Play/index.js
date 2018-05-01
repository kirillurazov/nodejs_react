const express = require('express');
const app = express.Router();

// создаем модель по схеме, указывая на коллекцию 'shakespeare_plays'
const ShakespeareModel = require('../../MongooseModel').ShakespeareModel;

app.route('/')
    .get((request, response) => {
        ShakespeareModel.find({}, null, { sort: { _id: 1 } }, (err, plays) => {
            if (err) return console.error(err);
            response.json(plays.map((play) => {
                return play._id;
            }));
        });
    });
app.route('/all')
    .get((request, response) => {
        ShakespeareModel.find({}, null, { sort: { _id: 1 } }, (err, plays) => {
            if (err) return console.error(err);
            response.json(plays);
        });
    });
app.route('/:id')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (play) {
                    response.json({
                        _id: play._id,
                        acts: play.acts.length,
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        );
    });
app.route('/:id/acts')
    .get((request, response) => {
        ShakespeareModel.findOne(
            { _id: request.params.id },
            (err, play) => {
                if (err) return console.error(err);
                if (play) {
                    response.json({
                        play: play._id,
                        acts: play.acts.map((item, index) => {
                            return {
                                key: index,
                                body: item.title,
                            };
                        }),
                    });
                } else {
                    response.sendStatus(404);
                }
            }
        )
            .sort({});
    });

exports.Play = app;
