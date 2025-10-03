class PersonRepository
{
    // DI = Dependency Injection 

    constructor(dbParam) { this.db = dbParam; }
    async getPeople() { return await this.db.findAll(); }
}

module.exports = PersonRepository;