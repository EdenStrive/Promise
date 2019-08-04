

#1.Callback！

首先来看看callback吧，想必一定很熟悉吧，回调地狱！但是我没怎么用过，一直都在用Promise和async，但是我在网上看callback的一些代码就觉得头大。下面大家看一下这些

我们很难一眼就看懂异步JavaScript，例如下面这段代码：


```javascript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
    
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            
          }.bind(this))
        }
      })
    })
  }
})
```
这个一堆以})结尾的金字塔，我们很亲切地称它为——“回调地狱”。十分难以维护而且可读性不高。

##2.Promise
* 既然见识了callback hell，我就来了解一下promise吧，可以解决掉这种回调地狱
    *  promise提供了then catch等语法糖
    *  promise是一个构造函数，它接受一个参数，这个参数是函数。并且传入两个参数：resolve 和 reject，分别表示执行成功后的回调和失败后的回调。准确的说是resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。我们直接来看它的用法吧。
* 编辑和预览`同步滚动`，所见即所得（右上角设置）

```javascript
 function asyncFunction() {
    if (1 === 1){
        return Promise.resolve("OK");
    }
    else{
        return Promise.reject(new Error("Wrong"));
    }
}


asyncFunction().then(function(val){
    console.log(val);
}).catch(function(err){
    console.error(err);
}) // ok

function runAsync(){
    var p = new Promise(
        function(resolve,reject){
            console.log('执行完成')
            resolve("获得的异步数据")
        }
    )
    return p
}
runAsync().then((data)=>{
    console.log(data)
})
console.log("异步之前") //执行完成 异步之前 获得的异步数据
```
在我们包装好的函数最后，会return出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。还记得Promise对象上有then、catch方法吧？这就是强大之处了。



* 当然！异步操作的能耐当然不止这么简单，如果这么简单callback完全是可以实现的。链式操作如下：

```javascript
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;            
}

runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
});// 异步任务1执行完成 数据1 异步任务2执行完成 数据2 异步任务3执行完成 数据3；
```

##在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了 ，catch方法也是如此就不作多解释了。

自己实现一个promise
