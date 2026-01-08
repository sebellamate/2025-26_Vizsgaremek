// 1. ADATBÁZIS MODELL MOCKOLÁSA
const mockKosarTetelModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    bulkCreate: jest.fn()
};

jest.mock("../api/db", () => ({
    KosarTetel: mockKosarTetelModel,
    sequelize: {
        sync: jest.fn().mockResolvedValue(true)
    }
}));

const db = require("../api/db");
const { DbError } = require("../api/errors");
const KosartetelRepository = require("../api/repositories/KosartetelRepository");

const kosartetelRepository = new KosartetelRepository(db);

describe("KosartetelRepository tests", () => {
    
    const mockTetel = { id: 10, kosar_id: 1, termek_id: 5, mennyiseg: 2 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("postTetel", () => {
        test("should successfully create a new item", async () => {
            const newTetel = { kosar_id: 1, termek_id: 9, mennyiseg: 1 };
            mockKosarTetelModel.create.mockResolvedValue({ id: 101, ...newTetel });
            
            const result = await kosartetelRepository.postTetel(newTetel);
            
            expect(result).toBeDefined();
            expect(result).toMatchObject(newTetel);
            expect(mockKosarTetelModel.create).toHaveBeenCalledWith(newTetel);
        });

        test("should throw DbError if creation fails", async () => {
            mockKosarTetelModel.create.mockRejectedValue(new Error("DB Error"));
            
            const brokenRepo = new KosartetelRepository(db); // Használjuk a mockolt db-t
            await expect(brokenRepo.postTetel({})).rejects.toThrow(DbError);
        });
    });

    describe("getTetel", () => {
        test("should return a specific item by id", async () => {
            mockKosarTetelModel.findOne.mockResolvedValue(mockTetel);

            const result = await kosartetelRepository.getTetel(10);

            expect(result).toBeDefined();
            expect(result.id).toBe(10);
            expect(mockKosarTetelModel.findOne).toHaveBeenCalled();
        });
    });

    describe("getTetelek", () => {
        test("should return all items for a specific kosar_id", async () => {
            const tetelek = [
                { id: 100, kosar_id: 1, termek_id: 1, mennyiseg: 1 },
                { id: 101, kosar_id: 1, termek_id: 2, mennyiseg: 5 }
            ];
            
            mockKosarTetelModel.findAll.mockResolvedValue(tetelek);

            const result = await kosartetelRepository.getTetelek(1);

            expect(result).toHaveLength(2); 
            expect(result[0].kosar_id).toBe(1);
            expect(mockKosarTetelModel.findAll).toHaveBeenCalledWith(expect.objectContaining({
                where: { kosar_id: 1 }
            }));
        });
    });
});