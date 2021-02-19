Function.prototype.bind = Function.prototype.bind || function bind(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function');
    }
    var self = this;
    var args = [].slice.call(arguments, 1);
    var bound = function(){
        var boundArgs = [].slice.call(arguments);
        var finalArgs = args.concat(boundArgs);
        if(this instanceof bound){
            if(self.prototype){
                function Empty(){}
                Empty.prototype = self.prototype;
                bound.prototype = new Empty();
            }
            var result = self.apply(this, finalArgs);
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result;
            }
            return this;
        }
        else{
            return self.apply(thisArg, finalArgs);
        }
    };
    return bound;
}
// bind
Function.prototype.myNewBind = function(context,...param){
  if(typeof this !== 'function'){
    throw new TypeError('not funciton')
  }
  console.log(context,param)
  return function(){
    this.apply(context,param.concat(...arguments))
  }
}
Function.prototype.myNewCall = function(context,...param){
  if(typeof this !== 'function'){
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  const result = fn(...param)
  delete context.fn
  return result
}
// 实现一个call函数
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('not funciton')
    }
    context = context || window
    context.fn = this
    let arg = [...arguments].slice(1)
    let result = context.fn(...arg)
    delete context.fn
    return result
  } 
// 实现一个apply函数
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('not funciton')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
      result = context.fn()
    }
    delete context.fn
    return result
  }
// 实现一个bind函数
// 思路：类似call，但返回的是函数
Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    let _this = this
    let arg = [...arguments].slice(1)
    return function F() {
      // 处理函数使用new的情况
      if (this instanceof F) {
        return new _this(...arg, ...arguments)
      } else {
        return _this.apply(context, arg.concat(...arguments))
      }
    }
  }
//   instanceof的原理
// 思路：右边变量的原型存在于左边变量的原型链上
function instanceOf(left, right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while (true) {
      if (leftValue === null) {
        return false
      }
      if (leftValue === rightValue) {
        return true
      }
      leftValue = leftValue.__proto__
    }
  }
//   instanceof的原理
// 思路：将传入的对象作为原型
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
  }
//   new本质
function myNew (fn) {
  return function () {
      // 创建一个新对象且将其隐式原型指向构造函数原型
    let obj = {
      __proto__ : fn.prototype
    }
    // 执行构造函数
    fn.call(obj, ...arguments)
    // 返回该对象
    return obj
  }
}

function person(name, age) {
  this.name = name
  this.age = age
}
let obj = myNew(person)('chen', 18) // {name: "chen", age: 18}