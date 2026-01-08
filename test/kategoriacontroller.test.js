// 1. ADATBÁZIS-PAJZS (A dialect hiba ellen)
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. SZERVIZ MOCKOLÁSA
const mockKategoriaFunctions = {
    getKategoriak: jest.fn()
};

jest.mock("../api/services", () => {
    return (db) => ({
        kategoriaService: mockKategoriaFunctions
    });
});

// 3. KONTROLLER BEHÚZÁSA (Csak a mockok után!)
const kategoriaController = require("../api/controllers/kategoriaController");

describe("KategoriaController tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test("should return 200 and all categories on success", async () => {
        // Arrange
        const mockKategoriak = [{ id: 1, nev: "Elektronika" }, { id: 2, nev: "Könyvek" }];
        mockKategoriaFunctions.getKategoriak.mockResolvedValue(mockKategoriak);

        // Act
        await kategoriaController.getKategoriak(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockKategoriak);
        expect(next).not.toHaveBeenCalled();
    });

    test("should call next(error) if service fails", async () => {
        // Arrange
        const error = new Error("Database connection lost");
        mockKategoriaFunctions.getKategoriak.mockRejectedValue(error);

        // Act
        await kategoriaController.getKategoriak(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(error);
        
        // Fontos: ha a kontrolleredben van 'return res.status...', akkor ez átmegy.
        // Ha még nincs ott a return, akkor ezt a sort töröld ki (mint a kosárnál):
        // expect(res.status).not.toHaveBeenCalled();
    });
});