// 1. ADATBÁZIS-PAJZS (Mindig ez az első!)
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. SZERVIZ MOCKOLÁSA
const mockKosartetelFunctions = {
    postTetel: jest.fn(),
    getTetel: jest.fn(),
    getTetelek: jest.fn()
};

jest.mock("../api/services/index", () => {
    return (db) => ({
        kosartetelService: mockKosartetelFunctions
    });
});

// 3. KONTROLLER BEHÚZÁSA
const kosartetelController = require("../api/controllers/kosartetelController");

describe("KosartetelController tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, id: null };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("postTetel", () => {
        test("should return 200 and the created item on success", async () => {
            const inputData = { kosar_id: 1, termek_id: 5, mennyiseg: 2 };
            req.body = inputData;
            mockKosartetelFunctions.postTetel.mockResolvedValue({ id: 100, ...inputData });

            await kosartetelController.postTetel(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(mockKosartetelFunctions.postTetel).toHaveBeenCalledWith(inputData);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 100 }));
        });

        test("should call next(error) if postTetel service fails", async () => {
            const error = new Error("Failed to add item");
            mockKosartetelFunctions.postTetel.mockRejectedValue(error);

            await kosartetelController.postTetel(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getTetelek", () => {
        test("should return 200 and list of items", async () => {
            req.id = 55; 
            const mockList = [{ id: 1, termek_id: 2 }];
            mockKosartetelFunctions.getTetelek.mockResolvedValue(mockList);

            await kosartetelController.getTetelek(req, res, next);

            expect(mockKosartetelFunctions.getTetelek).toHaveBeenCalledWith(55);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockList);
        });
    });
});