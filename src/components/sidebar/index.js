import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, AsyncStorage } from 'react-native';
import {
  Text,
  List,
  ListItem,
  Icon,
  Left,
} from "native-base";

 

const datas = [
  {
    name: "Painel",
    route: "Painel",
    icon: "home",
  },
  {
    name: "Pessoas",
    route: "Pessoas",
    icon: "users",
    bg: "#477EEA",
    types: "11"
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      user: ""
    };
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
  render() {

    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#2E2E2E'}}>
      
          <View style={styles.conteinerImg}>
          <Image source={require('../../img/masculino.png')} style={{height: 100, width: 100, borderRadius: 60}}/>
          <Text style={{marginTop: 5, marginBottom: 5, fontSize:20}}>{this.state.user.pessoaNome}</Text>
          </View>   
           <ScrollView>
           <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon type="FontAwesome"
                    active
                    name={data.icon}
                    style={{ color: "white", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />   
        </ScrollView>
           </SafeAreaView>
    );
  }
}

export default SideBar;
const styles = StyleSheet.create({
    conteinerImg: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      paddingTop: 30,
      paddingBottom: 20
    },
    menuItens:{
      borderBottomColor: 'white',
      borderBottomWidth: 1

    },
    text: {
        fontWeight: "400",
        fontSize: 16,
        marginLeft: 20,
        color: 'white'
      },

  })