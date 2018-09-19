
    import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
    import React from 'react';
    import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
    import LoginPage from './pages/LoginPage';
    import MainPage from './pages/MainPage';
    import LostPasswordPage from './pages/LostPasswordPage';
    import AuthLoadingScreen from './pages/AuthLoadingScreen'
    import Icon from 'react-native-vector-icons/Ionicons'
    import Drawer from './components/Drawer'
     
   
        const AuthStackNavigator = createStackNavigator({
            LoginPage: {
              screen: LoginPage,
              navigationOptions: {
                title: 'Login',
                headerStyle: {
                  backgroundColor: "#262626",
                  borderBottomWidth: 1,
                  borderBottomColor: '#c5c5c5',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 30, 
                }
              }
             
            }, 
          
        })
       
//CRIAR O HEADER
const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: MainPage,
    navigationOptions: ({ navigation }) => ({
      title: 'DashBoard',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} color={'white'}/>
            {console.log(navigation)}
          </View>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => null}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-power" size={24} color={'white'}/>
          </View>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#262626",
      },
      headerTitleStyle: {
        color: 'white',
    }
    })
  }
})


//MONTA O MENU LATERAL
const AppDrawerNavigator = createDrawerNavigator({
  Painel: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerIcon : ({tintColor}) => (
        <Icon name='md-podium' style={{fontSize:24, color:tintColor}}/>
      )
    }
  },
  Contatos : {
    screen: LostPasswordPage,
    navigationOptions: {
      drawerIcon : ({tintColor}) => (
        <Icon name='md-people' style={{fontSize:24, color:tintColor}}/>
      )
  }
},
  Atendimento : {
    screen: LostPasswordPage,
    navigationOptions: {
      drawerIcon : ({tintColor}) => (
        <Icon name='md-headset' style={{fontSize:24, color:tintColor}}/>
      )
  }
},
Agenda : {
  screen: LostPasswordPage,
  navigationOptions: {
    drawerIcon : ({tintColor}) => (
      <Icon name='md-calendar' style={{fontSize:24, color:tintColor}}/>
    )
}
},
Comunicação : {
  screen: LostPasswordPage,
  navigationOptions: {
    drawerIcon : ({tintColor}) => (
      <Icon name='md-megaphone' style={{fontSize:24, color:tintColor}}/>
    )
}
} 
}, {
  contentComponent: Drawer,
  contentOptions:{
    activeTintColor: '#2B87D0',
    activeBackgroundColor: '#262626',
    inactiveTintColor: 'white',
    inactiveBackgroundColor: 'transparent',
    
  }
})


export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})