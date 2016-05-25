'use strict';

/**
 * 发送post请求
 * @param  {[string]}   url             api
 * @param  {[json]}     data            数据
 * @param  {[function]} successCallback 成功的回调
 * @param  {[function]} errorCallback   失败的回调
 */
export function post (url, data,successCallback, errorCallback = null) {
	// 在开发时才执行done逻辑，因为done的逻辑只是将异常抛出，在正式版的时候我们就不抛出异常了，因为正式版抛出异常了就会闪退
	if(__DEV__){
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				// 'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: JSON.stringify(data)
		}).then((response) => response.text())
			.then((responseText) => {
				successCallback(JSON.parse(responseText));
			})
			.catch(e => errorCallback && errorCallback(e))
			.done();
	}else{
		fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			// 'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		body: JSON.stringify(data)
	}).then((response) => response.text())
		.then((responseText) => {
			successCallback(JSON.parse(responseText));
		})
		.catch(e => errorCallback && errorCallback(e));
	}
}

/**
 * 发送get请求
 * @param  {[string]}   url             api
 * @param  {[function]} successCallback 成功时的回调
 * @param  {[function]} errorCallback   错误时的回调
 */
export function get (url, successCallback, errorCallback = null) {
	// 在开发时才执行done逻辑，因为done的逻辑只是将异常抛出，在正式版的时候我们就不抛出异常了，因为正式版抛出异常了就会闪退
	if(__DEV__){
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				// successCallback(JSON.parse(responseText));
				successCallback(responseText);
			})
			.catch(e => errorCallback && errorCallback(e))
			.done();
	}else{
		fetch(url)
		.then((response) => response.text())
		.then((responseText) => {
			// successCallback(JSON.parse(responseText));
			successCallback(responseText);
		})
		.catch(e => errorCallback && errorCallback(e));
	}
}