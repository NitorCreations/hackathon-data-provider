import express from 'express'
import { fileHandler } from "./src/fileHandler";
const app = express()

const PORT = 3000;

app.get('/',  (req, res) => {
    res.send('Hello World')
})

app.get('/users', async (req, res) => {
    const users = await fileHandler("./data/users.json")
    res.header("Content-Type",'application/json');
    res.send(users)
})

app.get('/activities', async (req, res) => {
    const activities = await fileHandler("./data/activities.json")
    res.header("Content-Type",'application/json');
    res.send(activities)
})

app.get('/fromFlights', async (req, res) => {
    const fromFlights = await fileHandler("./data/fromFlights.json")
    res.header("Content-Type",'application/json');
    res.send(fromFlights)
})

app.get('/toFlights', async (req, res) => {
    const toFlights = await fileHandler("./data/toFlights.json")
    res.header("Content-Type",'application/json');
    res.send(toFlights)
})

app.listen(PORT)

console.log(`App listening on ${PORT}`)
