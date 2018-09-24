import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import ListaPessoasItem from './ListaPessoasItem';

const ListaPessoas = props => {
	const { pessoas, onPressItem } = props;
    //console.log(props)
	return (
		<FlatList 
			style={styles.container} 
			data={pessoas} 
			renderItem={({ item }) => (
				<ListaPessoasItem 
					pessoa={item}
					navigateToPeopleDetail={onPressItem} />
			)} 
			keyExtractor={item => item.id.toString()} />
	);
}; 

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5'
	},
})

export default ListaPessoas;