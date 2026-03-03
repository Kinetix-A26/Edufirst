export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: 'Uniformes' | 'Livres' | 'Équipement Sportif';
    imageUrl: string;
    stock: number;
    sizes?: string[];
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize?: string;
}
