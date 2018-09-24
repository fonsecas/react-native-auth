import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import ListaItem from './ListaItem';

const Lista = props => {
	const { clientes, onPressItem } = props;
    //console.log(props)
	return (
		<FlatList 
			style={styles.container}
			data={clientes} 
			renderItem={({ item }) => (
				<ListaItem 
					item={item}
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

export default Lista;