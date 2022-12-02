const stringToArray = function(field) {
    return function(req, res, next) {
        if(typeof req.body[field] == "string") {
            if(req.body[field].includes("#")) {
                req.body[field] = req.body[field].split("#").map(item => item.trim()) 
            } else if(req.body[field].includes(",")) {
                req.body[field] = req.body[field].split(",").map(item => item.trim()) 
            } else {
                req.body[field] = [req.body[field]]
            }
        } else if(typeof req.body[field] == "object"){
            next()
        } else {
            req.body[field] = []
        }
        next()
    }
}

module.exports = {
    stringToArray
}