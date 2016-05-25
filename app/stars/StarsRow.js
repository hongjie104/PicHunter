'use strict';

import React, {
	StyleSheet, 
	View,
	Text
} from 'react-native';

import StarCell from './StarCell';

export default class StarsRow extends React.Component{

	static propTypes = {
		stars: React.PropTypes.array,
	};

	constructor(props){
		super(props);
	}

	render() {
		let {stars} = this.props;
		return (
			<View style={styles.container}>
				<StarCell star={stars[0]} style={{marginLeft: 2}} />
 				<StarCell star={stars[1]} style={{marginLeft: 2, marginRight: 2,}} />
 				<StarCell star={stars[2]} style={{marginRight: 2}} />
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	}
});
