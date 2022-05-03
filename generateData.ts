import {activity} from "./src/factories/Activity";
import {flight} from "./src/factories/Flight";
import {user} from "./src/factories/User";
import { sampleSize } from 'lodash';
import fs, { readFileSync } from "fs"
import Rand from 'rand-seed'

export const randomIntBetween = (minInclusive: number, maxNotInclusive: number) => {
    return Math.floor(Math.random() * (maxNotInclusive - minInclusive) + minInclusive);
};

export function randomElement<T>(elements: Array<T>): T {
    return elements[randomIntBetween(0, elements.length)];
}

export function oneOrMoreElements<T>(elements: Array<T>): T[] {
    return sampleSize(elements, randomIntBetween(1, elements.length));
}

const writeDataToFile = async (filename: string, data: Array<object>) => {
    fs.writeFile("./data/" + filename, JSON.stringify(data), (err) => {
        if(err) {
            console.error(err)
        }
        console.log("wrote", filename)
    })
}

const rand = new Rand((process.env.SEED as string|undefined) || 'gr8');

const userNames = readFileSync('random-names/users.txt').toString('utf-8').split('\n').map(row => {
    const split = row.split(',')
    return {email:split[0], name:split[1]}
}).filter(x => rand.next()>0.5)

const activities = ["Poroja", "Kelkkoja", "Suksia"].map(n => activity({ name: n }))
const toFlights = ["AYY666", "AYY1337"].map(n => flight({ name: n }))
const fromFlights = ["AYY-LMAO", "ASDASD"].map(n => flight({ name: n }))

const users = Array.from({ length: 20 }).map((_, i) => user({
    activityIds: oneOrMoreElements(activities).map(a => a.id),
    toFlightId: randomElement(toFlights).id,
    fromFlightId: randomElement(fromFlights).id,
    name: "Käyttäjä " + i
}))

Promise.all([
    writeDataToFile("users.json", users),
    writeDataToFile("activities.json", activities),
    writeDataToFile("toFlights.json", toFlights),
    writeDataToFile("fromFlights.json", fromFlights)
]).then(() => {
    console.log("Done")
})

