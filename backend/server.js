import { app } from "./index.js";
import { DbConnected } from "./index.js";

DbConnected();

app.listen(process.env.PORT, () => {
    console.log(`the app is running at port: ${process.env.PORT}`);

})
