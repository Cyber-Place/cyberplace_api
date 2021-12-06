export const purchaseTypeDef = `
    type purchaseProductModel{
        product_id: String!,
        quantity: Int!
    }
    type purchaseCreateShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseUpdateShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseDeleteShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseGetShoppingList{
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    input purchaseProductModelInput{
        product_id: String!,
        quantity: Int!
    }
    input purchaseCreateShoppingListInput{
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
