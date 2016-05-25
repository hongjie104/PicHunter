'use strict';

import React, {
	StyleSheet, 
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

export default class Tab extends React.Component{	

	static defaultProps = {
		selected: false,
	};

	constructor(props){
		super(props);
		this._onPress = this.onPress.bind(this);
	}

	render() {
		let {renderSelectedIcon, renderIcon, selected} = this.props;
		// let {selected} = this.state;
		return (
			<View style={styles.container}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this._onPress}
					style={styles.container}>
					{selected ? renderSelectedIcon() : renderIcon()}
				</TouchableOpacity>
			</View>
		);
	}

	onPress() {
		this.props.onPress();
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor:"transparent"
	}
});
