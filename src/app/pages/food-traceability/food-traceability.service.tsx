import axios from "axios";
import { API_BASE_URL } from "../../common-library/common-consts/enviroment";

const api = API_BASE_URL + '/qrcode'

export const GetDetail = (_id: string) => {
    return axios.get(`${api}/${_id}/public`)
}