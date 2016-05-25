'use strict';

import React, {
	StyleSheet, 
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import StarPhotosScene from './StarPhotosScene';

import {screenWidth} from '../utils';

const IMG_WIDTH = (screenWidth() - 4 * 2) / 3;
const IMG_HEIGHT = IMG_WIDTH / 18 * 24;

export default class StarCell extends React.Component{

	static propTypes = {
		star: React.PropTypes.object
	};

	constructor(props){
		super(props);
	}

	render() {
		let {star, style} = this.props;
		if (star) {
			return (
				<TouchableOpacity activeOpacity={0.8} onPress={()=>this.onPress()} style={[styles.container, style]}>
					<View style={{alignItems: 'center'}}>
						<Image style={{width: IMG_WIDTH, height: IMG_HEIGHT}} source={{uri: star.url}}/>
						<Text style={styles.name}>{star.name}</Text>
					</View>
				</TouchableOpacity>
			);
		}
		return(
			<View style={styles.container}></View>
		);
	}

	onPress() {
		let {star} = this.props;
		global.nav.push({Component: StarPhotosScene, star: star, toolbarTitle: star.name})
	}
}

let styles = StyleSheet.create({
	container: {
		width: IMG_WIDTH,
		marginTop: 1,
		marginBottom: 1,
	},
	name: {
		color: "#e74c3c"
	}
});
