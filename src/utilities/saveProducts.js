import products from "../data/products"


export const getProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    return savedProducts || products; 
}

export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

export const addProduct = (newProduct) => {
    const currentProducts = getProducts(); 
    currentProducts.unshift(newProduct); 
    saveProducts(currentProducts);
}

