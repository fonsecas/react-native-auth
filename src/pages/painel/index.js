import React from 'react';
import {View, Text, AsyncStorage} from 'react-native'; 
import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { connect } from 'react-redux';
import { getLista } from '../../actions';
class MainPage extends React.Component {
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
    

      fetch('http://api.gerenciamentopolitico.com.br:8080/api/v1/auth/logout', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      }).then((response) => response.json())
          .then((responseJson) => {
              return console.log(responseJson);
          })
          .catch((error) => {
              console.error(error);
          })
          this.props.navigation.navigate('Auth');
  };
  render(){
   const listas = this.state.lista;
   return( 
    <Container>
      <View style={{paddingTop: 20,  backgroundColor: "#2E2E2E" }}>
    <Header
          style={{ backgroundColor: "#2E2E2E",}}
          androidStatusBarColor="#c5c5c5"
          iosBarStyle="light-content"
        >
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon name="ios-menu" />
        </Button>
      </Left>
      <Body >
        <Text  style={{color: 'white'}}>DashBoard</Text>
      </Body>
      <Right>
            <Button transparent onPress={() => this.signOutAsync()}>
              <Icon name="power" />
            </Button>
          </Right>
    </Header>
    </View>

    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Content goes here</Text></View>
  </Container>
       )
}
} 

export default connect(null, { getLista })(MainPage)