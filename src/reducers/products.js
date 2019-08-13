import { PRODUCT_ADD, PRODUCT_LIST, DELETE_FROM_STORE} from '../constants/product';

export default (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_ADD:
            return {...state, status: action.payload };
        case PRODUCT_LIST:
            return {...state, ...action.payload};
        case DELETE_FROM_STORE: 
            return {
               ...state, ...Object.values(state).filter(product => product.idProduto !== action.payload)
           };
           
        default:
            return state;
    }
}

