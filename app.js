
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |** `.
//                       / \\||| : |||** \
//                     / _||||| -:- |||||- \
//                       | | \\\ - **/ | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='  
//  
//         .............................................  
//                  佛祖保佑             永无BUG
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？

'use strict';

import React, {
	StyleSheet,
	View,
	Text,
	BackAndroid,
	Navigator
} from 'react-native';

import toast from 'react-native-toast';
import MainScene from './app/main/MainScene';

// android上上一次按下返回键的时间
let backTime = 0;

export default class PicHunter extends React.Component {

	/**
	 * 构造函数
	 */
	constructor(props) {
		super(props);
		this._onBack = this.onBack.bind(this);

		// this.state = {
		// 	isInited: false
		// };
	}

	/**
	 * 加载界面时
	 */
	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this._onBack);
		this.setState({isInited: true});
	}

	/**
	 * 卸载界面时
	 */
	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this._onBack);
	}

	/**
	 * android上返回键的逻辑处理
	 */
	onBack() {
		let nav = global.nav;
		const routers = nav ? nav.getCurrentRoutes() : null;
		if (routers && routers.length > 1) {
			nav.pop();
			return true;
		}
		const now = new Date().getTime();
		if(now - backTime < 3000){
			return false;
		}
		backTime = now;
		toast.showShortBottom("再按一次退出");
		return true;
	}

	render() {		
		return (
			<Navigator
				initialRoute={{
					// 注意，这里的Component的首字母C要大写，要大写，要大写
					Component: MainScene
				}}
				configureScene={() => Navigator.SceneConfigs.FloatFromRight}
				renderScene={this.renderScene.bind(this)} 
			/>
		);
	}

	/**
	 * 根据导航路由器渲染场景
	 * @param  {Object} router    路由
	 * @param  {Object} navigator 导航
	 */
	renderScene(router, navigator) {
		global.nav = navigator;
		let {Component} = router;
		return <Component {...router}/>;
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1
	}
});