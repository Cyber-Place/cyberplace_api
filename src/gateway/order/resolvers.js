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
    }

  }
}
export default resolvers
