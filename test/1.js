let arr = [
    {
        key:1,   // id
        children:[  //  sub
            {   
                // parentID:1,
                key:1,  // id
                children:[  // sub
                    {

                        
                    }
                ]
            }
        ]
    }
]

function change(arr){
    let a = []
    arr.map(p => {
        let sub = []
        if(p.children){
            sub = p.children.map(c=>{
                return {
                    parentID:p.key,
                    id:c.key,
                    sub:c.children
                }
            })
            change(sub)
        }
        a.push({
            id:p.key,
            sub,
            parentID:p.parentID
        })
    })
    return a
}
console.log(change(arr))

// fetch
// axios timeout
function request(api,timeout=5000){
    let result = api
    setTimeout(function(){
        if(!result){
            return Promise.reject("超时")
        }
    },timeout)
    let mypromise = new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve("1")
        },5000)
    })
    Promise.race([mypromise,api]).then(res=>{
        
    })
}

// 函数柯里化
function curry(func){
    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this,args)
        }else{
            return function(...args2){
                return curried.apply(this,args.concat(args2))
            }
        }
    }
}
function myFunction(a,b,c){
    return a + b + c
}
let a1 = curry(myFunction)
let a2 = a1(2)
let a3 = a2(3)
let a4 = a3(4)
console.log(a1,a2,a3,a4)

