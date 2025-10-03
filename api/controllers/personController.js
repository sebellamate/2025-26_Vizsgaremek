const db = require("../db");

const { personService } = require("../services")(db); 

exports.getPeople = async (req, res, next) =>
{
    const people = await personService.getPeople();

    res.status(200).json(people);
}