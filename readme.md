## GraphQl API with authentication with graphql-shield and prisma(mysql) starter 

> Install dev Dependency
   - ts-node-dev
   - @types/node
   - typescript
   - @types/express

> Install Dependency
   - express 
   - apollo-server-express 
   - apollo-server-core 
   - @graphql-tools/schema 
   - graphql-middleware 
   - graphql-shield 

___

```json
#login

query {
  login(email: "test@g.com", password: "12345") {
    id
    email
    password
    token
  }
}
```

```json
#signUp

mutation {
  signUp(inputUser: { email: "test6@g.com", password: "12345" }) {
    id
    email
    password
  }
}
```

```json
#logout

query {
  logout
}
```

```json
#private route

query{
  privateDate
}
```


<br/><br/>
___

>> Developed By milon27
* site : https://milon27.web.app
* gmail: mdjahidulislammilon@gmail.com
* phone: +8801646735359
