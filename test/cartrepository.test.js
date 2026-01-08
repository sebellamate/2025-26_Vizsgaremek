// 1. ADATBÁZIS MOCKOLÁSA
const mockKosarModel = {
    findOne: jest.fn(),
    create: jest.fn()
};

jest.mock("../api/db", () => ({
    Kosar: mockKosarModel,
    sequelize: {
        sync: jest.fn().mockResolvedValue(true)
    }
}));

const db = require("../api/db");
const { DbError } = require("../api/errors");
const CartRepository = require("../api/repositories/CartRepository");

const cartRepository = new CartRepository(db);

describe("CartRepository tests", () => {
    
    const testCart = { id: 1, user_id: 42, items: "Laptop, Mouse" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getCart method tests", () => {
        
        test("should return the correct cart for a given user_id", async () => {
            // Beállítjuk, hogy a modell mit adjon vissza
            mockKosarModel.findOne.mockResolvedValue(testCart);

            const result = await cartRepository.getCart(42);

            expect(result).toBeDefined();
            expect(result.user_id).toEqual(42);
            expect(result).toMatchObject(testCart);
            // Ellenőrizzük, hogy a Sequelize-t a jó paraméterrel hívta-e
            expect(mockKosarModel.findOne).toHaveBeenCalledWith(expect.objectContaining({
                where: { user_id: 42 }
            }));
        });

        test("should return null if the user has no cart", async () => {
            mockKosarModel.findOne.mockResolvedValue(null);

            const result = await cartRepository.getCart(999);

            expect(result).toBeNull();
        });

        test("should throw DbError if the database operation fails", async () => {
            // Szimulálunk egy adatbázis hibát
            mockKosarModel.findOne.mockRejectedValue(new Error("Database connection lost"));

            const promise = cartRepository.getCart(42);

            await expect(promise).rejects.toThrow(DbError);
            await expect(promise).rejects.toThrow("Failed fetching the cart");
        });
    });
});