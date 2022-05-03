import {User} from "../types";

export const user = (partial: Partial<User>): User => ({
    name: "moro",
    email: "moro.poro",
    imageUrl: "www.kuva.jpg",
    ...partial
})