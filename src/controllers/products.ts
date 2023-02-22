import { RequestHandler } from "express";
import { Product, productModel } from "../models/products";
import {
    badRequest,
    internalServerError,
    notFound,
    ok,
    validateNumber,
} from "../services/util";

const insertProduct: RequestHandler = (req, res) => {
    {
        const product = req.body;
        if (!product) return badRequest(res, "Produto inválido");

        if (!product.name) {
            return badRequest(res, "Informe o nome do produto");
        }

        if (!validateNumber(product.price)) {
            return badRequest(res, "Informe o preço do produto");
        }
    }

    const product = req.body as Product;
    return productModel
        .insertProduct(product)
        .then((product) => res.json(product))
        .catch((err) => internalServerError(res, err));
};

const updateProject: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    {
        if (!validateNumber(id)) return badRequest(res, "Id inválido");

        const product = req.body;
        if (!product) return badRequest(res, "Produto inválido");

        if (!product.name) {
            return badRequest(res, "Informe o nome do produto");
        }

        if (!validateNumber(product.price)) {
            return badRequest(res, "Informe o preço do produto");
        }

        const productSaved = await productModel.getProduct(id);
        if (!productSaved) return notFound(res);
    }

    const product = req.body as Product;
    return productModel
        .updateProject(product)
        .then((product) => res.json(product))
        .catch((err) => internalServerError(res, err));
};

const listProducts: RequestHandler = async ({}, res) => {
    return await productModel
        .listProducts()
        .then((products) => res.json(products))
        .catch((err) => internalServerError(res, err));
};

const getProduct: RequestHandler = (req, res) => {
    const id = parseInt(req.params.id);

    {
        if (!validateNumber(id)) return badRequest(res, "Id inválido");
    }

    return productModel
        .getProduct(id)
        .then((product) => {
            if (product) return res.json(product);
            else return notFound(res);
        })
        .catch((err) => internalServerError(res, err));
};

const deleteProduct: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    {
        if (!validateNumber(id)) return badRequest(res, "Id inválido");

        const productSaved = await productModel.getProduct(id);
        if (!productSaved) return notFound(res);
    }

    return productModel
        .deleteProduct(id)
        .then(() => {
            return ok(res);
        })
        .catch((err) => internalServerError(res, err));
};

export const productController = {
    insertProduct,
    updateProject,
    listProducts,
    getProduct,
    deleteProduct,
};
