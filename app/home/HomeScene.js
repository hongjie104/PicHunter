'use strict';

import React, {
	StyleSheet, 
	View,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';

import Toolbar from '../components/Toolbar';
import Spinner from '../components/Spinner';
import DetailScene from '../detail/DetailScene';

import {get} from '../net';
import {host} from '../config';
import {screenWidth} from '../utils';

export default class HomeScene extends React.Component{

	static propTypes = {
		toolbarTitle: React.PropTypes.string,
		showBackBtn: React.PropTypes.bool,
	};

	static defaultProps = {
		toolbarTitle: "Home",
		showBackBtn: false
	};

	constructor(props){
		super(props);

		this.state = {
			leftImgs: [],
			rightImgs: [],
			showLoading: false
		};

		this.page = 1;
		this.isLoadingMore = false;
		this.scrollProperties = {
			visibleLength: null,
			contentLength: null,
			offset: 0
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		let {leftImgs, rightImgs, showLoading} = this.state;
		let {toolbarTitle, showBackBtn} = this.props;
		return (
			<View style={styles.container}>
				<Toolbar showBackBtn={showBackBtn} title={toolbarTitle}/>
				<ScrollView ref="ScrollView" onScroll={(e)=>this.onScroll(e)}>
					<View style={{flexDirection: 'row', flex:1}}>
						<View style={{flex: 1}}>
							{this.renderItem(leftImgs, true)}
						</View>
						<View style={{flex: 1}}>
							{this.renderItem(rightImgs, false)}
						</View>
					</View>
				</ScrollView>
				{showLoading && <Spinner />}
			</View>
		);
	}

	renderItem(imgs, isLeft) {
		return(
			imgs.map((img, index) => {
				return(
					<TouchableOpacity key={`img${index}`} style={[{padding: 4, paddingTop: 1, paddingBottom: 1}, {paddingRight: isLeft ? 2 : 4, paddingLeft: isLeft ? 4 : 2}]} activeOpacity={0.8} onPress={()=>this.onPress(img)}>
						<Image style={{width: img.showWidth, height: img.showHeight}} source={{uri: img.url}}/>
					</TouchableOpacity>
				);
			})
		);
	}

	createURL(page) {
		return `${host}/hp/${page}`;
	}

	fetchData(page = 1) {
		this.setState({
			showLoading: true
		});
		get(this.createURL(page), (result) => {
			const matches = result.match(/<a class="thumb".*\s+data-width=.*\s+(<span class="hd">HD<\/span>)?\s+<img.*\s+<\/a>/g);
			const keyValReg = /\w+="[\w/:\.]+/g;
			let keyVal = null;
			let arr = null;
			const imgs = [];
			for (let i = 0; i < matches.length; i++) {
				imgs[i] = {};
				keyVal = matches[i].match(keyValReg);
				for (let j = 0; j < keyVal.length; j++) {
					arr = keyVal[j].split("=");
					if (arr[0] === "href") {
						imgs[i].pageUrl = `${host}${arr[1].replace('"', "")}`;
					} else if(arr[0] === "width") {
						imgs[i].width = parseInt(arr[1].replace('"', ""));
					} else if(arr[0] === "height") {
						imgs[i].height = parseInt(arr[1].replace('"', ""));
					} else if(arr[0] === "src") {
						imgs[i].url = arr[1].replace('"', "");
					}
				}
			}
			let showWidth = (screenWidth() - 8) / 2;
			for(let i = 0; i < imgs.length; i++) {
				imgs[i].showWidth = showWidth;
				imgs[i].showHeight = imgs[i].height * (showWidth / imgs[i].width);
			}
			imgs.sort(function (s1, s2) {
				let x = s1.showHeight;
				let y = s2.showHeight;
				if (x < y) {
					return 1;
				}
				if (x > y) {
					return -1;
				}
				return 0;
			});

			let leftArr = new Array(imgs.length);
			let rightArr = new Array(imgs.length);
			leftArr.fill({showHeight: 0});
			rightArr.fill({showHeight: 0});
			leftArr[0] = imgs[0];
			rightArr[0] = imgs[1];
			let heightA = 0;
			let heightB = 0;
			for (let i = 0; i < imgs.length - 2; i++) {
				heightA += leftArr[i].showHeight;
				heightB += rightArr[i].showHeight;
				if (heightA > heightB) {
					rightArr[i + 1] = imgs[i + 2];
				} else {
					leftArr[i + 1] = imgs[i + 2];
				}
			}
			this.setState({
				leftImgs: this.state.leftImgs.concat(leftArr),
				rightImgs: this.state.rightImgs.concat(rightArr),
				showLoading: false
			}, () => {this.isLoadingMore = false;});
		});
	}

	loadMore(){
		this.page = this.page + 1;
		this.isLoadingMore = true;
		this.fetchData(this.page);
	}

	onPress(img) {
		global.nav.push({Component: DetailScene, img: img});
	}

	onScroll(e){
		this.scrollProperties.visibleLength = e.nativeEvent.layoutMeasurement['height'];
		this.scrollProperties.contentLength = e.nativeEvent.contentSize['height'];
		this.scrollProperties.offset = e.nativeEvent.contentOffset['y'];

		if (!this.isLoadingMore) {
			if (this.getDistanceFromEnd(this.scrollProperties) < 5) {
				this.loadMore();
			}
		}
	}

	getDistanceFromEnd(scrollProperties){
		let maxLength = Math.max (
			scrollProperties.contentLength,
			scrollProperties.visibleLength
		);
		return maxLength - scrollProperties.visibleLength - scrollProperties.offset;
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
