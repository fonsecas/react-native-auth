export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
}); 

export const LISTA_PESSOA = 'LISTA_PESSOA';
const getListas = lista => ({
    type: LISTA_PESSOA,
    lista
});

export const PESSOA_DETAIL = 'PESSOA_DETAIL';
const getPessoa = pessoa => ({
    type: PESSOA_DETAIL,
    pessoa
});

export const tryLogin =( { email, password }) => dispatch  => {
    return fetch('http://api.gerenciamentopolitico.com.br:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            login: email,
            senha: password,
            }),  
        }).then((response) => response.json())
            .then((responseJson) => { 
  
                if ( responseJson && responseJson.tipo == 'error'){
                   return null;
               } else {  
                //console.log(responseJson)
                const action = userLoginSuccess(responseJson);
                dispatch(action);
                return responseJson; 
               }
               
                //return console.log(responseJson);
                //this.props.navigation.navigate('Main'); 
            })
             .catch((error) => {
                 console.error(error); 
             })
           
}



export const getLista = () => dispatch  => {
    return fetch(`http://api.gerenciamentopolitico.com.br:8080/api/v1/listas?fields=id,descricao,instrucaosql,joins,cli.id as cliente&filter=ent.model::{like}::'pessoas'&limit=100`, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '7d389587229ecdab0211461e742e0a04#1'
            },  
        }).then((response) => response.json())
            .then((responseJson) => { 
                 
                //console.log(responseJson)
                const action = getListas(responseJson);
                dispatch(action);
                return responseJson; 
            })
             .catch((error) => {
                 console.error(error); 
             })
           
}

export const getPessoaDetail = () => dispatch =>{
    return fetch(`http://api.gerenciamentopolitico.com.br:8080/api/v1/pessoas/642452`, {
            method: 'GET',
            headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '7d389587229ecdab0211461e742e0a04#1'
            },  
        }).then((response) => response.json())
            .then((responseJson) => {
                 const action = getPessoa(responseJson);
                  dispatch(action); 
                 return responseJson;  
            })
             .catch((error) => {
                 console.error(error); 
             })
} 
