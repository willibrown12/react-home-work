import { RegisteredUser } from "..";

export function ifUserExist(users: Array<RegisteredUser>, userName: string): boolean {
    const foundUser = users.find(user => user?.userName?.toLowerCase() === userName.toLocaleLowerCase())
    if (foundUser) return true;
    else return false
}

