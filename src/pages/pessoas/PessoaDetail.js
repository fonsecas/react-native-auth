import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator} from 'react-native'; 
import Line from '../../components/util/Line'
import { connect } from 'react-redux';
import { getPessoaDetail } from '../../actions';
import {
    Container,
  Header,
  TabHeading,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Text,
  Body,
  Content,
  Card,
   CardItem

  } from "native-base";
  
class PessoaDetail extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      pessoa: {},
      fisica: {},
      unidade: {},
      pessoaRelacionada: {},
      sexo: {},
      estadoCivil: {},
      contatos: {},
      enderecos: {},
      tratamento: {},
      profissao: {},
      escolaridade: {},
      organizacao: {},
      isLoading: false
    } 
     


} 
componentDidMount(){
    const { pessoa } = this.props.navigation.state.params.props; 
    const {id} = pessoa
   this.props.getPessoaDetail(id)
   .then((pessoa) => {    
      // console.log(pessoa)
       let pessoaCompleta = pessoa[0];
       
       this.setState({pessoa : pessoaCompleta, 
                      fisica: pessoaCompleta.fisica,
                      sexo: pessoaCompleta.fisica.sexo ? pessoaCompleta.fisica.sexo : { nome: undefined},
                      estadoCivil: pessoaCompleta.fisica.estadoCivil ? pessoaCompleta.fisica.estadoCivil : {nome: undefined},
                      contatos: pessoaCompleta.contatos ? pessoaCompleta.contatos : {nome: undefined},
                      enderecos: pessoaCompleta.enderecos ? pessoaCompleta.enderecos : {nome: undefined},
                      unidade: pessoaCompleta.unidade ? pessoaCompleta.unidade : {nome: undefined},
                      pessoaRelacionada : pessoaCompleta.pessoaRelacionada ? pessoaCompleta.pessoaRelacionada : {nome: undefined},
                      tratamento: pessoaCompleta.tratamento ? pessoaCompleta.tratamento : {nome: undefined},
                      profissao: pessoaCompleta.fisica.profissao ? pessoaCompleta.fisica.profissao : {nome: undefined},
                      escolaridade: pessoaCompleta.fisica.escolaridade ? pessoaCompleta.fisica.escolaridade : {nome: undefined},
                      organizacao: pessoaCompleta.fisica.empregador ? pessoaCompleta.fisica.empregador : {nome: undefined},
                      isLoading: true})

   } )
}
    render(){ 
      if (!this.state.isLoading) {
        return ( <Container>
          <View style={{ backgroundColor: "#262626"}}>

                  <Header hasTabs  style={{ backgroundColor: "#262626", marginTop: 20}}>
                  <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                  </Button> 
                  </Left> 
                  <Body>
                  <Text style={{color: 'white'}}> Visualizar Pessoa</Text>
                  </Body>
                  </Header>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <ActivityIndicator />
                  </View>
                  </Container>
);
      }
        return(     
    <Container>
                   <View style={{ backgroundColor: "#262626"}}>

    <Header hasTabs  style={{ backgroundColor: "#262626", marginTop: 20}}>
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button> 
      </Left> 
      <Body>
        <Text style={{color: 'white'}}> Visualizar Pessoa</Text>
      </Body>
      <Right />
    </Header>
    </View>
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
            
                   <Image source={require('../../img/masculino.png')} style={{height: 100, width: 100, borderRadius: 60, marginTop: 10, marginBottom: 10}}/>
        
                   <Text>{this.state.pessoa.nome}</Text>  
                   <Text style={{fontSize: 10, marginBottom: 10}}>{this.state.fisica.apelido}</Text>
        </View>
    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#555555' }}>
      <Tab heading={<TabHeading style={{backgroundColor: '#F0F3F4'}}> 
                 <Text style={{color: '#555555'}}>Essencial</Text>
               </TabHeading>}>
        <Content padder style={{ marginTop: 0 }}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
             <Line label="Unidade:" content={this.state.unidade.nome} />
           <Line label="Pessoa Relacionada:" content={this.state.pessoaRelacionada.nome} />
           {this.state.contatos.map((item) => {
                 return (
                     <Line label={item.tipo.nome+":"} content={item.valor} key={item.id}/>
                 );
             })}
              </Body>
          </CardItem>
        </Card>
      </Content>
      </Tab>
      <Tab heading={<TabHeading style={{backgroundColor: '#F0F3F4'}}>
                 <Text style={{color: '#555555'}}>Pessoais</Text>
               </TabHeading>}>
               <Content padder style={{ marginTop: 0 }}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Line label="Sexo:" content={this.state.sexo.nome} />
            <Line label="Estado Civil:" content={this.state.estadoCivil.nome} />
            <Line label="Zona/Seção:" content={this.state.fisica.zona+"/"+this.state.fisica.secao} />
            <Line label="Naturalidade:" content={this.state.fisica.naturalidade+"-"+this.state.fisica.naturalidadeEstado} />
            <Line label="Pai:" content={this.state.fisica.nomePai} />
            <Line label="Mãe:" content={this.state.fisica.nomeMae} />
            {this.state.enderecos.map((item) => {
                 return (
                     <Line label={item.tipo.nome+":"} content={item.logradouro+", "+item.numero+", "+item.bairro+", "+item.complemento+", "+item.cep+", "+item.cidade+"-"+item.estado} key={item.id}/>
                 );
             })}

            </Body>
          </CardItem>
        </Card>
      </Content>
      </Tab>
      <Tab heading={<TabHeading style={{backgroundColor: '#F0F3F4'}}>
                 <Text style={{color: '#555555'}}>Profissionais</Text> 
               </TabHeading>}>
               <Content padder style={{ marginTop: 0 }}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Line label="Tratamento:" content={this.state.tratamento.nome} />
            <Line label="Profissão:" content={this.state.profissao.nome} />
            <Line label="Escolaridade:" content={this.state.escolaridade.nome} />
            <Line label="Organização:" content={this.state.organizacao.nome} />
            </Body>
          </CardItem>
        </Card>
      </Content>
      </Tab>
    </Tabs>
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

