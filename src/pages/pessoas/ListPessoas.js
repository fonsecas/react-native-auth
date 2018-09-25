import React from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native'; 
import Lista from '../../components/pessoas/ListaPessoas'
import {
    Container,
    Header,
    Button,
    Text,
    Icon,
    Left,
    Right,
    Body
  } from "native-base";
  
class ListPessoas extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
          pessoas: [],
          isLoading: false
        }
       
    }
    
    componentDidMount(){
      fetch(`http://api.gerenciamentopolitico.com.br:8080/api/v1/pessoas?fields=id,nome,c.valor as contato&filter=ent.id::{isNotNull}::{andX}::f.id::{isNotNull}::{andX}::(ent.nome::{isNotNull}::{orX}::c.id::{isNotNull})&limit=100&joins=fisicas:f:pessoa,contatos:c:pessoa&offset=0&sort=nome:ASC`, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '7d389587229ecdab0211461e742e0a04#1'
            },  
        }).then((response) => response.json())
            .then((responseJson) => { 
                this.setState({pessoas : responseJson,
                                isLoading: true}) 
              //  console.log(this.state.pessoas)
                // const action = getListas(responseJson);
                // dispatch(action);
                // return responseJson; 
            })
             .catch((error) => {
                 console.error(error); 
             })
    }
    render(){
        
        const descricao = this.props.navigation.state.params.props.item.descricao;
        if (!this.state.isLoading) {
            return (<Container style={styles.container}>
                <View style={{ backgroundColor: "#262626"}}>
                        <Header style={{ backgroundColor: "#262626", marginTop: 20}}>
                      <Left>
                        <Button
                          transparent
                          onPress={() => this.props.navigation.goBack() }
                        >
                          <Icon name="arrow-back" size={24} color={'white'}/>
                        </Button>
                      </Left>
                      <Body>
                        <Text style={{color: 'white'}}>{descricao}</Text>
                      </Body>
                      <Right />
                    </Header> 
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                    </View>
                   </Container> )}
        return(  
          <Container style={styles.container}>
          <View style={{ backgroundColor: "#262626"}}>
                  <Header style={{ backgroundColor: "#262626", marginTop: 20}}>
                <Left>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.goBack() }
                  >
                    <Icon name="arrow-back" size={24} color={'white'}/>
                  </Button>
                </Left>
                <Body>
                  <Text style={{color: 'white'}}>{descricao}</Text>
                </Body>
                <Right />
              </Header> 
              </View>
              <Lista 
                           pessoas={this.state.pessoas}
                           onPressItem={pageParams => { 
                               this.props.navigation.navigate('PessoaDetail', pageParams); 
                           }} /> 
             </Container> 
            )
    }
} 

const styles = StyleSheet.create({
    Container:{
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',

    }

})

export default ListPessoas;