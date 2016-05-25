'use strict';

import React, {
	StyleSheet, 
	View,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';

/**
 * 顶部工具栏
 */
export default class Toolbar extends React.Component{

	static propTypes = {
		title: React.PropTypes.string,
		showBackBtn: React.PropTypes.bool,
		curPage: React.PropTypes.number,
		onPrevPage: React.PropTypes.func,
		onNextPage: React.PropTypes.func,
	};

	static defaultProps = {
		title: "PicHunter",
		showBackBtn: true,
		curPage: -1
	};

	constructor(props){
		super(props);

		this.state = {
			curPage: props.curPage
		};
	}

	render() {
		let {showBackBtn, title} = this.props;
		let {curPage} = this.state;
		return (
			<View style={styles.container}>
				{
					// 标题
				}
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>
				{
					showBackBtn && (
						<TouchableOpacity style={styles.funcContainer} activeOpacity={0.8} onPress={() => this.onBack()}>
							<Image source={require('./imgs/button_fanhui.png')}/>
						</TouchableOpacity>
					)
				}
				{
					curPage > 0 && (
						<View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 6, bottom: 6,}}>
							<Text style={styles.text}>当前页:{curPage}</Text>
							<Text style={styles.text} onPress={() => this.onPrevPage()}>上一页</Text>
							<Text style={styles.text} onPress={() => this.onNextPage()}>下一页</Text>
						</View>
					)
				}
			</View>
		);
	}

	onBack() {
		global.nav.pop();
	}

	onPrevPage() {
		let {curPage} = this.state;
		if (curPage > 1) {
			this.setState({
				curPage: curPage - 1
			});
		}
		let {onPrevPage} = this.props;
		onPrevPage && onPrevPage(curPage - 1);
	}

	onNextPage() {
		let {curPage} = this.state;
		this.setState({
			curPage: curPage + 1
		});
		let {onNextPage} = this.props;
		onNextPage && onNextPage(curPage + 1);
	}
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: '#e74c3c',
		height: 66,
		flexDirection: 'row',
		alignItems: 'center',
	},
	funcContainer: {
		position: 'absolute',
		left: 0,
		width: 56,
		height: 66,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	title: {
		fontSize: 16,
		color: "rgb(255, 255, 255)",
		// marginTop: 16
	},
	text: {
		color: "#fff",
		fontSize: 10
	}
});
