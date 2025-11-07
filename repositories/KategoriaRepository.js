class KategoriaRepository
{
    constructor(db)
    {
        this.Kategoria = db.Kategoria;

        this.sequelize = db.sequelize;
    }

    async getKategoriak()
    {
        return await this.Kategoria.findAll();
    }
}
module.exports = KategoriaRepository;