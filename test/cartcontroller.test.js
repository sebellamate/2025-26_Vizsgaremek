// 1. ADATBÁZIS-PAJZS (Hogy ne keresse a dialect-et)
jest.mock("../api/db/index", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. SZERVIZ MOCKOLÁSA
const mockGetCart = jest.fn();
jest.mock("../api/services", () => {
    return (db) => ({
        cartService: {
            getCart: mockGetCart
        }
    });
});

// 3. CSAK EZUTÁN HÚZZUK BE A KONTROLLERT
const cartController = require("../api/controllers/cartController");

describe("CartController tests", () => {
    let req, res, next;

    beforeEach(() => {
        // Mockoljuk a kérést, választ és a next függvényt
        req = {
            user_id: 10 
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test("should return 200 and the cart data on success", async () => {
        // Arrange
        const mockCart = { id: 1, user_id: 10, items: [] };
        mockGetCart.mockResolvedValue(mockCart);

        // Act
        await cartController.getCart(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCart);
        expect(next).not.toHaveBeenCalled();
    });

    test("should call next(error) if cartService throws an error", async () => {
        // Arrange
        const error = new Error("Service error");
        mockGetCart.mockRejectedValue(error);

        // Act
        await cartController.getCart(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(error);
    });
});