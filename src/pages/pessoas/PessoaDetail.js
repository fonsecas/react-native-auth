import React from 'react';
import { StyleSheet, View, Image} from 'react-native'; 
import { connect } from 'react-redux';
import Line from '../../components/util/Line'
import { getPessoaDetail } from '../../actions';
import {
    Container,
    Header,
    Button,
    Text,
    Label,
    Icon,
    Left,
    Right,
    Body,
    Separator,
    Content,

  } from "native-base";
  
class PessoaDetail extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
          pessoa: [],
          fisica: [],
          unidade: [],
          pessoaRelacionada: [],
          contatos: [],
        } 
        // const { pessoa } = this.props.navigation.state.params.props; 
        // const {id} = pessoa
        this.props.getPessoaDetail()
        .then((pessoa) => {  
            let pessoaCompleta = pessoa[0];
            this.setState({pessoa : pessoaCompleta, 
                        fisica: pessoaCompleta.fisica,
                        unidade: pessoaCompleta.unidade,
                        pessoaRelacionada : pessoaCompleta.pessoaRelacionada,
                        contatos: pessoaCompleta.contatos})
            //this.setState ( {fisica : this.state.pessoa.fisica})
          //  console.log(this.state.pessoa.fisica.apelido)

        } )
    

    } 
    
    render(){ 
        console.log(this.state.contatos)
        return(    
          <Container> 
          <View style={{ backgroundColor: "#262626"}}>
                  <Header style={{ backgroundColor: "#262626", marginTop: 20}}>
                <Left> 
                  <Button 
                    transparent
                    onPress={() => this.props.navigation.goBack() }
                  >
                    <Icon name="arrow-back" size={24} color={'white'}/>
                  </Button>
                </Left>
                <Body> 
                  <Text style={{color: 'white'}}>Visualizar Pessoa</Text>
                </Body>
                <Right />
              </Header>    
        </View>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f7'}}>
            
          <Image source={require('../../img/masculino.png')} style={{height: 100, width: 100, borderRadius: 60, marginTop: 10, marginBottom: 10}}/>

          <Text>{this.state.pessoa.nome}</Text>  
          <Text style={{fontSize: 10, marginBottom: 10}}>{this.state.fisica.apelido}</Text>
         </View> 
         <Content >
         <Separator bordered>
            <Text style={{fontSize: 15}}>Essenciais</Text>
          </Separator>  
          <Line label="Unidade:" content={this.state.unidade.nome} />
          <Line label="Pessoa Relacionada:" content={this.state.pessoaRelacionada.nome} />
          {/* <Line label="E-mail:" content={this.state.contatos.valor} /> */}
          {this.state.contatos.map((item) => {
                return (
                    <Line label={item.tipo.nome} content={item.valor} key={item.id}/>
                //    <Button style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Button>
                );
            })}

       </Content> 
      
             </Container>  
            ) 
    }
} 

const styles = StyleSheet.create({
    container:{
        paddingBottom: 20, 
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
      
    }
   

})

export default connect(null, { getPessoaDetail })(PessoaDetail)