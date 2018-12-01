const Koa = require('koa');
const app = new Koa();
console.log(app)

app.use(async(ctx,next)=>{
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>lalalalademaxiya</h1>'
})
app.listen(3000)
function Xwp(name,age){
    this.nam = name
    this.ag = age
    console.log(this)
    this.say = function(){
        console.log(this)
    }
}
var boy = new Xwp("邢文鹏",23)//同一个构造函数的对象实例之间无法共享属性和方法。为了解决构造函数的这个缺点，js提供了prototype属相来解决该问题。
// var p = new Promise(function(success,fail){
//     setInterval(function(){
//         console.log('执行完成')
//         success(boy.say())
//     },2000)
// })
// console.log(p);
console.log(boy.nam)
boy.say()//构造函数
function yibu(){
    var x = new Promise(function(s,f){
        console.log('执行了这个方法，同时向请求函数的对象传了了一个对象nmsl')
        s('nmsl')//这个地方也可以调用函数，如图上
    })
    return x
}
function yibu2(){
    var x = new Promise(function(s,f){
        console.log('执行了方法2')
        s('nmsl2')
    })
    return x
}

yibu().then(function(data){
    console.log(data)//这个地方调用了上面的这个方法
    return yibu2()
}).then(function(data){
    console.log(data)
    return "方法结束"
})
.catch(function(data){
    console.log('data',data)
})


function xx(callback){//一般的回调方式
    callback('zggssb')
}
xx(function(data){
    console.log(data) 
})

function getNumber(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;            
}
getNumber().then(//then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。等同于下面的catch写法
    function(data){
        console.log('resolved')
        console.log(data)
    },
    function(reason){
        console.log('rejected')
        console.log(reason)
    }
)
getNumber().then(
    function(data){
        console.log('resolved')
        console.log(data)
    }
).catch(//如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中
    function(reason){
        console.log(reason)
    }
)
Promise.all([yibu2(),yibu()])//Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。一个非常nice的功能
.then(function(result){
    console.log(result)
})

