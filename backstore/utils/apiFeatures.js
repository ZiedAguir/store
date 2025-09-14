class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        if (!mongooseQuery || !queryString) {
            throw new Error("A valid mongoose query and query string are required.");
        }
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
        this.paginationResult = {};
    }

    filter() {
        const queryStringObj = { ...this.queryString };
        const excludesFields = ["page", "sort", "limit", "fields", "keyword"]; // exclude keyword from generic filter
        excludesFields.forEach((field) => delete queryStringObj[field]);

        let queryString = JSON.stringify(queryStringObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("createdAt");
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fieldsBy = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fieldsBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v");
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let query = {};
            if (modelName === "products") {
                query.$or = [
                    { title: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } },
                ];
            } else {
                query = { name: { $regex: this.queryString.keyword, $options: "i" } };
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }

    paginate(countDocument) {
        const page = this.queryString.page * 1 || 1;
        const limit = Math.min(this.queryString.limit * 1 || 20, 100);
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        const pagination = {
            currentPage: page,
            limit,
            numberOfPages: Math.ceil(countDocument / limit),
        };

        if (endIndex < countDocument) pagination.next = page + 1;
        if (skip > 0) pagination.prev = page - 1;

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;

        return this;
    }



    
}

module.exports = ApiFeatures;
