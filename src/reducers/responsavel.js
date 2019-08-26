import { BUSCAR_RESPONSAVEL, FILTRAR_RESPONSAVEL } from "../constants/responsavel";

export const fetchResponsavel = (state = [], action) =>{
    switch(action.type){
        case BUSCAR_RESPONSAVEL:
            return action.payload;
        case FILTRAR_RESPONSAVEL:
            return action.payload;
        default:
            return state;
    }
}
