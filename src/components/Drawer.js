
    import {DrawerItems } from 'react-navigation';
    import React from 'react';
    import { StyleSheet, View,Text, SafeAreaView, ScrollView, Dimensions, Image, AsyncStorage } from 'react-native';

  class Drawer extends React.Component {
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
            <SafeAreaView style={{flex:1, backgroundColor: '#2E2E2E'}}>
      
          <View style={styles.conteinerImg}>
          <Image source={require('../img/masculino.png')} style={{height: 100, width: 100, borderRadius: 60}}/>
          <Text style={{marginTop: 5, marginBottom: 5, fontSize:20}}>{this.state.user.pessoaNome}</Text>
          </View>   
           <ScrollView>
            <DrawerItems {...this.props} style={styles.menuItens}/>        
        </ScrollView>
           </SafeAreaView>
            )
    }
} 
  export default Drawer;

  const styles = StyleSheet.create({
      conteinerImg: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c5c5c5',
        paddingTop: 30 
      },
      menuItens:{
        borderBottomColor: 'white',
        borderBottomWidth: 1

      },

    })