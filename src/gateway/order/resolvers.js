import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {

    orderStateById: (_, {id}) => {
      return generalRequest(`${URL}/order_state/${id}`, 'GET');
    },
    orderStateByOrderId: (_, {orderId}) => {
      return generalRequest(`${URL}/states`, 'GET', orderId);
    },
    orderShow: (_, {id, user_id}) => {
      return generalRequest(`${URL}/order/${id}`, 'GET', user_id); 
    },
    orderBuyAgain: (_, {id}) => {
      return generalRequest(`${URL}/order-buy-again/${id}`, 'GET'); 
    },
    orderHistory: (_, {user_id}) => {
      return generalRequest(`${URL}/order-history`, 'GET', user_id); 
    }
  },
  Mutation: {
    orderStateCreate: (_,{ state }) =>{
      return generalRequest(`${URL}/order_state`, 'POST', state);
    },
    orderStateDelete: (_, {id}) => {
      return generalRequest(`${URL}/order_state/${id}`, 'DELETE');
    },
    orderStateUpdate: (_, {id, state}) => {
      return generalRequest(`${URL}/order_state/${id}`, 'PUT', state);
    },
    orderCreate: (_, {order}) => {
      return generalRequest(`${URL}/order`, 'POST', order);
    },
    orderUpdate: (_, {id, order}) => {
      return generalRequest(`${URL}/order/${id}`, 'PUT', order);
    },
    orderDelete: (_, {id}) => {
      return generalRequest(`${URL}/order/${id}`, 'DELETE');
    },
    orderTracking: (_, {id, tracking}) => {
      return generalRequest(`${URL}/order-tracking/${id}`, 'POST', tracking);
    }
  }
}
export default resolvers
