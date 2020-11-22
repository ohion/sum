// 链表
// 单链表
function Node(element){
    this.element = element
    this.next = null
}
function SingleLink(){
    // let node = new Node()
    let head = null
    let length = 0
    this.get = function(){
        return head
    }
    this.size = function(){
        return length
    }
    this.push = function(element){
        let n = new Node(element)
        let p = head
        if(!head){
            head = n
            length++
        }else{
            while(p.next){
                p = p.next
            }
            p.next = n
            length++
        }
    }
    // 查找
    this.search = function(element){
        if(head==null){
            return false
        }
        if(head.next==null){
            return head.element == element
        }else{
            let p = head
            while(p.next){
                if(p.element == element){
                    return true
                }
                p = p.next
            }
            return false
        }
    }
    this.insert = function(position,element){
        let node = new Node(element)
        let p = head
        let index = 0
        console.log(p)
        if(position >= 0 && position<=length){
            if(!p){  // 没有头节点
                head = node
                length++
                return
            }else{  // 进行遍历
                while(p){
                    index++
                    if(index==position){
                        let nextNode = p.next
                        p.next = node
                        node.next = nextNode
                        length++
                        break
                    }
                    p = p.next
                }
            }   
        }

    }
    this.remove = function(element){
        let prev = curr = head
        while(curr){
            if(curr.element == element){
                curr = curr.next
                prev.next = curr
                length--
                break
            }else{
                prev = curr
                curr = curr.next
            }
        }
    }
}
let list = new SingleLink()
// for (let index = 0; index < 5; index++) {
//     list.push(index)
// }
// list.push(1)
// list.insert(1,5)
// list.insert(2,9)
// list.remove(1)
// console.log(list.get())   
// console.log(list.size())
// 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
function concatLink(l1,l2){
    if(l1 === null) {
        return l2
    }
    if(l2 === null) {
        return l1
    }
    if(l1.val <= l2.val) {
        l1.next = concatLink(l1.next, l2)
        return l1
    } else {
        l2.next = concatLink(l2.next, l1)
        return l2
    }
}
let list1 = new SingleLink()
let list2 = new SingleLink()
for (let index = 0; index < 5; index++) {
    if(index%2!==0){
        list1.push(index)
    }else{
        list2.push(index)
    }
}
console.log(list1.get())
console.log(list2.get())
const concatResult = concatLink(list1.get(),list2.get())
console.log(concatResult)