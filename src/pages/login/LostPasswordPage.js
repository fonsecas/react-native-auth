import React from 'react';
import { View, TextInput, Text, StyleSheet, Button, ActivityIndicator, Alert, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
class LostPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            mail: '',
            isLoading: false,

        }
    }
    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        })
    }
    lostPassword() {
        if( this.state.mail == '') {
            Alert.alert(
                'Aviso',
                'Digite seu e-mail',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        } else{
            fetch('http://api.gerenciamentopolitico.com.br:8080/api/v1/usuarios/esqueceuSenha', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            emailCliente: this.state.mail 
            }),  
        }).then((response) => response.json())
            .then((responseJson) => { 

                Alert.alert(
                    'Aviso',
                    'Uma nova senha foi enviada para o e-mail informado.',
                    [
                      {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                    ],
                    { cancelable: false }
                  )
              // console.log(responseJson)
            })
             .catch((error) => {
                 console.error(error); 
             })
            
        }
    }
    renderButtonLostPassword() {
        if (this.state.isLoading)
            return <ActivityIndicator />

        return (
            <Button
                title="Enviar"
                onPress={() => this.lostPassword()} />
        )
    }
 
    render(){
    //      const { navigation } = this.props;
    //      const { clientes } = navigation.state.params;
    // //     const { people } = this.props.navigation.state.params;
    //    //   console.log(clientes);  
        return( 
            <View style={styles.container}>
            <View  style={styles.loginContainer}> 
                    <Image
							style={styles.logo}
							source={require('../img/logo.png')} />
                            
            </View>
            <Text style={{fontSize: 30, color: '#757575'}}>Insira seu e-mail:</Text>
            <View style={styles.SectionStyle}>
                <Icon style={styles.iconStyle} name="user" size={20} color="#ddd"/>

                     <TextInput
                        style={{ flex: 1,
                            color: '#98A6AD' }}
                        inlineImageLeft='search_icon'
                        underlineColorAndroid='transparent'
                        placeholder="usuario@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                     
                </View>
                { this.renderButtonLostPassword() }
            </View> 
            )
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        paddingLeft: 10,
        paddingRight: 10

    },
    loginContainer:{
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',

    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
        borderWidth: .5,
        borderColor: '#98A6AD',
        height: 40,
        borderRadius: 5 ,
        marginTop: 5,
        marginBottom: 5,

    },
     
    iconStyle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15, 
        marginRight: 15 
    },

})

export default LostPasswordPage;