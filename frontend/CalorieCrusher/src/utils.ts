import api from "./axiosinterceptors";

export async function GetUserInfo(){
    const userInfo = await api.get("/users/me/")
    .then((response) => {
        console.log("USER IS LOGGED IN")
        console.log(response.data)
        return response.data
    }) .catch((err) => {
        console.log("NO USER LOGGED IN")
        return false
    }) .finally(() => {
        console.log("finished fetching user data")
    })
    return userInfo
}
