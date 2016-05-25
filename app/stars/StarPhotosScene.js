'use strict';

import React, {
	StyleSheet, 
	View
} from 'react-native';

import HomeScene from "../home/HomeScene";

import {host} from '../config';

export default class StarPhotosScene extends HomeScene {

	static propTypes = {
		star: React.PropTypes.object.isRequired,
		toolbarTitle: React.PropTypes.string,
		showBackBtn: React.PropTypes.bool
	};

	static defaultProps = {
		toolbarTitle: "Home",
		showBackBtn: true
	};

	constructor(props){
		super(props);
	}

	createURL(page) {
		let {star} = this.props;
		return `${star.href}/photos/${page}`;
	}
}
