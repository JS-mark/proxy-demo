// 订阅者，依赖收集
function Dep() {
	this.subs = []
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},
	notify: function() {
		this.subs.forEach(function(sub) {
			console.log('sub', sub)
			sub.update()
		})
	}
}
Dep.target = null
function hookObject(obj, key, value) {
	var dep = new Dep()
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function getter() {
			if (Dep.target) {
				dep.addSub(Dep.target)
			}
			return value
		},
		set: function setter(newVal) {
			if (newVal === value) {
				return
			}
			value = newVal
			dep.notify()
		}
	})
}
// 遍历对象的所有属性，并调用hookObject劫持对象的set get方法
function observable(obj) {
	if (!obj || typeof obj !== 'object') {
		return
	}
	let keys = Object.keys(obj)
	keys.forEach(key => {
		hookObject(obj, key, obj[key])
	})
	return obj
}
function Watcher(vm, exp, cb) {
	this.vm = vm
	this.exp = exp
	this.cb = cb
	this.value = this.get() // 将自己添加到订阅器的操作
}

Watcher.prototype = {
	update: function() {
		this.run()
	},
	run: function() {
		var value = this.vm.data[this.exp]
		var oldVal = this.value
		if (value !== oldVal) {
			this.value = value
			this.cb.call(this.vm, value, oldVal)
		}
	},
	get: function() {
		Dep.target = this // 全局变量 订阅者 赋值
		var value = this.vm.data[this.exp] // 强制执行监听器里的get函数
		Dep.target = null // 全局变量 订阅者 释放
		return value
	}
}

let person = observable({
	name: '11',
	age: 123
})
