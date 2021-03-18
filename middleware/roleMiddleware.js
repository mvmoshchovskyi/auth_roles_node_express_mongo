const jwt = require('jsonwebtoken')
const {privateKey} = require('../config')
module.exports = (roles) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json('user not authorazation')
            }
            const {roles: userRoles} = jwt.verify(token, privateKey)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes()) {
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message: 'user not authorazation'})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json('user not authorazation')
        }
    }
}
