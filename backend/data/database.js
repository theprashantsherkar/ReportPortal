import mongoose from "mongoose";

export const ConnectDB = () => {
    mongoose.connect("mongodb://localhost:27017", { dbName: "admin" })
        .then(() => {
            console.log('Database connected.'.bgBlue.black)
        }).catch((err) => {
            console.log(err)
        })
}



