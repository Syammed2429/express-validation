const port = 2924;

const app = require('./index');
const connect = require('./config/db');
const userController = require('./controller/user.controller');
app.use("/users", userController);

app.listen(port, async () => {
    await connect();
    console.log(`Listening on ${port}`);
});
