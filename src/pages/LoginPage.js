import React from 'react';
import { View, TextInput, Text, StyleSheet, Button, ActivityIndicator, Alert, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { tryLogin } from '../actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            clientes: [],
            isLoading: false,
            isClienteAlfa: true,
        }
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        })
    }

    tryLogin() {
        this.setState({ isLoading: true })
        const { mail: email, password } = this.state;
        this.props.tryLogin({ email, password })
            .then((user) => {
                console.log(user); 
                if (user) {
                    if (user.clientes) {
                        const { clientes } = user;
                        this.setState({ isLoading: false })
                        return this.props.navigation.navigate('LoginPageAlfa', { clientes: clientes });
                    } else {
                        (async() => {
                            await AsyncStorage.setItem('3123123', JSON.stringify(user))})()
                        

                        return this.props.navigation.navigate('App', { user : user });

                        //this.props.navigation.navigate('App'});
                    }
                } else { 

                    this.setState({ isLoading: false })

                    Alert.alert(
                        'Dados Invalidos',
                        'Usuario ou Senha invalidos',
                        [
                            { text: 'Ok', onPress: () => '' },
                        ],
                        { cancelable: false }
                    )
                }
            })
    }


    tryLogout() {
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
            .then(() => this.setState({ isLoading: false }))
    }
    

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />

        return (
            <Button
                title="Entrar"
                onPress={() => this.tryLogin()} />
        )
    }

    renderButtonLogout() {
        return (<Button
            title="Sair"
            onPress={() => this.tryLogout()}
        />
        )
    }

    render() {
        (async() => {
            const userToken = await AsyncStorage.clear()})()
        return (

            <View style={styles.container}>
               
                <View style={styles.loginContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../img/logo.png')} />
                </View>

                <View style={styles.SectionStyle}>
                <Icon style={styles.iconStyle} name="user" size={30} color="#ddd"/>

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
                    
                <View style={styles.SectionStyle}>
                <Icon style={styles.iconStyle} name="lock" size={30} color="#ddd"/>
                     <TextInput
                        style={{ flex: 1,
                                color: '#98A6AD' }}
                        underlineColorAndroid='transparent'
                        placeholder="*******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                    
                </View>
                {this.renderButton()}
                 <View style={styles.buttonLogout}>
                    {this.renderButtonLogout()}
                </View> 
                <TouchableOpacity style={{ 
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    marginTop: 20}}
                    onPress={() => this.props.navigation.navigate('LostPasswordPage')}>

                <Text style={{color: '#58666e'}}>Esqueceu sua senha?</Text>

                </TouchableOpacity>
                    <Text style={{
                                marginTop: 120,
                                marginBottom: 50,
                                marginLeft: 50
                            }}>
                    Suíte de Gerenciamento Político 2018 ©
                    </Text>
            </View>
        )  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F0F3F4'
    },
    loginContainer: {
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',
        marginTop: 50

    },
    buttonLogout: {
        marginTop: 10,
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

export default connect(null, { tryLogin })(LoginPage)