// 1. ADATBÁZIS-PAJZS (A dialect hiba ellen)
jest.mock("../api/db", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. REPOSITORY MOCKOLÁSA
const mockUserRepo = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn()
};

jest.mock("../api/repositories", () => {
    return (db) => ({
        userRepository: mockUserRepo
    });
});

// 3. SERVICE ÉS HIBÁK BEHÚZÁSA
const UserService = require("../api/services/UserService");
const { BadRequestError, NotFoundError } = require("../api/errors");

describe("UserService tests", () => {
    let userService;

    beforeEach(() => {
        jest.clearAllMocks();
        // A constructor vár egy db-t, adunk neki egy üreset
        userService = new UserService({});
    });

    describe("getUsers", () => {
        test("should return all users", async () => {
            mockUserRepo.getUsers.mockResolvedValue([{ name: "Teszt Elek" }]);
            
            const result = await userService.getUsers();
            
            expect(result).toHaveLength(1);
            expect(mockUserRepo.getUsers).toHaveBeenCalled();
        });
    });

    describe("getUser", () => {
        test("should throw BadRequestError if userID is missing", async () => {
            await expect(userService.getUser(null))
                .rejects.toThrow(BadRequestError);
        });

        test("should throw NotFoundError if user is not found", async () => {
            mockUserRepo.getUser.mockResolvedValue(null);
            
            await expect(userService.getUser(1))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe("createUser", () => {
        test("should throw error if name is missing", async () => {
            const invalidData = { email: "a@b.hu", password: "123" };
            await expect(userService.createUser(invalidData))
                .rejects.toThrow("Missing username from payload");
        });

        test("should throw error if email is missing", async () => {
            const invalidData = { name: "Elek", password: "123" };
            await expect(userService.createUser(invalidData))
                .rejects.toThrow("Missing email from payload");
        });

        test("should throw error if password is missing", async () => {
            const invalidData = { name: "Elek", email: "a@b.hu" };
            await expect(userService.createUser(invalidData))
                .rejects.toThrow("Missing password from payload");
        });

        test("should successfully create user if all data is provided", async () => {
            const validData = { name: "Elek", email: "a@b.hu", password: "123" };
            
            // Itt adjuk vissza az objektumot ID-val együtt
            mockUserRepo.createUser.mockResolvedValue({ id: 1, ...validData });

            const result = await userService.createUser(validData);

            expect(result).toBeDefined();
            expect(result.id).toBe(1);
            expect(mockUserRepo.createUser).toHaveBeenCalledWith(validData);
        });
    });
});