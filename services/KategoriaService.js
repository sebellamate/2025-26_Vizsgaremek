class KategoriaService{
    constructor(db){
        this.kategoriaRepository = require("../repositories")(db).kategoriaRepository;
    }
    async getKategoriak(){
        return await this.kategoriaRepository.getKategoriak();
    }
}
module.exports = KategoriaService;