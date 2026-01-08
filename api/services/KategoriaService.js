const { BadRequestError, NotFoundError } = require("../errors");

class KategoriaService{
    constructor(db){
        this.kategoriaRepository = require("../repositories")(db).kategoriaRepository;
    }
    async getKategoriak() {
        const kategoriak = await this.kategoriaRepository.getKategoriak();
        // Ha a kategoriak falsy (null/undefined), adjunk vissza üres tömböt
        return kategoriak || []; 
    }
}
module.exports = KategoriaService;