import fetchClient from "../utils/fetch-client";
import config from '../config';

const getAllItems = async () : Promise<Array<ShopItem>> => {
    const response = await fetchClient(config.data.itemsUrl);
    return response;
}

export type ShopItem = {
    id: string;
    name: string;
    details: {
      price: number;
      size: string;
      tag: string;
      image: string;
      type: string;
    }
}

export default getAllItems;