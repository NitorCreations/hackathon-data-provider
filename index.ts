import express from 'express'
import {user} from "./src/factories/User";
const app = express()

const PORT = 3000;

const users = Array.from({ length: 10 }).map((_, i) => user({ name: "nimi" + i }))

app.get('/',  (req, res) => {
    res.send('Hello World')
})

app.get('/users', async (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(users))
})

app.listen(PORT)

console.log(`App listening on ${PORT}`)
