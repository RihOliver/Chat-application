require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const process = require('process')
const http = require('http')
const socket = require('socket.io')
const app = express()
const server = http.createServer(app)

app.use(cors())

/**Connect socket with server */
const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
});

app.use(express.json())


/**Models */
const User = require('./models/User')
const Message = require('./models/Message')

/**Public route */
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Welcome to Chat' })
})

/**Private route */
app.get('/users/:id', checkToken, async (req, res) => {
    const id = req.params.id


    const user = await User.findById(id, '-password')


    if (!user) {
        return res.status(404).json({ msg: 'User not found' })
    }
    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'access denied' })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    } catch (error) {
        res.status(400).json({ msg: 'Invalid token' })
    }
}

/**User register */
app.post('/auth/register', async (req, res) => {
    const { username, password, confirmpassword, phone, cpf } = req.body

    if (!username) {
        return res.status(422).json({ msg: 'Username is required' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'Password is required' })
    }

    if (!phone) {
        return res.status(422).json({ msg: 'Phone is required' })
    }

    if (!cpf) {
        return res.status(422).json({ msg: 'Cpf is required' })
    }


    if (confirmpassword !== password) {
        return res.status(422).json({ msg: 'The password and confirmation are different' })
    }

    if (cpf.length < 11) {
        return res.status(422).json({ msg: 'Cpf is invalid' })
    }

    const userExists = await User.findOne({ cpf: cpf })
    const usernameExists = await User.findOne({ username: username })


    if (usernameExists) {
        return res.status(422).json({ msg: 'This username is already registered' })
    }

    if (userExists) {
        return res.status(422).json({ msg: 'This cpf is already registered' })
    }


    /**Create password */
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    /**Create user */
    const user = new User({
        username,
        password: passwordHash,
        phone,
        cpf
    })

    try {
        await user.save()
        res.status(201).json({ msg: 'Successfully registered user' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
})


/**User Login */
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    if (!username) {
        return res.status(404).json({ msg: 'Username is required', data: {} })
    }

    if (!password) {
        return res.status(422).json({ msg: 'Password is required', data: {} })
    }

    /**Check if user exists */
    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(422).json({ msg: 'Username is invalid', data: {} })
    }


    /**Check if password is correct */
    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass) {

        return res.status(422).json({ msg: 'Password is invalid', data: {} })
    }

    try {

        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        }, secret)

        res.status(200).json({ msg: 'Successfully logged user', data: { token } })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error', data: {} })
    }
})

/**Send message */
app.post('/sendMessage', async (req, res) => {
    const { message } = req.body
    const newMessage = new Message({
        message
    })

    try {
        await newMessage.save()
        res.status(201).json({ msg: 'Successfully registered message' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
})

app.get('/getMessages', async (req, res) => {
    try {
        const allMessages = await Message.find()
        res.status(200).json(allMessages)
    } catch (err) {
        res.status(500).json({ msg: 'Fail to get messages' })
    }
})

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log('[HTTP] Listen => Press CTRL+C to stop it')
})


mongoose.set("strictQuery", false)
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@clusterbluelab.xdu5ayb.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log("Mongo connected")
    app.listen(3000)
}).catch((err) => console.log(err))

