import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_LOCAL_URL

const getRoomData = async (checkin: string, checkout: string) => {
    return await axios({
        url: `${backendUrl}/rooms`,
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
        url: `${backendUrl}/signup`,
        method: "POST",
        withCredentials: true,
        data: {
            firstName: firstName,
            lastName: lastName,
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

const authUser = async (email: string, password: string) => {
    return await axios({
        url: `${backendUrl}/login`,
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

const getPaymentMethods = async () => {
    return await axios({
        url: `${backendUrl}/payment-methods`,
        method: "GET",
        withCredentials: true
    })
        .then((res) => res)
        .catch((err) => console.log(err));
};

const createBooking = async (bookingData: any) => {
    return await axios({
        url: `${backendUrl}/bookings/create-booking`,
        method: "POST",
        withCredentials: true,
        data: {
            bookingData: bookingData
        }
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};


const getMyBookings = async (userId: string) => {
    return await axios({
        url: `${backendUrl}/bookings/${userId}`,
        method: "GET",
        withCredentials: true,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

const cancelBooking = async (bookingId: string) => {
    return await axios({
        url: `${backendUrl}/bookings/cancel-booking`,
        method: "POST",
        withCredentials: true,
        data: {
            bookingId: bookingId
        }
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export { getRoomData, createUser, authUser, getPaymentMethods, createBooking, getMyBookings, cancelBooking };