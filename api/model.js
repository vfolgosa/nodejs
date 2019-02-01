'use strict';

const dynamoose = require('dynamoose');
const uuidv4 = require('uuid/v4');

const dotenv = require('dotenv');
dotenv.config();

dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_AK,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.REGION
})


const PlanetSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4
    },
    name: String,
    climate: String,
    terrain: String,
    films: {
        type: [String]
    }
}, { timestamps: true });


module.exports = dynamoose.model('Planet', PlanetSchema);