const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://mvmoshchovskyi:123456@cluster0.tlgl0.mongodb.net/auth_role?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server was starter on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
