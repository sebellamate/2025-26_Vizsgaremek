const authMiddleware = require("../api/middlewares/authMiddleware");
const authUtils = require("../api/utilities/authUtils");
const { UnauthorizedError, ValidationError } = require("../api/errors");

// Mockoljuk az authUtils-t, hogy ne kelljen valódi tokent generálnunk
jest.mock("../api/utilities/authUtils");

describe("AuthMiddleware tests", () => {
    let req, res, next;

    beforeEach(() => {
        // Minden teszt előtt lenullázzuk a req, res és next objektumokat
        req = {
            cookies: {}
        };
        res = {};
        next = jest.fn(); // Egy egyszerű megfigyelő függvény
    });

    describe("userIsLoggedIn", () => {
        test("should call next with UnauthorizedError if no token is present", () => {
            req.cookies = {}; // Nincs token

            authMiddleware.userIsLoggedIn(req, res, next);

            // Ellenőrizzük, hogy a next-et egy UnauthorizedError-ral hívták-e meg
            expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
        });

        test("should set req.user and call next if token is valid", () => {
            const mockUser = { id: 1, name: "Teszt Elek" };
            req.cookies.user_token = "valid-token";
            
            // Azt mondjuk a mocknak, hogy érvényes tokent kap
            authUtils.verifyToken.mockReturnValue(mockUser);

            authMiddleware.userIsLoggedIn(req, res, next);

            expect(req.user).toEqual(mockUser);
            expect(next).toHaveBeenCalledWith(); // Paraméter nélkül hívva = minden OK
        });

        test("should call next with ValidationError if token verification fails", () => {
            req.cookies.user_token = "invalid-token";
            
            // Azt mondjuk a mocknak, hogy dobjon hibát (pl. lejárt token)
            authUtils.verifyToken.mockImplementation(() => {
                throw new Error("Invalid");
            });

            authMiddleware.userIsLoggedIn(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
            expect(next.mock.calls[0][0].message).toBe("Failed to validate token");
        });
    });

    describe("isAdmin", () => {
        test("should call next if user is admin", () => {
            req.user = { isAdmin: true };

            authMiddleware.isAdmin(req, res, next);

            expect(next).toHaveBeenCalledWith();
        });

        test("should call next with UnauthorizedError if user is not admin", () => {
            req.user = { isAdmin: false };

            authMiddleware.isAdmin(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
            expect(next.mock.calls[0][0].message).toContain("privileges");
        });
    });
});