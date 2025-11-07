class TermekService
{
    constructor(db)
    {
        this.termekRepository = require("../repositories")(db).termekRepository;
    }

    async getTermekek()
    {
        return await this.termekRepository.getTermekek();
    }
    async postTermek(termekData)
    {
        return await this.termekRepository.postTermek(termekData);
    }
    async getTermek(termek_id){
        return await this.termekRepository.getTermek(termek_id);
    }
    async deleteTermek(termek_id){
        return await this.termekRepository.deleteTermek(termek_id);
    }
    async editTermek(termek_id, termekData){
        return await this.termekRepository.editTermek(termek_id, termekData);
    }
    async getTermekekBykosar_id(kosar_id){
        return await this.termekRepository.getTermekekBykosar_id(kosar_id)
    }
    
    

}

module.exports = TermekService;