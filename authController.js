const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {privateKey} = require('./config')

const tokenRegistration = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, privateKey, {expiresIn:'24h'});
}


class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              return   res.status(400).json({message: 'registration error is empty '})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
              return  res.status(400).json({message: 'user with this parameters already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'ADMIN'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return  res.status(201).json({message: 'user was created successfully'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration error rr'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
               return  res.status(400).json({message: ` user ${username} does not exists`})
            }
            const passwordCompare = bcrypt.compareSync(password, user.password)
            if (!passwordCompare) {
                return   res.status(400).json({message: `password   is not valid`})
            }
            const token = tokenRegistration(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            return  res.status(400).json({message: 'login error'})

        }
    }

    async getUser(req, res) {
        const users = await User.find()
         return  res.json(users)
        try {
            res.json('server work')
        } catch (e) {
            console.log(e)
            return  res.status(400).json({message: 'user error'})
        }
    }
}

module.exports = new authController()
