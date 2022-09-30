import axios from "./axios";

class GetService {

    fetchAllCar = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('car/getAll')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

}

export default new GetService();

