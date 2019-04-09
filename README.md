# qiantai

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 第一天工作

打卡

## 第二天工作

打卡

## 第三天工作

登录页面完成，注册页面刚开始，明天写完登录注册逻辑

## 第五天工作

axios 的封装，promise 的理解，this 的加深理解,学会使用 JWT(JSON WITH TOKEN) vuex 的加深理解

## 第六天工作

登录注册页面前台+后台完成，学会了用 token 的方式 。

1.登录成功的时候接口返回 JWT 编码的一个 token 2.前端拿到 token 保存在 Localstorage 和 vuex 3.在 axios 封装的拦截器里面判断，如果访问那些接口就 header 加入一个 authorzation 属性，同时添加进 token 4.在 vue router 的生命周期的钩子函数里判断，如果 localstorage 没有 token 就返回登陆，如果有就发送一个请求去后台判断 token 5.后端拿出请求头的 authorzation 里面的 token 进行判断，是否过期，权限是什么，返回一个数据 6.前端拿到接口返回的数据进行判断然后路由跳转 7.选择自动登录，token 过期时间为 7 天,不选择 token 过期时间为 2 个小时

明天开始搭前台组件，1 搜索框一个组件 2 导航一个组件(3 导航下面的子组件选择框 4 选择的呈现框)
