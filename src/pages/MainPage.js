import React from 'react';
import { StyleSheet, View, Text, Image, Button, AsyncStorage} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons'

class MainPage extends React.Component {
    static navigationOptions ={
      drawerIcon : ({tintColor}) => (
        <Icon name='home' style={{fontSize:24, color:tintColor}}/>
      )
    } 
  constructor() {
    super()
    this.state = {
      user: "",
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

    render(){
        
        console.log(this.state.user)
         //const { user } = this.props;
         //const name = this.props.navigation.getParam(user);
         //const itemId = navigation.params; 
        // const { user } = navigation.state.params; 
        // const { people } = this.props.navigation.state.params;
        // console.log(people);  
         //console.log(navigation); 
        return(  
            <View style={styles.container}> 
            <Text>
                Bem Vindo 
            </Text>
            <Text>
                {this.state.user.pessoaNome}
            </Text>
           
             <Button title="Sing Out" onPress={this.signOutAsync}/>
        </View>
            )
    }
} 

export default MainPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})