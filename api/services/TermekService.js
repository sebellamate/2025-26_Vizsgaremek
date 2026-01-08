const { BadRequestError, NotFoundError } = require("../errors");

class TermekService {
    constructor(db) {
        this.termekRepository = require("../repositories")(db).termekRepository;
    }

    async getTermekek() {
        return await this.termekRepository.getTermekek();
    }
    async postTermek(termekData) {
        if (!termekData) throw new BadRequestError("Missing good data from payload",
            {
                data: termekData,
            });
        return await this.termekRepository.postTermek(termekData);
    }
    async getTermek(termek_id) {
        if (!termek_id) throw new BadRequestError("Missing good identification from payload");

        const good = await this.termekRepository.getTermek(termek_id);

        if (!good) throw new NotFoundError("Can not found good with this good identification",
            {
                data: termek_id
            });

        return good;
    }
    async deleteTermek(termek_id) {
        if (!termek_id) throw new BadRequestError("Missing good identification from payload");
        return await this.termekRepository.deleteTermek(termek_id);
    }
    async editTermek(termek_id, termekData) {
        if (!termek_id || !termekData) throw new BadRequestError("Missing good identification/data from payload");
        return await this.termekRepository.editTermek(termek_id, termekData);
    }
    async getTermekekBykosar_id(kosar_id) {
        if (!kosar_id) throw new BadRequestError("Missing goods identification from payload");

        const goods = await this.termekRepository.getTermekekBykosar_id(kosar_id);

        if (!goods) throw new NotFoundError("Can not found goods with this good identification",
            {
                data: kosar_id
            });
        return goods;
    }
}

module.exports = TermekService;