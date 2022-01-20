export const productTypeDef = `
    input ProductInput {
        name : String!
        price : Int!
        description : String!
        stars: Int!
        image: String!
    }
    type Product {
        name : String!
        price : Int!
        description : String!
        stars: Int!
        img_url: String!
    }
    `;

export const productQueries = `
    allProducts: [Product]!
    productsById(id: Int!): Product!
`;

export const productMutations = `
    addProduct(product: ProductInput!): Product!
    updateProduct(id: Int!,product: ProductInput!): Product!
    deleteProduct(id: Int!): Product!


`;
