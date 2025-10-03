const PersonService = require("./PersonService");

module.exports = (dbParam) =>
{
    const personService = new PersonService(dbParam);

    return { personService };
}
