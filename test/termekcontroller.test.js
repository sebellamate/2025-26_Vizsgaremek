// 1. ADATBÁZIS-PAJZS (Hogy ne legyen dialect hiba)
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. SZERVIZ MOCKOLÁSA
const mockTermekFunctions = {
    getTermekek: jest.fn(),
    postTermek: jest.fn(),
    getTermek: jest.fn(),
    deleteTermek: jest.fn(),
    editTermek: jest.fn(),
    getTermekekBykosar_id: jest.fn()
};

jest.mock("../api/services", () => {
    return (db) => ({
        termekService: mockTermekFunctions
    });
});

// 3. KONTROLLER BEHÚZÁSA (Csak a mockok után!)
const termekController = require("../api/controllers/termekController");

describe("TermekController tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, termek_id: null, kosar_id: null };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("CRUD operations", () => {
        test("postTermek should send correct data to service", async () => {
            const productData = { nev: "Laptop", ar: 300000 };
            req.body = productData;
            mockTermekFunctions.postTermek.mockResolvedValue({ id: 1, ...productData });

            await termekController.postTermek(req, res, next);

            expect(mockTermekFunctions.postTermek).toHaveBeenCalledWith(expect.objectContaining(productData));
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("getTermek should use termek_id from req object", async () => {
            req.termek_id = "999";
            mockTermekFunctions.getTermek.mockResolvedValue({ id: 999, nev: "Teszt" });

            await termekController.getTermek(req, res, next);

            expect(mockTermekFunctions.getTermek).toHaveBeenCalledWith("999");
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("editTermek should combine ID and body for service", async () => {
            req.termek_id = 5;
            req.body = { ar: 500 };
            mockTermekFunctions.editTermek.mockResolvedValue({ id: 5, ar: 500 });

            await termekController.editTermek(req, res, next);

            expect(mockTermekFunctions.editTermek).toHaveBeenCalledWith(5, expect.objectContaining({ ar: 500 }));
        });
    });

    describe("Error handling", () => {
        test("should catch and forward errors using next()", async () => {
            const error = new Error("Database error");
            mockTermekFunctions.getTermekek.mockRejectedValue(error);

            await termekController.getTermekek(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});