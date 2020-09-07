# TodoList base on GraphQL
主要以GraphQL為概念開發的TodoList. 使用此技術大幅減少擷取層狀資料複雜度


## 前端使用介面體驗 
[連結](https://react-todo-orcin.vercel.app/)
可自行SignUp帳號或是使用測試帳號(email: qwe@qwe.io password:qwe)後使用TodoList

![Project Look1](https://imgur.com/Tp8IJuw.png)



## 後端使用介面體驗 
[連結](https://prisma--deploy.herokuapp.com/)
後端為GraphQL介面,可以透過指令簡易擷取database層狀資料

![Project Look2](https://imgur.com/UC5N74n.png)


在畫面左側輸入以下指令
### Login:
```
mutation {
  login(
    email: "qwe@qwe.io"
    password: "qwe"
  ) {
    token
    user {
      id
      name
      posts{
        id
        title
      }
    }
  }
}
```

### 新增todo:

#### 1.將得到的token以下列型式貼到左下方Header

```
{ "Authorization": "Bearer __Token__ }
```

#### 2.將下列code貼到左側命令欄
```
mutation {
  upsertPost(
    postId:"0"
    title: "www.graphqlconf.org"
  ) {
    id
    titile
  }
}
```

### 刪除todo:
```
mutation {
  deletePost(
    postId:"__Id__" //自行輸入id
  ) {
    id
  }
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/) 
