class KosartetelRepository
{
    constructor(db)
    {
        this.Kosartetel = db.KosarTetel;

        this.sequelize = db.sequelize;
    }
    async postTetel(tetelData){
        return await this.Kosartetel.create(tetelData)
    }
    async getTetel(id){
        return await this.Kosartetel.findOne({
            where: {id}
        })
    }
    async getTetelek(kosar_id){
        return await this.Kosartetel.findAll({
            where: {kosar_id}
        })
    }

}
module.exports = KosartetelRepository;