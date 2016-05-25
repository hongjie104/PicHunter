'use strict';

import React, {
	StyleSheet, 
	View,
	Image,
	ScrollView
} from 'react-native';

import Toolbar from '../components/Toolbar';
import {get} from '../net';
import {host} from '../config';
import {screenWidth} from '../utils';

export default class DetailScene extends React.Component {

	static propTypes = {
		img: React.PropTypes.object.isRequired,
	};

	constructor(props){
		super(props);

		this.state = {
			title: "",
			imgs: []
		};
	}

	componentDidMount() {
		get(this.props.img.pageUrl, (result) => {
			let imgs = [];
			let matches = result.match(/<img itemprop="thumbnail".*jpg"\/>/g);
			for (let i = 0; i < matches.length; i++) {
				let arr = matches[i].match(/\w+\s*=\s*"[\w:/\.]+/g);
				imgs[i] = {};
				for (let j = 0; j < arr.length; j++) {
					let a = arr[j].split(/\s?=\s?"/);
					if (a[0] === "src") {
						imgs[i].url = a[1];
					} else if (a[0] === "xw") {
						imgs[i].width = parseInt(a[1]);
					} else if (a[0] === "xh") {
						imgs[i].height = parseInt(a[1]);
					} else if (a[0] === "xof") {
						imgs[i].originalUrl = a[1];
					} else if (a[0] === "xow") {
						imgs[i].originalWidth = parseInt(a[1]);
					} else if (a[0] === "xoh") {
						imgs[i].originalHeight = parseInt(a[1]);
					}
				}
			}
			
			this.setState({
				title: result.match(/<h1>.*<\/h1>/)[0].replace("<h1>", "").replace("</h1>", ""),
				imgs: imgs
			});
		});
	}

	render() {
		let {title, imgs} = this.state;
		return (
			<View style={styles.container}>
				<Toolbar title={title}/>
				<ScrollView style={{flex: 1}}>
					{
						imgs.map((img, index) => {
							let height = screenWidth() / img.width * img.height;
							return(
								<Image key={`img${index}`} style={{width: screenWidth(), height: height}} source={{uri: img.url}}/>
							);
						})
					}
				</ScrollView>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
