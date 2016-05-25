'use strict';

let {height, width} = require('Dimensions').get('window');

/**
 * 判断当前系统是不是iOS
 * @return {Boolean} [description]
 */
export function isIOS() {
	return Platform.OS === "ios";
}

/**
 * 获取屏幕宽度
 * @return {[type]} [description]
 */
export function screenWidth() {
	return width;
}

/**
 * 获取屏幕高度
 * @return {[type]} [description]
 */
export function screenHeight() {
	return height;
}