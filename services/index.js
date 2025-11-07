const UserService = require("./UserService")
const TermekService = require("./TermekService")
const KategoriaService = require("./KategoriaService")
const KosartetelService = require("./KosartetelService")
const CartService = require("./CartService")

module.exports = (db) =>
{
    const userService = new UserService(db);
    const termekService = new TermekService(db);
    const kategoriaService = new KategoriaService(db);
    const kosartetelService = new KosartetelService(db);
    const cartService = new CartService(db)

    return { userService, termekService, kategoriaService, kosartetelService, cartService };
}