'use strict';

const Planet = require('./model');
const NE = require('node-exceptions');

class HttpException extends NE.LogicalException {}

const repository = {

    getAll() {

        return new Promise(resolve => {
                Planet.scan()
                    .exec()
                    .then(planets => {
                        if (planets) {
                            const planetsToResponse = planets.map(planet => {
                                const {id, name, climate, terrain, films} = planet;
                                return {id, name, climate, terrain, films};
                            });

                            return resolve(planetsToResponse);
                        }
                        return resolve([]);
                    });
        });

    },

    getOne(planetId) {
        return new Promise((resolve, reject) => {
                Planet.get({id: planetId})
                    .then(planet => {
                         if (planet) {
                             const {id, name, climate, terrain, films} = planet;
                             return resolve({id, name, climate, terrain, films});
                          }else{
                             reject(new HttpException("Planet Not Found", 404))
                          }

                    });
        })

    },

    create(planet) {

        const { name, climate, terrain, films } = planet;
        let planetModel = new Planet({ name, climate, terrain, films });

        return new Promise((resolve, reject) =>{
            planetModel.save()
                .then(planetCreated => {
                    return resolve(planetCreated);
                }).catch(err =>{
                    return reject(err);
            });
        })
    },

    delete(planetId) {
        return new Promise((resolve, reject) => {
            Planet.delete({id: planetId} , {update: true}, function(err, data){
                if(err) {
                    return reject(new HttpException("Error deleting planet: " + err.message, 404))
                }
                return resolve({data})
            });
        });
    },
};

module.exports = repository;