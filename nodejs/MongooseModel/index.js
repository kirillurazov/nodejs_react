const mongoose = require('mongoose');
const dbSchema = mongoose.Schema;

// объявляем схему хранящихся в документе mongoDB
const ShakespeareSchema = new dbSchema({
    _id: String,
    acts: [{
        title: String,
        scenes: [{
            title: String,
            action: [{
                character: String,
                says: [String]
            }]
        }]
    }]
});
// создаем модель по схеме, указывая на коллекцию 'shakespeare_plays'
exports.ShakespeareModel = mongoose.model('shakespeare_plays', ShakespeareSchema);
