import { app } from "./index.js";
import { ConnectDB } from "./data/database.js";
import colors from 'colors';

ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`the app is running at port: ${process.env.PORT}`.black.bgMagenta);

})
