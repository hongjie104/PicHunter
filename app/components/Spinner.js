'use strict';

import React from 'react-native';
import ColorPropType from 'ColorPropType';

import SpinnerOverlay from 'react-native-loading-spinner-overlay';

/**
 * 一直在转的圈圈
 */
export default class Spinner extends React.Component{

	static propTypes = {
		size: React.PropTypes.oneOf(['small', 'large']),
		color: ColorPropType,
		overlayColor: ColorPropType,
		visible: React.PropTypes.bool,
	};

	static defaultProps = {
		size: 'large',
		color: '#e74c3c',
		overlayColor: 'rgba(0, 0, 0, 0)',
		visible: true
	};

	constructor(props){
		super(props);
	}

	render() {
		return (
			<SpinnerOverlay {...this.props} />
		);
	}
}
