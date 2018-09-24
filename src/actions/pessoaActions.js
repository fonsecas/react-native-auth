export const LISTA_PESSOA = 'LISTA_PESSOA';
const getListas = lista => ({
    type: LISTA_PESSOA,
    lista
});

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