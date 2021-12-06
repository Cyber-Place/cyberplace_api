import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

import authResolvers from '../account/auth/resolvers';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
        //query get all shooping lists NOT NECCESARY
		/*
        allShoppingLists: (_, {}) => {
			return generalRequest(URL, 'GET');
		},
        */
        //get shooping list by id
		shoppingListById: (_, {id}) => {
			return generalRequest(`${URL}/${id}`, 'GET');
		},

		/*historyByUsername: (_, {username}) => {
			return generalRequest(`${URL}/user/${username}`, 'GET');
		},
        */

        /*
		myShoopingList: async (_, {jwt}) =>{
			const authorize = await authResolvers.Query.authorize(_,{jwt});
			if(authorize.statusCode != 200)throw "Unauthorized"
			const message = await authResolvers.Query.getusername(_,{jwt});
			const username = message.data;
			const idHistory = await resolvers.Query.historyByUsername(_,{username});
			return resolvers.Query.historyById(_,idHistory);
		}
        */
		
		
	},
	Mutation: {
		createShoppingList: (_, {shoppingList}) => {
			return generalRequest(`${URL}`, 'POST', shoppingList);
		},
		updateShoppingList: (_, {id,shoppingList}) => {
			return generalRequest(`${URL}/${id}`, 'PATCH', shoppingList);
		},
		deleteShoppingList: (_, {id}) => {
			return generalRequest(`${URL}/${id}`, 'DELETE');
		},
		/*
        addItem: (_, {idHistory, item}) => {
			return generalRequest(`${URL}/additem/${idHistory}`, 'POST', item);
		},
		removeItem: (_, {idHistory, idItem}) => {
			const params = {
				idItem : idItem
			};
			return generalRequest(`${URL}/removeitem/${idHistory}`, 'DELETE', _, _,params);
		},
		removeAllItems: (_, {idHistory}) => {
			return generalRequest(`${URL}/removeallitems/${idHistory}`, 'DELETE');
		},
		addItemMyHistory: async (_, {jwt, item}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.addItem(_,{idHistory, item});
		},
		deleteItemMyHistory: async (_, {jwt, idItem}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.removeItem(_,{idHistory, idItem});
		},
		deleteMyHistory: async (_, {jwt}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.removeAllItems(_,{idHistory});
		}
        */
		
	}
};

export default resolvers;
