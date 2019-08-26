import { rest } from "../authentication/tokenConfig";
import { BUSCAR_RESPONSAVEL, FILTRAR_RESPONSAVEL } from "../constants/responsavel";
import {toastr} from 'react-redux-toastr';

export const fetchResponsavel = () => async dispatch =>{
    try{
        const response = await rest().get('/responsavel')
        return dispatch({type: BUSCAR_RESPONSAVEL, payload: response.data })
    }catch(e){
        toastr.error("Erro", e.message);
    }
}

export const filtrarResponsavel = (nome) => async dispatch => {
    try{
        const response = await rest().get(`responsavel/buscar-nome/${nome}`);
        return dispatch({type: FILTRAR_RESPONSAVEL, payload: response.data})
    }catch(e){
        toastr.error("Erro", e.message);
    }
}
