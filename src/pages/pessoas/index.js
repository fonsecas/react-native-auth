import React from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons'
import Lista from '../../components/pessoas/Lista';
import { connect } from 'react-redux';
import { getLista } from '../../actions';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Text,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
  } from "native-base";
class ListListas extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
      user: "",
      lista: []
    }
    this.item = this.getItem('3123123')
  }

  async getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item).then(val => {
        this.setState({ user: JSON.parse(val) })
        return JSON.parse(val)
      });
      return value
    } catch (err) {
      throw err
    }
  }
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  componentDidMount(){
    this.props.getLista()
    .then((lista) => {
      this.setState({lista : lista})
        //console.log(user); 
    }) 
  }
  render(){
   const listas = this.state.lista;
   return( 
    <Container style={styles.container}>
    <View style={{ backgroundColor: "#262626"}}>
            <Header style={{ backgroundColor: "#262626", marginTop: 20}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer() }
            >
              <Icon name="md-menu" size={24} color={'white'}/>
            </Button>
          </Left>
          <Body>
            <Text style={{color: 'white'}}>Lista Pessoas</Text>
          </Body>
          
        </Header>
        </View>
       <Lista
                           clientes={listas}
                           onPressItem={pageParams => { 
                               this.props.navigation.navigate('ListPessoas', pageParams); 
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
}
})

export default connect(null, { getLista })(ListListas)