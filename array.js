// 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
let arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// es6
let result1 = Array.from(new Set(arr.flat(Infinity))).sort(function(a,b){return a-b})
console.log(result1)
// console.log(quchong(result1))
// function quchong(...arr){
//     console.log(arr)
//     return [...arr]
// }
// LRU  least recenyly used最近最久未使用

