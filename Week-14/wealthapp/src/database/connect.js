const mongoose = require("mongoose")

//to connect mongoDB database with the application
const connectDB = async (url) => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URL, {
                //to avoid deprication warning
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useUnifiedTopology: true
            });
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err)
    }

}



module.exports = connectDB