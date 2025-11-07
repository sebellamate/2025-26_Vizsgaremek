class TermekRepository
{
    constructor(db)
    {
        this.Termek = db.Termek;
        this.sequelize = db.sequelize;
    }

    async getTermekek()
    {
        return await this.Termek.findAll();
    }
    async getTermek(termek_id){
        return await this.Termek.findOne({
            where: {termek_id}
        })
    }
    async deleteTermek(termek_id){
        return await this.Termek.destroy({
            where: {termek_id}
        })
    }
    async editTermek(termek_id, termekData){
        await this.Termek.update(termekData, { where: { termek_id } });
    }
    async postTermek(termekData){
        try
        {
            return await this.Termek.create(termekData);
        }
        catch(error)
        {
            throw new DbError("Failed to create user object", 
            {
               details: error.message,
               data: termekData, 
            });
        }
    }
    async getTermekekBykosar_id(kosar_id) {
    const KosarTetel = this.sequelize.models.KosarTetel;

    const tetelek = await KosarTetel.findAll({
        where: { kosar_id },
        include: [
            {
                model: this.Termek,
                as: "Termek",
            },
        ],
    });

    return tetelek.map(t => ({
        ...t.Termek?.toJSON(),
        mennyiseg: t.mennyiseg,
    }));
}

}
module.exports = TermekRepository;