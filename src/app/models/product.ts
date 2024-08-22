export interface ProductModel {
    code:string;
    status:number;
    statusVerbose:string;
    product:Product;
}

export const ProductModelFromJSON = (json: any): ProductModel => {
    return {
        code: json.code ? json.code : '',
        status: json.status ? json.status : 0,
        statusVerbose: json.status_verbose ? json.status_verbose : '',
        product: json.product ? ProductFromJSON(json.product) : { allergensHierarchy: [] }
    };
};

export interface Product{
    allergensHierarchy:string[];
}

export const ProductFromJSON = (json: any): Product => {
    return {
        allergensHierarchy: json.allergens_hierarchy ? json.allergens_hierarchy : []
    };
};