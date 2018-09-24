import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native'; 
import ClienteList from '../../components/ClienteList';

class LoginPageAlfa extends React.Component {

    render(){
         const { navigation } = this.props;
         const { clientes } = navigation.state.params;
    //     const { people } = this.props.navigation.state.params;
       //   console.log(clientes);  
        return( 
            <View >
            <View  style={styles.loginContainer}> 
                    <Image
							style={styles.logo}
							source={require('../img/logo.png')} />
                            
            </View>
            <ClienteList
                                clientes={clientes}
                                onPressItem={pageParams => { 
                                    this.props.navigation.navigate('Main', pageParams); 
                                }} /> 
            </View> 
            )
    }
} 

const styles = StyleSheet.create({
    loginContainer:{
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',

    }

})

export default LoginPageAlfa;