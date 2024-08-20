import { RegisteredUser, LoginUser } from "..";
import { v4 as uuidv4 } from 'uuid';

export function loginUser(users: Array<RegisteredUser>, user: LoginUser): LoginUser | false {
    const { userName, password } = user;
    const foundUser = users.find(
        user => user?.userName?.toLowerCase() === userName.toLowerCase() &&
            user?.password === password
    )
    if (foundUser) return foundUser;
    else return false
}

export function getToken() {
    return uuidv4();
}

