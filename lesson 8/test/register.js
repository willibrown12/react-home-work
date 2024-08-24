async function registerUser() {
    const result = await fetch(`http://localhost:3600/auth/register`, {
        method: "post",
        body: JSON.stringify({
            userName: `gal${Math.ceil(Math.random() * 8889)}@gmail.com`,
            fullName: "berman",
            phone: "058545425",
            password: "wiliwilAA111Aiw!!!",
        }),
        headers: { "content-type": "application/json" }
    })
    const r = await result.json()
    console.log(r)
    return r;

}
registerUser()
