function* fib(max){
    var a = 0 , b = 1, n = 0;
    while (n<max){
        //当yield返回值的时候为false,不再返回的时候才为true
        yield a;//此时a不停的在发生变化,a返回回去,b的值赋给了a
        [a,b] = [b,a + b];
        n++;
    }
    return;
}
let f = fib(5)
console.log(f)
//想打印对应的值可以使用for of
for(var x of fib(10)){
    console.log(x)
}//[ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

