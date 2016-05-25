'use strict';

import React, {
	StyleSheet, 
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	Text
} from 'react-native';

import StaticContainer from './StaticContainer';
import TabBar from './TabBar';
import Tab from './Tab';
import HomeScene from '../home/HomeScene';
import StarsScene from '../stars/StarsScene';

class SceneContainer extends React.Component {

	static propTypes = {
		...View.propTypes,
		selected: React.PropTypes.bool,
	};

	render() {
		let {selected, ...props} = this.props;
		return (
			<View
				{...props}
				pointerEvents={selected ? 'auto' : 'none'}
				removeClippedSubviews={!selected}
				style={[
					styles.sceneContainer,
					selected ? null : styles.hiddenSceneContainer,
					props.style,
				]}>
				<StaticContainer shouldUpdate={selected}>
					{this.props.children}
				</StaticContainer>
			</View>
		);
	}
}

/**
 * 主场景
 */
export default class MainScene extends React.Component{

	constructor(props){
		super(props);

		this.homePage = "home";
		this.starPage = "star";

		this.state = {
			leftImgs: [],
			rightImgs: [],
			curPage: this.homePage
		};

		this.page = 1;
		this.isLoadingMore = false;
		this.scrollProperties = {
			visibleLength: null,
			contentLength: null,
			offset: 0
		};
	}

	render() {
		let {curPage} = this.state;
		return(
			<View style={styles.container}>
				<SceneContainer selected={curPage === this.homePage}>
					<HomeScene />
				</SceneContainer>
				<SceneContainer selected={curPage === this.starPage}>
					<StarsScene />
				</SceneContainer>
				<TabBar>
					<Tab
						selected={curPage === this.homePage}
						renderIcon={() => <Image source={require('./imgs/home_normal.png')} />}
						renderSelectedIcon={() => <Image source={require('./imgs/home_selected.png')} />}
						onPress={() => this.changePage(this.homePage)}
					/>
					<Tab
						selected={curPage === this.starPage}
						renderIcon={() => <Image source={require('./imgs/star_normal.png')} />}
						renderSelectedIcon={() => <Image source={require('./imgs/star_selected.png')} />}
						onPress={() => this.changePage(this.starPage)}
					/>
				</TabBar>
			</View>
		);
	}

	changePage(nextPage) {
		if(this.state.curPage !== nextPage){
			this.setState({curPage: nextPage});
		}
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	sceneContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		paddingBottom: 60,
	},
	hiddenSceneContainer: {
		overflow: 'hidden',
		opacity: 0,
	},
});
