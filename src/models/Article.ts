export interface IArticle {
    id: number;
    code: string;
    description: string;
    price: {lista: string, price: number}[];
    current_qty: {branch: string, quantity: number}[];
    global_qty: number;
}

export interface Article {
    id: number;
    code: string;
    description: string;
    price: string;
    current_qty: string;
    global_qty: number;
}