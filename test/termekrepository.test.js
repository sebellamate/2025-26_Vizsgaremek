// 1. MODELLEK MOCKOLÁSA
const mockTermekModel = {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
};

const mockKosarTetelModel = {
    findAll: jest.fn(),
    create: jest.fn()
};

// 2. ADATBÁZIS PAJZS
jest.mock("../api/db", () => ({
    Termek: mockTermekModel,
    KosarTetel: mockKosarTetelModel,
    sequelize: {
        sync: jest.fn().mockResolvedValue(true),
        // Ez kell, mert a kódban: this.sequelize.models.KosarTetel
        models: {
            KosarTetel: mockKosarTetelModel
        }
    }
}));

const db = require("../api/db");
const { DbError } = require("../api/errors");
const TermekRepository = require("../api/repositories/TermekRepository");

const termekRepository = new TermekRepository(db);

describe("TermekRepository tests", () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("CRUD operations", () => {
        test("postTermek should create a new product", async () => {
            const termek = { termek_id: 1, nev: "Tej", ar: 450 };
            mockTermekModel.create.mockResolvedValue(termek);
            const result = await termekRepository.postTermek(termek);
            expect(result).toMatchObject(termek);
        });

        test("getTermek should return one product", async () => {
            const mockData = { termek_id: 1, nev: "Tej", ar: 450 };
            mockTermekModel.findOne.mockResolvedValue(mockData);
            const result = await termekRepository.getTermek(1);
            expect(result.nev).toBe("Tej");
        });

        test("editTermek should update product data", async () => {
            mockTermekModel.update.mockResolvedValue([1]);
            await termekRepository.editTermek(1, { ar: 500 });
            expect(mockTermekModel.update).toHaveBeenCalled();
        });

        test("deleteTermek should remove a product", async () => {
            mockTermekModel.destroy.mockResolvedValue(1);
            await termekRepository.deleteTermek(1);
            expect(mockTermekModel.destroy).toHaveBeenCalled();
        });
    });

    describe("getTermekekBykosar_id", () => {
        test("should return products joined with basket items", async () => {
            // Itt a trükk: a mock adatnak olyan struktúra kell, amit a map() és toJSON() szeret
            const mockTetelek = [
                {
                    mennyiseg: 3,
                    Termek: {
                        toJSON: () => ({ termek_id: 10, nev: "Kenyér", ar: 600 })
                    }
                }
            ];
            
            mockKosarTetelModel.findAll.mockResolvedValue(mockTetelek);

            const result = await termekRepository.getTermekekBykosar_id(5);

            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                nev: "Kenyér",
                mennyiseg: 3
            });
            expect(mockKosarTetelModel.findAll).toHaveBeenCalledWith(expect.objectContaining({
                where: { kosar_id: 5 }
            }));
        });
    });

    describe("Error handling", () => {
        test("should throw DbError on database failure", async () => {
            mockTermekModel.findAll.mockRejectedValue(new Error("DB error"));
            await expect(termekRepository.getTermekek()).rejects.toThrow(DbError);
        });
    });
});