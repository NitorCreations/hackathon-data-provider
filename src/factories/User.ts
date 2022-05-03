import {User} from "../types";
import {id} from "./util";

export const user = (partial: Partial<User>): User => ({
    id: id(),
    name: "moro",
    email: "moro.poro",
    fromFlightId: id(),
    toFlightId: id(),
    imageUrl: "www.foo.jpg",
    activityIds: [],
    ...partial
})