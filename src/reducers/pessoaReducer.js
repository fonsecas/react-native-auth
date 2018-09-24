import { LISTA_PESSOA, PESSOA_DETAIL  } from '../actions';

export default function pessoaReducer (state = null, action){
    switch (action.type){ 
        case LISTA_PESSOA:
            return action.lista;
        case PESSOA_DETAIL:
            return action.pessoa
        default:
            return state;
    }
} 