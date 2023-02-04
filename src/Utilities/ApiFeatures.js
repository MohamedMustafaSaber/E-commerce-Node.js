class ApiFeatures {
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    //1. Panigation
    paginate(){
        let page = this.queryString.page * 1 || 1;
        if (page < 0) page = 1;
        let limit = 5;
        let skip = (page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit);
        this.page = page;
        return this;
    }
    //2. Filter
    filter(){
        let query = { ...this.queryString};
        let excludedParams = ['page', 'sort', 'keyword'];
        excludedParams.forEach((ele) => {
            delete query[ele];
        })
        query = JSON.stringify(query);
        query = query.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        query = JSON.parse(query);
        this.mongooseQuery.find(query);
        return this;
    }
    //3. Sort
    sort(){
        if (this.queryString.sort) {
            let sortedBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }
    //4. Search
    search(){
        if (this.queryString.keyword) {
            let keyword = this.queryString.keyword;
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            })
        }
        return this;
    }
    // 5. select Fields
    selectFields(){
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ');
            this.ongooseQuery.select(fields);
        }
        return this;
    }

}

module.exports = {
    ApiFeatures
}