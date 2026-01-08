// 1. ADATBÁZIS-PAJZS
jest.mock("../api/db", () => ({
    authenticate: jest.fn(),
    define: jest.fn(),
}));

// 2. REPOSITORY MOCKOLÁSA
const mockCartRepo = {
    getCart: jest.fn(),
};

jest.mock("../api/repositories", () => {
    return (db) => ({
        cartRepository: mockCartRepo
    });
});

// 3. SERVICE BEHÚZÁSA
const CartService = require("../api/services/CartService");
const { NotFoundError } = require("../api/errors");

describe("CartService tests", () => {
    let cartService;

    beforeEach(() => {
        jest.clearAllMocks();
        // A constructor vár egy db-t, adunk neki egy üreset
        cartService = new CartService({});
    });

    test("should return the cart if it exists", async () => {
        // Arrange
        const mockCartData = { id: 1, user_id: 10, items: [] };
        // Itt mondjuk meg a mocknak, hogy adjon vissza adatot!
        mockCartRepo.getCart.mockResolvedValue(mockCartData);

        // Act
        const result = await cartService.getCart(10);

        // Assert
        expect(result).toEqual(mockCartData);
        expect(mockCartRepo.getCart).toHaveBeenCalledWith(10);
    });

    test("should throw NotFoundError if cart does not exist", async () => {
        // Arrange
        mockCartRepo.getCart.mockResolvedValue(null);

        // Act & Assert
        await expect(cartService.getCart(999))
            .rejects.toThrow(NotFoundError);
    });
});