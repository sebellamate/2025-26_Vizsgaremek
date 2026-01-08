// 1. ADATBÁZIS MODELL MOCKOLÁSA
const mockKategoriaModel = {
    findAll: jest.fn(),
    bulkCreate: jest.fn()
};

jest.mock("../api/db", () => ({
    Kategoria: mockKategoriaModel,
    sequelize: {
        sync: jest.fn().mockResolvedValue(true)
    }
}));

const db = require("../api/db");
const { DbError } = require("../api/errors");
const KategoriaRepository = require("../api/repositories/KategoriaRepository");

const kategoriaRepository = new KategoriaRepository(db);

describe("KategoriaRepository tests", () => {
    
    const mockKategoriakData = [
        { id: 1, nev: "Elektronika" },
        { id: 2, nev: "Ruházat" },
        { id: 3, nev: "Könyvek" }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getKategoriak method tests", () => {
        
        test("should return all categories from the database", async () => {
            // Beállítjuk a mock visszatérési értékét
            mockKategoriaModel.findAll.mockResolvedValue(mockKategoriakData);

            const results = await kategoriaRepository.getKategoriak();

            expect(results).toHaveLength(3);
            expect(results).toMatchObject(mockKategoriakData);
            expect(mockKategoriaModel.findAll).toHaveBeenCalled();
        });

        test("the first category name should be Elektronika", async () => {
            mockKategoriaModel.findAll.mockResolvedValue(mockKategoriakData);

            const results = await kategoriaRepository.getKategoriak();
            
            expect(results[0].nev).toBe("Elektronika");
        });

        test("should throw DbError if the database is disconnected", async () => {
            // Szimulálunk egy adatbázis hibát (pl. elszállt a kapcsolat)
            mockKategoriaModel.findAll.mockRejectedValue(new Error("Connection lost"));

            const promise = kategoriaRepository.getKategoriak();

            await expect(promise).rejects.toThrow(DbError);
            await expect(promise).rejects.toThrow("Failed fetching the categories");
        });
    });
});