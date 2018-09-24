import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Icon} from "native-base";

const ListaPessoasItem = props => {
   // console.log(props);
    const {  pessoa, navigateToPeopleDetail } = props; 
	return ( 
		<TouchableOpacity onPress={() => {
			navigateToPeopleDetail({ props }); 
		}}>
			<View style={styles.line}>
			   <Text style={styles.lineText}> {pessoa.nome}</Text>
               
                <View style={{paddingRight: 20}}>
                  <Icon name="arrow-forward" style={{color: '#c5c5c5'}} />
                </View>
				
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	line: {
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: "#bbb",

		alignItems: 'center',
		flexDirection: 'row',
	},
	lineText: {
		fontSize: 15,
		paddingLeft: 15,
		flex: 7
	},
	avatar: {
		aspectRatio: 1,
		flex: 1,

		marginLeft: 15,
		borderRadius: 50
	}
});

export default ListaPessoasItem;