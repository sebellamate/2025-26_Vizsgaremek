// 1. ADATBÁZIS-PAJZS (A Sequelize dialect hiba megelőzésére)
jest.mock("../api/db", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. REPOSITORY MOCKOLÁSA
const mockRepoFunctions = {
    getTermekek: jest.fn(),
    postTermek: jest.fn(),
    getTermek: jest.fn(),
    deleteTermek: jest.fn(),
    editTermek: jest.fn(),
    getTermekekBykosar_id: jest.fn()
};

jest.mock("../api/repositories", () => {
    return (db) => ({
        termekRepository: mockRepoFunctions
    });
});

// 3. SERVICE ÉS HIBÁK BEHÚZÁSA (A mockok után!)
const TermekService = require("../api/services/TermekService");
const { BadRequestError, NotFoundError } = require("../api/errors");

describe("TermekService tests", () => {
    let termekService;

    beforeEach(() => {
        jest.clearAllMocks();
        // A constructor vár egy db-t, adunk neki egy üres objektumot
        termekService = new TermekService({});
    });

    describe("getTermek & getTermekek", () => {
        test("getTermekek should call repository and return results", async () => {
            const mockData = [{ id: 1, nev: "Sajt" }];
            mockRepoFunctions.getTermekek.mockResolvedValue(mockData);
            
            const result = await termekService.getTermekek();
            
            expect(result).toHaveLength(1);
            expect(mockRepoFunctions.getTermekek).toHaveBeenCalled();
        });

        test("getTermek should throw NotFoundError if product doesn't exist", async () => {
            mockRepoFunctions.getTermek.mockResolvedValue(null);
            
            await expect(termekService.getTermek(1))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe("post, edit & delete", () => {
        test("postTermek should throw BadRequestError if data is missing", async () => {
            await expect(termekService.postTermek(null))
                .rejects.toThrow(BadRequestError);
        });

        test("editTermek should throw BadRequestError if id or data is missing", async () => {
            await expect(termekService.editTermek(null, { cena: 100 }))
                .rejects.toThrow(BadRequestError);
            await expect(termekService.editTermek(1, null))
                .rejects.toThrow(BadRequestError);
        });

        test("deleteTermek should call repository with correct id", async () => {
            mockRepoFunctions.deleteTermek.mockResolvedValue(1); 
            
            await termekService.deleteTermek(10);
            
            expect(mockRepoFunctions.deleteTermek).toHaveBeenCalledWith(10);
        });
    });

    describe("getTermekekBykosar_id", () => {
        test("should return items for a specific cart", async () => {
            const mockItems = [{ id: 1, mennyiseg: 2 }];
            mockRepoFunctions.getTermekekBykosar_id.mockResolvedValue(mockItems);

            const result = await termekService.getTermekekBykosar_id(5);
            
            expect(result).toEqual(mockItems);
            expect(mockRepoFunctions.getTermekekBykosar_id).toHaveBeenCalledWith(5);
        });

        test("should throw BadRequestError if kosar_id is missing", async () => {
            await expect(termekService.getTermekekBykosar_id(null))
                .rejects.toThrow(BadRequestError);
        });
    });
});