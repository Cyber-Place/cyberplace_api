export const purchaseTypeDef = `
    type productModelGet{
        id : Int!
        name : String!
        price : Int!
        description : String!
        stars: Int!
        img_url: String!
    }
    type purchaseProductModel{
        product_id: String!,
        quantity: Int!
    }
    type purchaseProductModelGet{
        product: productModelGet!,
        quantity: Int!
    }
    type purchaseCreateShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseUpdateShoppingList {
        _id: String!,
        product_list: [purchaseProductModelGet]!
    }
    type purchaseDeleteShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseGetShoppingList{
        _id: String!,
        product_list: [purchaseProductModelGet]!
    }
    input purchaseProductModelInput{
        product_id: String!,
        quantity: Int!
    }
    input purchaseCreateShoppingListInput{
        _id: String!,
        product_list:[purchaseProductModelInput]
    }
    input purchaseUpdateShoppingListInput{
        product_list:[purchaseProductModelInput]
    }
    `;

export const purchaseQueries = `
    shoppingListById(id: String!): purchaseGetShoppingList!
  `;

export const purchaseMutations = `
    createShoppingList(shoppingList: purchaseCreateShoppingListInput!): purchaseCreateShoppingList!
    updateShoppingList(id: String!, shoppingList: purchaseUpdateShoppingListInput!): purchaseUpdateShoppingList!
    deleteShoppingList(id: String!): purchaseDeleteShoppingList!
`;
