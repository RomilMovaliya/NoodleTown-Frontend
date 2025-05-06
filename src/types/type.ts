export interface AllItems {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    quantity: number,
    category: string
}

export interface ItemDetailType {
    id: number;
    name: string;
    area: string;
    cost: string;
    category: string;
    image: string;
    time: string;
    item: string;

}

export interface RestaurantsData {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface CartItemPayload {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    user_id: string;
    item_id: number;
}