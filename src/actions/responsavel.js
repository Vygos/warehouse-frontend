import { rest } from "../authentication/tokenConfig";
import { BUSCAR_RESPONSAVEL, FILTRAR_RESPONSAVEL } from "../constants/responsavel";
import {toastr} from 'react-redux-toastr';

export const fetchResponsavel = (page, filtros) => async dispatch =>{
    try{
        const response = await rest().post(`/responsavel/consultar?page=${page}&size=5`, filtros);
        return dispatch({type: BUSCAR_RESPONSAVEL, payload: response.data })
    }catch(e){
        toastr.error("Erro", e.message);
    }
}

export const filtrarResponsavel = (page,nome) => async dispatch => {
    try{
        const response = await rest().post(`responsavel/consultar?page=${page}&size=5`, {noResponsavel: nome});
        return dispatch({type: FILTRAR_RESPONSAVEL, payload: response.data})
    }catch(e){
        toastr.error("Erro", e.message);
    }
}
