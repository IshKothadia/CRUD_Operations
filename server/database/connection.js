const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        // mongo connection string
        const con = await mongoose.connect('mongodb+srv://admin:Ish011999@cluster0.z1p0zxq.mongodb.net/contacts?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${con.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;