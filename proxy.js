// 实现一个call
let obj = {
	value: 1,
	say() {
		console.log(this.value)
	}
}
function SSS(name, age) {
	console.log(name)
	console.log(age)
	console.log(this.value)
}
Function.prototype.call2 = function(content = window) {
	content.fn = this
	let args = [...arguments].slice(1)
	let res = content.fn(...args)
	delete content.fn
	return res
}
// 提示视图需要更新
function trigger() {
	console.log('视图需要更新')
}
function isObject(param) {
	return typeof param === 'object' && param !== null
}
/* 返回一个被代理后的结果，通过操作这个结果可以来实现响应式, 例如视图更新 */
function reactive(target) {
	// 如果是个对象，则返回被代理后的结果，如果不是则直接返回
	if (!isObject(target)) {
		return target
	}

	// 需要定义一个代理对象来对 target 进行代理操作
	// 这个对象主要有两个方法，即 get 和 set
	const handler = {
		get(target, key, receiver) {
			return Reflect.get(target, key, receiver) // 相当于 return target[key]
		},
		set(target, key, value, receiver) {
			trigger()
			return Reflect.set(target, key, value, receiver) // 相当于 target[key] = value
		}
	}

	// 利用 Proxy 来代理这个对象属性
	let observed = new Proxy(target, handler)

	return observed
}
