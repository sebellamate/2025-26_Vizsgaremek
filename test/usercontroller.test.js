// 1. ELŐSZÖR MOCKOLUNK MINDENT (még mielőtt bármit require-elnénk!)

// Kiütjük az adatbázist, hogy ne keressen dialect-et
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// Mockoljuk a Service-t
const mockServiceFunctions = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn()
};

jest.mock("../api/services", () => {
    return (db) => ({
        userService: mockServiceFunctions
    });
});

// 2. MOST JÖHET A KONTROLLER BEHÚZÁSA
const userController = require("../api/controllers/userController");

describe("UserController tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, userID: null };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("getUsers", () => {
        test("should return 200 and all users", async () => {
            const mockUsers = [{ name: "Admin" }, { name: "User1" }];
            mockServiceFunctions.getUsers.mockResolvedValue(mockUsers);

            await userController.getUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe("createUser", () => {
        test("should map 'username' to 'name' and return 201", async () => {
            req.body = { username: "teszt_elek", email: "e@mail.hu", password: "123" };
            const expectedServiceCall = { name: "teszt_elek", email: "e@mail.hu", password: "123" };
            
            mockServiceFunctions.createUser.mockResolvedValue({ id: 1, ...expectedServiceCall });

            await userController.createUser(req, res, next);

            expect(mockServiceFunctions.createUser).toHaveBeenCalledWith(expectedServiceCall);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test("should forward error if createUser fails", async () => {
            mockServiceFunctions.createUser.mockRejectedValue(new Error("Email already exists"));

            await userController.createUser(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe("getUser", () => {
        test("should use req.userID to fetch a single user", async () => {
            req.userID = "USR-123";
            mockServiceFunctions.getUser.mockResolvedValue({ id: "USR-123", name: "Elek" });

            await userController.getUser(req, res, next);

            expect(mockServiceFunctions.getUser).toHaveBeenCalledWith("USR-123");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});