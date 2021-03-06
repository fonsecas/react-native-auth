import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';


const ClienteListItem = props => {
    const { people, navigateToPeopleDetail } = props; 
	return (
		<TouchableOpacity onPress={() => {
			navigateToPeopleDetail({ people }); 
		}}>
			<View style={styles.line}>
				<Image style={styles.avatar} source={{ uri: people.foto ? people.foto : 'https://s3.amazonaws.com/uploads-sgp/masculino.png' }} />
				<Text style={styles.lineText}> {people.nomeFantasia}</Text>
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
		fontSize: 20,
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

export default ClienteListItem;