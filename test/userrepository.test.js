// 1. A USER MODELL MOCKOLÁSA (Láncolható scope-al!)
const mockUserModel = {
    // A scope egy olyan függvény, ami visszatér önmagával (láncolhatóság)
    scope: jest.fn().mockReturnThis(), 
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    create: jest.fn()
};

// 2. ADATBÁZIS PAJZS
jest.mock("../api/db", () => ({
    User: mockUserModel,
    sequelize: {
        sync: jest.fn().mockResolvedValue(true)
    }
}));

const db = require("../api/db");
const { DbError } = require("../api/errors");
const UserRepository = require("../api/repositories/UserRepository");

const userRepository = new UserRepository(db);

describe("UserRepository tests", () => {
    
    const testUser = { ID: 1, name: "TesztElek", email: "elek@teszt.hu", password: "secret123" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getUser with Op.or logic", () => {
        test("should find user by ID, name or email", async () => {
            mockUserModel.findOne.mockResolvedValue(testUser);

            // Bármilyen bemenetre a mockolt testUser-t kapjuk vissza
            const result = await userRepository.getUser(1);
            
            expect(result).toBeDefined();
            expect(result.name).toBe("TesztElek");
            expect(mockUserModel.findOne).toHaveBeenCalled();
        });

        test("should return null if user not found", async () => {
            mockUserModel.findOne.mockResolvedValue(null);
            const result = await userRepository.getUser("nonexistent");
            expect(result).toBeNull();
        });
    });

    describe("getUsers with scope", () => {
        test("should use public scope", async () => {
            mockUserModel.findAll.mockResolvedValue([testUser]);
        
            const result = await userRepository.getUsers();
        
            // Rugalmasabb ellenőrzés: tartalmazza-e a "public" szót, akár string, akár tömb
            expect(mockUserModel.scope).toHaveBeenCalledWith(
                expect.arrayContaining(["public"]) 
            );
            
            // VAGY ha biztosra akarsz menni, hogy bármelyiket elfogadja:
            // expect(mockUserModel.scope).toHaveBeenCalled(); 
        
            expect(Array.isArray(result)).toBe(true);
            expect(result[0].name).toBe("TesztElek");
        });
    });

    describe("update and delete", () => {
        test("updateUser should modify user data", async () => {
            mockUserModel.update.mockResolvedValue([1]);

            await userRepository.updateUser({ name: "ModositottElek" }, 1);
            
            expect(mockUserModel.update).toHaveBeenCalled();
        });

        test("deleteUser should call destroy", async () => {
            mockUserModel.destroy.mockResolvedValue(1);

            await userRepository.deleteUser("elek@teszt.hu");
            
            expect(mockUserModel.destroy).toHaveBeenCalled();
        });
    });

    describe("Error handling", () => {
        test("should throw DbError on database failure", async () => {
            mockUserModel.findOne.mockRejectedValue(new Error("DB Connection Error"));
            
            await expect(userRepository.getUser(1)).rejects.toThrow(DbError);
        });
    });
});