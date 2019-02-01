'use-strict'

const repository = require('./repository');
const swapApiService = require('./swapApiService')
const { responseHelper } = require('./helpers');

const planetsController = {

    async getAll(req, res) {
        try {
            const planets  = await repository.getAll();
            responseHelper.success(req, res, planets);
        }catch(err){
            responseHelper.error(req, res, err);
        }
    },

    async getOne(req, res) {
        try{
            const planet = await repository.getOne(req.params.planetId)
            responseHelper.success(req, res, planet);
        }catch(err){
            responseHelper.error(req, res, err);
        }
    },

    async create(req, res) {
        const planet = {
            name: req.body.name,
            climate: req.body.climate,
            terrain: req.body.terrain,
            films: []
        };

        try{
            planet.films = await swapApiService.getFilms(planet.name)
            const planetCreated = await repository.create(planet)
            responseHelper.success(req, res, planetCreated);
        }catch(err){
            responseHelper.error(req, res, err);
        }
    },

    async delete(req, res) {
        const planetId = req.params.planetId
        try{
            await repository.delete(planetId)
            responseHelper.success(req, res, "Planet Removed!") ;
        }catch(err){
            console.log(err)
            responseHelper.error(req, res, err);
        }
    },

};

module.exports = planetsController;

