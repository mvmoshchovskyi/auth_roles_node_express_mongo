const jwt = require('jsonwebtoken')
const {privateKey} =require('../config')
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json('user not authorazation')
        }
        const decodedData = jwt.verify(token, privateKey, );
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json('user not authorazation')
    }
}
