const { BadRequestError, NotFoundError } = require("../errors");

class KosartetelService {
    constructor(db) {
        this.kosartetelRepository = require("../repositories")(db).kosartetelRepository;
    }
    async postTetel(tetelData) {
        if (!tetelData) throw new BadRequestError("Missing item data from payload",
            {
                data: tetelData,
            });
        return await this.kosartetelRepository.postTetel(tetelData);
    }
    async getTetel(id) {
        if (!id) throw new BadRequestError("Missing item identification from payload");

        const item = await this.kosartetelRepository.getTetel(id);

        if (!item) throw new NotFoundError("Can not found item with this item identification",
            {
                data: id
            });

        return item;
    }
    async getTetelek(id) {
        if (!id) throw new BadRequestError("Missing item identification from payload");

        const item = await this.kosartetelRepository.getTetelek(id);

        if (!item) throw new NotFoundError("Can not found item with this item identification",
            {
                data: id
            });

        return item;
    }
}
module.exports = KosartetelService;