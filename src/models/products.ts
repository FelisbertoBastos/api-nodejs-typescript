import { dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
    id: number;
    name: string;
    price: number;
};

const insertProduct = async (product: Product) => {
    await dbQuery("INSERT INTO product (name, price) VALUES (?, ?)", [
        product.name,
        product.price,
    ]);
    let retorno = await dbQuery(
        "SELECT seq AS Id FROM sqlite_sequence WHERE name = 'product'"
    );
    return await getProduct(retorno[0].id);
};

const updateProject = async (product: Product) => {
    await dbQuery("UPDATE product SET name = ?, price = ? WHERE id = ?", [
        product.name,
        product.price,
        product.id,
    ]);
    return await getProduct(product.id);
};

const listProducts = async () => {
    let retorno = await dbQuery("SELECT * FROM product");
    return retorno as Product[];
};

const getProduct = async (id: number) => {
    const retorno = await dbQueryFirst("SELECT * FROM product WHERE id = ?", [
        id,
    ]);
    return retorno as Product | undefined;
};

const deleteProduct = async (id: number) => {
    await dbQueryFirst("DELETE FROM product WHERE id = ?", [id]);
};

export const productModel = {
    insertProduct,
    updateProject,
    listProducts,
    getProduct,
    deleteProduct,
};
