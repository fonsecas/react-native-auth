import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = ({ label = "", content = "-" }) => {
	return (
		<View style={styles.line}>
			<Text style={[
				styles.cell,
				styles.label,
				label.length > 8 ? styles.longLabel : null
			]}>{ label }</Text>
			<Text style={[styles.cell, styles.content]}>{ content }</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	line: {
		flexDirection: 'row',
		paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        borderBottomWidth: 1, 
        borderColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',

	},
	cell: {
		fontSize: 18,
		paddingLeft: 5,

	},
	label: {
        fontWeight: 'bold',
        fontSize: 12,
		flex: 1
	},
	content: {
        flex: 3,
        fontSize: 15,
        color: '#B1A6AD'
        

	},
	longLabel: {
		fontSize: 12,
	}
});

export default Line;