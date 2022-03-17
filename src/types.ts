export interface User {
    id?: number;
    email: string;
    name: string;
    itemsOrdered?: Order[];
}

export interface Item {
    id?: number;
    title: string;
    image: string;
    price: any;
    boughtBy?: Order[];
}

export interface Order {
    quantity: number;
    userId?: number;
    itemId?: number;
    Item?: Item;
    User?: User;
}
