import { generalRequest, getRequest } from '../../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		authorize: (_,{ jwt }) =>{
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/validate`, 'GET',_,headers)
		}
			
	},
	Mutation: {
		login: (_, { user }) =>
			generalRequest(`${URL}/login`, 'POST', user),
	}
};

export default resolvers;
