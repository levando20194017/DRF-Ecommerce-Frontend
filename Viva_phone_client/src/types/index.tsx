export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    variant: string;
    shop: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    promotion: string;
    description: string;
    image: string;
}