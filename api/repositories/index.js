const UserRepository = require("./UserRepository");
const TermekRepository = require("./TermekRepository");
const KategoriaRepository = require("./KategoriaRepository")
const KosartetelRepository = require("./KosartetelRepository")
const CartRepository = require("./CartRepository")

module.exports = (db) =>
{
    const userRepository = new UserRepository(db);
    const termekRepository = new TermekRepository(db);
    const kategoriaRepository= new KategoriaRepository(db);
    const kosartetelRepository = new KosartetelRepository(db);
    const cartRepository = new CartRepository(db)

    return { userRepository, termekRepository, kategoriaRepository, kosartetelRepository, cartRepository};
}