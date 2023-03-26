import axios from "axios";
import { getCookie } from "../utils/auth";

export const modifyItemInventory = async (name, price, number, reference) => {

    const body = {
        name: name,
        number: number,
        reference: reference,
        price: price,
        accesToken: getCookie("accesToken")
    }
    const res = await axios.post('http://localhost:3000/inventaire/update', body);
    return res.data;
}

export const removeItemInventory = async (name) => {
    console.log(name)
    const res = await axios.delete('http://localhost:3000/inventaire/delete?name=' + name + '&accesToken=' + getCookie("accesToken"));
    return res;
}