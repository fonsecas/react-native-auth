
    import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
    import React from 'react';
    import LoginPage from './pages/login/LoginPage';
    import Painel from './pages/painel';
    import Pessoas from './pages/pessoas'
    import PessoaDetail from './pages/pessoas/PessoaDetail'
    import AuthLoadingScreen from './pages/login/AuthLoadingScreen'
    import ListPessoas from './pages/pessoas/ListPessoas'
    import SideBar from './components/sidebar'
   
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

const Drawer = createDrawerNavigator(
  {
    Painel: { screen: Painel},
    Pessoas : {screen: Pessoas}
  },
  {
    initialRouteName: "Painel",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    ListPessoas: {screen: ListPessoas},
    PessoaDetail: {screen: PessoaDetail}
  },
  {
    initialRouteName: "Drawer", 
    headerMode: "none"
  })

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppNavigator
})