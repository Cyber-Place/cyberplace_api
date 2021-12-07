export const orderTypeDef = `
  type orderStateModel {
    id: Int
    order_id: Int
    statuses_id: Int
    description: String
    arriving_date: String
    created_at: String
    update_at: String
  }
  type orderModel {
    id: Int!
    user_id: Int!
    product_id: Int!
    quantity: Int!
    price: Float!
    total_price: Float!
    shipping_price: Float!
    payment_id: Int!
    shipping_address_id: Int!
    tracking_url: String
    created_at: String!
    update_at: String!
    code: Float!
  }
  type orderBuyAgain {
    product_id: Int!
    quantity: Int!
  }
  input orderCreateInput {
    user_id: Int!
    product_id: Int!
    quantity: Int!
    price: Float!
    total_price: Float!
    shipping_price: Float!
    payment_id: Int!
    shipping_address_id: Int!
  }
  input orderStateUpdate {
    statuses_id: Int!
    description: String!
    arriving_date: String!
  }
  input orderStateCreateInput {
    order_id: Int!
    status_code: Int!
    description: String!
    arriving_date: String!
  }
  input orderIdInput {
    order_id: Int!
  }
  input userIdInput {
    user_id: Int!
  }
  input orderTracking {
    tracking_url: String!
  }
`;
export const orderQueries = `
  orderStateById(id: Int!): orderStateModel!
  orderStateByOrderId(orderId: orderIdInput!): [orderStateModel!]
  orderShow(id: Int!, user_id: userIdInput!): orderModel!
  orderBuyAgain(id: Int!): orderBuyAgain!
  orderHistory(user_id: userIdInput!): [orderModel!]
`;
export const orderMutations = `
  orderStateCreate(state: orderStateCreateInput!): orderStateModel!
  orderStateDelete(id: Int!): String!
  orderStateUpdate(id: Int!, state: orderStateUpdate!): String!
  orderCreate(order: orderCreateInput!): orderModel!
  orderUpdate(id: Int!, order: orderCreateInput!): String
  orderDelete(id: Int!): String
  orderTracking(id: Int!, tracking: orderTracking!): String
`;
