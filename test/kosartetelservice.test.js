// 1. ADATBÁZIS-PAJZS (Hogy a Sequelize ne zavarjon be)
jest.mock("../api/db", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. REPOSITORY MOCKOLÁSA
const mockRepo = {
    postTetel: jest.fn(),
    getTetel: jest.fn(),
    getTetelek: jest.fn()
};

jest.mock("../api/repositories", () => {
    return (db) => ({
        kosartetelRepository: mockRepo
    });
});

// 3. SERVICE BEHÚZÁSA
const KosartetelService = require("../api/services/KosartetelService");

describe("KosartetelService tests", () => {
    let kosartetelService;

    beforeEach(() => {
        jest.clearAllMocks();
        // Üres objektumot adunk át db gyanánt, mivel mockoljuk a repo-t
        kosartetelService = new KosartetelService({});
    });

    describe("postTetel", () => {
        test("should successfully create a new item", async () => {
            const inputData = { kosar_id: 1, termek_id: 5, mennyiseg: 2 };
            const expectedResponse = { id: 99, ...inputData };
            
            mockRepo.postTetel.mockResolvedValue(expectedResponse);

            const result = await kosartetelService.postTetel(inputData);

            expect(result).toBeDefined();
            expect(result.id).toBe(99);
            expect(mockRepo.postTetel).toHaveBeenCalledWith(inputData);
        });

        test("should throw error if data is missing", async () => {
            // Itt a service-ed BadRequestError-t vagy sima Error-t dob a logikád szerint
            await expect(kosartetelService.postTetel(null))
                .rejects.toThrow();
        });
    });

    describe("getTetel", () => {
        test("should return an item by ID", async () => {
            const mockItem = { id: 10, termek_id: 5, mennyiseg: 1 };
            mockRepo.getTetel.mockResolvedValue(mockItem);

            const result = await kosartetelService.getTetel(10);

            expect(result).toEqual(mockItem);
            expect(mockRepo.getTetel).toHaveBeenCalledWith(10);
        });

        test("should throw error if item does not exist", async () => {
            mockRepo.getTetel.mockResolvedValue(null);

            await expect(kosartetelService.getTetel(999))
                .rejects.toThrow();
        });
    });

    describe("getTetelek", () => {
        test("should return all items for a basket", async () => {
            const mockItems = [
                { id: 1, kosar_id: 1, termek_id: 2 },
                { id: 2, kosar_id: 1, termek_id: 3 }
            ];
            mockRepo.getTetelek.mockResolvedValue(mockItems);

            const result = await kosartetelService.getTetelek(1);

            expect(result).toHaveLength(2);
            expect(result).toEqual(mockItems);
        });
    });
});