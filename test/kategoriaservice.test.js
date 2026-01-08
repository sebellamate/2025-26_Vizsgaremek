// 1. ADATBÁZIS-PAJZS
jest.mock("../api/db", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. REPOSITORY MOCKOLÁSA (Fontos: ez a változó legyen kívül, hogy elérd)
const mockKategoriaRepo = {
    getKategoriak: jest.fn()
};

jest.mock("../api/repositories", () => {
    return (db) => ({
        kategoriaRepository: mockKategoriaRepo
    });
});

const KategoriaService = require("../api/services/KategoriaService");

describe("KategoriaService tests", () => {
    let kategoriaService;

    beforeEach(() => {
        jest.clearAllMocks();
        kategoriaService = new KategoriaService({});
    });

    test("should return a list of categories from repository", async () => {
        // ARRANGE: Beállítjuk a tesztadatokat
        const mockKategoriak = [
            { id: 1, nev: "Elektronika" },
            { id: 2, nev: "Ruházat" }
        ];
        
        // KONKRÉTAN megmondjuk a mocknak, hogy ezt adja vissza!
        mockKategoriaRepo.getKategoriak.mockResolvedValue(mockKategoriak);

        // ACT
        const result = await kategoriaService.getKategoriak();

        // ASSERT
        expect(result).toEqual(mockKategoriak);
        expect(result).toHaveLength(2);
        expect(mockKategoriaRepo.getKategoriak).toHaveBeenCalledTimes(1);
    });

    test("should return empty array if no categories exist", async () => {
        // ARRANGE: Itt üres tömböt várunk
        mockKategoriaRepo.getKategoriak.mockResolvedValue([]);

        // ACT
        const result = await kategoriaService.getKategoriak();

        // ASSERT
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });
});