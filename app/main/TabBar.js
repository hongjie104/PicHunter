'use strict';

import React, {
	StyleSheet, 
	View,
	Image
} from 'react-native';

export default class TabBar extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
		return (
			<View {...this.props} style={[styles.container, this.props.style]}>
				{this.props.children}
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: '#a31e22',
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 46,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	}
});
