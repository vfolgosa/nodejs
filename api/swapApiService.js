const Request = require("request");

const swapApiService = {

    getFilms(planetName){

        return new Promise((resolve, reject) =>{
            Request.get("https://swapi.co/api/planets/?search=" + planetName, (error, response, body) => {
                if(error) {
                    return reject(error);
                }

                const result = JSON.parse(body)

                if (result.results && result.results.length > 0 ){
                    resolve(result.results[0].films)
                }else{
                    resolve([])
                }

            });
        });

    }

}

module.exports = swapApiService;