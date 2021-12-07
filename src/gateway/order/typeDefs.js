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
`;
export const orderQueries = `
  orderStateById(id: Int!): orderStateModel!
  orderStateByOrderId(orderId: orderIdInput!): orderStateModel!
`;
export const orderMutations = `
  orderStateCreate(state: orderStateCreateInput!): orderStateModel!
  orderStateDelete(id: Int!): String!
  orderStateUpdate(id: Int!, state: orderStateUpdate!): String!
`;
