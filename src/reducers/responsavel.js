import { BUSCAR_RESPONSAVEL, FILTRAR_RESPONSAVEL } from "../constants/responsavel";

export const fetchResponsavel = (state = {content:[], totalElements: 0}, action) =>{
    switch(action.type){
        case BUSCAR_RESPONSAVEL:
            return action.payload;
        case FILTRAR_RESPONSAVEL:
            return action.payload;
        default:
            return state;
    }
}
