async function login() {
    const result = await fetch(`http://localhost:3600/auth/login`, {
        method: "post",
        body: JSON.stringify({
            userName: "michal@gmail.com",
            password: "wiliwilAA111Aiw!!!",
        }),
        headers: { "content-type": "application/json" }
    })
    const r = await result.json()
    console.log(r)
    return r;

}
login()
