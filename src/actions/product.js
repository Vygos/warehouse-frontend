
import {
    CURRENT_ADD,
    PRODUCT_ADD,
    CLEAN_PRODUCTS,
    DELETE_FROM_CART,
    EDIT_FROM_CART,
    PRODUCT_LIST,
    DELETE_FROM_STORE,
    PRODUCT_EDIT,
    PRODUCT_SEARCH
}
from '../constants/product';
import {rest} from '../authentication/tokenConfig';

export const productsCurrentAdd = (formValues) => dispatch =>{
    dispatch({ type: CURRENT_ADD , payload: formValues });
}

export const deleteFromCart = (id) => dispatch =>{
    dispatch({ type: DELETE_FROM_CART, payload: id});
}

export const editFromCart = (product, id) => dispatch => {
    dispatch({ type: EDIT_FROM_CART, product, id})
}

export const cleanProducts = () => dispatch =>{
    dispatch({ type : CLEAN_PRODUCTS})
}

export const produtcsAdd = (form) => async dispatch =>{
    try{
        const response = await rest('').post('/products', form);
        dispatch({ type: PRODUCT_ADD, payload: response.status});
    }catch(e){
        dispatch({ type: PRODUCT_ADD, payload: 500});
    }

}

export const productList = (page,filtros) => async dispatch => {
    try{
        const response = await rest('').post(`products/company/consultar?page=${page}&size=5`, filtros);
        dispatch({ type : PRODUCT_LIST, payload: response.data});
    }catch(e){

    }
}

export const productDelete = (id) => async dispatch =>{
      await rest('').delete(`/products/${id}`);
      dispatch({ type: DELETE_FROM_STORE, payload: id});
}

export const productEdit = (product) => async dispatch =>{
    try{
        await rest('').patch('/products/', product);
        dispatch({ type: PRODUCT_EDIT, payload: product});
    }catch(e){
        alert("error")
    }
}

export const productSearch = (page,name) => async dispatch =>{
    console.log(name);
    try{
        const response = await rest('').post(`/products/company/consultar?page=${page}&size=5`, {noProduto: name})
            dispatch({ type: PRODUCT_SEARCH, payload: response.data});
    }catch(e){
        alert("error")
    }
}
