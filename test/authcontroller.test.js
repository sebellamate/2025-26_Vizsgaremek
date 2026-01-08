// 1. ELŐSZÖR A MOCKOK (Mielőtt bármilyen kontrollert behúznánk!)

// Kiütjük az adatbázist
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// Mockoljuk a Service-t és a segédfüggvényeket
const mockGetUser = jest.fn();
jest.mock("../api/services", () => {
    return (db) => ({
        userService: { getUser: mockGetUser }
    });
});

jest.mock("../api/utilities/authUtils", () => ({
    generateUserToken: jest.fn(),
    setCookie: jest.fn()
}));

jest.mock("bcrypt");
const bcrypt = require("bcrypt");
const authUtils = require("../api/utilities/authUtils");

// 2. MOST JÖHET A KONTROLLER
const authController = require("../api/controllers/authController");

describe("AuthController tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            clearCookie: jest.fn(),
            sendStatus: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("login", () => {
        test("should return 200 and token on successful login", async () => {
            req.body = { userID: "user1", password: "password123" };
            const mockUser = { id: 1, password: "hashed_password" };
            
            mockGetUser.mockResolvedValue(mockUser);
            bcrypt.compareSync.mockReturnValue(true); 
            authUtils.generateUserToken.mockReturnValue("fake-jwt-token");

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith("fake-jwt-token");
            expect(authUtils.setCookie).toHaveBeenCalledWith(res, "user_token", "fake-jwt-token");
        });

        test("should return 401 if password is wrong", async () => {
            req.body = { userID: "user1", password: "wrong_password" };
            mockGetUser.mockResolvedValue({ password: "hashed" });
            bcrypt.compareSync.mockReturnValue(false); 

            await authController.login(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Wrong password" });
        });
    });

    describe("status", () => {
        test("should return 200 and current user data", () => {
            req.user = { id: 1, name: "Teszt Elek" };

            authController.status(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(req.user);
        });
    });

    describe("logout", () => {
        test("should clear cookie and send 200 status code", () => {
            authController.logout(req, res, next);

            expect(res.clearCookie).toHaveBeenCalledWith("user_token");
            expect(res.sendStatus).toHaveBeenCalledWith(200);
        });
    });
});