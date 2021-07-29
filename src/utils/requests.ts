import axios from "axios";

const getRoomData = async (checkin: string, checkout: string) => {
    return await axios({
        url: `${process.env.REACT_APP_BACKEND_HOSTED_URL}/rooms`,
        method: "POST",
        data: {
            selectedCheckin: checkin,
            selectedCheckout: checkout
        }
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};


const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
    return await axios({
        url: `${process.env.REACT_APP_BACKEND_HOSTED_URL}/signup`,
        method: "POST",
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

const authUser = async (email: string, password: string) => {
    return await axios({
        url: `${process.env.REACT_APP_BACKEND_HOSTED_URL}/login`,
        method: "POST",
        withCredentials: true,
        data: {
            email: email,
            password: password
        }
    })
        .then((res) => {
            const response = {
                data: res.data,
                status: res.status
            }

            return response
        })
        .catch((err) => console.log(err));
};

export { getRoomData, createUser, authUser };