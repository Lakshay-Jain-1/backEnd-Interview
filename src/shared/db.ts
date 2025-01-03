import mongoose from "mongoose";


async function Connection() {
    try {
        const databaselink:string=process.env.DATABASEURL
        await mongoose.connect(databaselink)
        console.log("database is connected")
    } catch (err) {
        console.log(err,"database is not connected")
    }
}

export default Connection

