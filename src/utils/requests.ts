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

export { getRoomData };