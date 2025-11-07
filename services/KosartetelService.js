class KosartetelService{
    constructor(db){
        this.kosartetelRepository = require("../repositories")(db).kosartetelRepository;
    }
    async postTetel(tetelData){
        return await this.kosartetelRepository.postTetel(tetelData);
    }
    async getTetel(id){
        return await this.kosartetelRepository.getTetel(id);
    }
    async getTetelek(id){
        return await this.kosartetelRepository.getTetelek(id);
    }
}
module.exports = KosartetelService;