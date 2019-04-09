### Server for chat application

This chat application available at [HERE ](http://35.240.157.180:3000)

> demo account:

> ```
> username: admin
> password: Admin123
> ```
>
> ```
> username: admin1
> password: Admin123
> ```

#### Setup:

1. Install all dependencies
   `npm i`
2. Create file development.js in path **./config/env/development.js** to store environment variables in development stage.

```js
module.exports = {
  mysql: {
    host: "localhost",
    port: 3306,
    database: "dbname",
    username: "root",
    password: ""
  },
  jwt: {
    jwtSecret: "dolabimat",
    jwtDuration: "2 hours"
  }
};
```

3. Run server (default is localhost:8000)
   `npm start`

4. Test
   `npm test`

#### Available API:

- **POST** localhost:8000/users : create new user.
  request body

```json
{
  "username": "admin",
  "password": "Admin123"
}
```

- **GET** localhost:8000/users : get list user.

- **GET** localhost:8000/users/{username} : check if username exists.

- **POST** localhost:8000/auths : authentication for user to get jwt token.
  request body

```json
{
  "username": "admin",
  "password": "Admin123"
}
```

- **GET** localhost:8000/chats/{username-of-your-friend} : get conversation between users.

- **POST** localhost:8000/chats/{username-of-your-friend} : create new message.
  request body

```json
{
  "message": "bi mat chinh la bi mat"
}
```
