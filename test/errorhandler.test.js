const { notFound, showError } = require("../api/middlewares/errorHandler");
const { NotFoundError, AppError } = require("../api/errors");

describe("ErrorHandler tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        // Mockoljuk a res objektumot láncolható (chainable) formában
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe("notFound middleware", () => {
        test("should call next with a NotFoundError", () => {
            notFound(req, res, next);
            
            // Ellenőrizzük, hogy a next-et egy NotFoundError-ral hívták-e meg
            expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    describe("showError middleware", () => {
        test("should handle a known AppError", () => {
            const error = new AppError("Test Error", { statusCode: 400 });

            showError(error, req, res, next);

            // Ellenőrizzük a státuszkódot
            expect(res.status).toHaveBeenCalledWith(400);
            // Ellenőrizzük a JSON választ
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Test Error"
            }));
        });

        test("should wrap unknown errors into Internal Server Error (500)", () => {
            // Egy sima JavaScript hiba, ami NEM AppError példány
            const genericError = new Error("Something went wrong");

            showError(genericError, req, res, next);

            // Mivel nem AppError, 500-as kódot kell kapnia az errorHandler-től
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Internal Server Error"
            }));
        });

        test("should include stack trace in the response", () => {
            const error = new AppError("Stack test", { statusCode: 404 });
            error.stack = "test stack trace";

            showError(error, req, res, next);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                stack: "test stack trace"
            }));
        });
    });
});