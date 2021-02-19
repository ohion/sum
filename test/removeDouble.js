/*
*数组去重
*/
// 返回原数组
function setArr1(arr, map = new Map()) {
    let idx = arr.length - 1;
    while (idx >= 0) {
      if (map.get(arr[idx])) {
        arr.splice(idx, 1)
      } else {
        map.set(arr[idx], true)
      }
      idx--;
    }
    return arr
  }
//   原数组
  function setArr2(arr) {
    for(let i = 0;i<arr.length;i++){
      if(arr.indexOf(arr[i])!==i){
        arr.splice(i,1);
        i--
      }
    }
    return arr
  }
//   新数组
function setArr3(arr) {
    let result = []
    for(let i = 0;i<arr.length;i++){
      if(arr.indexOf(arr[i])>-1){
          result.push(arr[i])
      }
    }
    return result
  }
//   数组里是复杂类型
function setArr4(arr) {
    if (!arr) {
        return;
    }
    const map = new Map();
    const newArr = [];
    arr.forEach(item => {
        if (!map.has(item)) {
            if (typeof item === 'string' || typeof item === 'number') {
                map.set(item, item);
                newArr.push(item);
            } else if (!map.has(JSON.stringify(item))) {
                map.set(JSON.stringify(item), item);
                newArr.push(item);
            }
        }
    });
    return newArr;
}
function setArr5(arr) {
    if (!Array.isArray(arr)) {
      return []
    }
    const set = new Set(arr)
    return [...set]
  }
  
/*
动态表格
*/
/**
 * {"code":0,"msg":"成功","msgLog":"Success","timestamp":"2020-12-09 20:28:30","data":{"totalCountRow":1,"totalCountCol":2,"columnDetails":[{"index":0,"name":"adminbak","label":"adminbak","length":10,"scale":0,"type":4,"typeName":"INT"},{"index":1,"name":"adminback","label":"adminback","length":10,"scale":0,"type":4,"typeName":"INT"}],"data":[[1,2]]}}
 */
function handleData(){
    return new Promise(function(resolve,reject){
            // 请求接口
        post().then(res=>{
            // let res = {"code":0,"msg":"成功","msgLog":"Success","timestamp":"2020-12-09 20:28:30","data":{"totalCountRow":1,"totalCountCol":2,"columnDetails":[{"index":0,"name":"adminbak","label":"adminbak","length":10,"scale":0,"type":4,"typeName":"INT"},{"index":1,"name":"adminback","label":"adminback","length":10,"scale":0,"type":4,"typeName":"INT"}],"data":[[1,2],[1,2]]}}
            if(res.code==0){
                // let rows= res.data.totalCountRow   // 行
                // let cols = res.data.totalCountCol   // 列
                let datas = res.data.data
                let rows = datas.map((item,index)=>{
                    let col = item.map((c,i)=>{
                        return {
                            value:c,
                            ...res.data.columnDetails[i]
                        }
                    })
                    return {
                        col
                    }
                })
                resolve(rows)
            }else{
                alert(res.msgLog)
            }

        }).catch(err=>{
            console.log(err);
            alert("开小差了...")
        })
    })
}
handleData().then(res=>{
    console.log(res)
})
