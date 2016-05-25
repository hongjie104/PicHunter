'use strict';

import React, {
	StyleSheet, 
	View,
	ListView,
	Text
} from 'react-native';

import Toolbar from '../components/Toolbar';
import Spinner from '../components/Spinner';
import StarsRow from "./StarsRow";

import {get} from '../net';
import {host} from '../config';
import {screenWidth} from '../utils';

export default class StarsScene extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			showLoading: false
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<View style={styles.container}>
				<Toolbar showBackBtn={false} title={"PornStars"} curPage={1} onNextPage={(p) => this.onNextPage(p)} onPrevPage={(p) => this.onPrevPage(p)}/>
				<ListView
					style={{flex: 1}}
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <StarsRow stars={rowData} />} />
				{
					this.state.showLoading && <Spinner />
				}
			</View>
		);
	}

	fetchData(page = 1) {
		this.setState({
			showLoading: true
		});
		get(`${host}/models/all/superstars/${page}`, (result) => {
			const stars = [];
			const matches = result.match(/<a class="thumb".*\s+data-width=.*\s+<img.*\s+<div class.*\s+<\/a>/g);
			for (let i = 0; i < matches.length; i++) {
				stars[i] = {};
				let arr = matches[i].match(/\w+="[\w:/\.]+/g);
				for (var j = 0; j < arr.length; j++) {
					let a = arr[j].split("=\"");
					if (a[0] === "href") {
						stars[i].href = `${host}${a[1]}`;
					} else if (a[0] === "width") {
						stars[i].width = parseInt(a[1]);
					} else if (a[0] === "height") {
						stars[i].height = parseInt(a[1]);
					} else if (a[0] === "src") {
						stars[i].url = a[1];
					} else if (a[0] === "alt") {
						stars[i].name = a[1];
					}
				}
			}

			const dataSource = [];
			while(stars.length > 3) {
				dataSource.push(stars.splice(0, 3));
			}
			if (stars.length > 0) {
				dataSource.push(stars);	
			}

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(dataSource),
				showLoading: false
			});
		});
	}

	onPrevPage(page) {
		this.fetchData(page);
	}

	onNextPage(page) {
		this.fetchData(page);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
