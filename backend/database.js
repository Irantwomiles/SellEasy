const mongoose = require('mongoose')

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.yhfxu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : MONGO_URL, { useNewUrlParser: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

function databaseConnection() {

    mongoose.connection
    .once('open', () => {
        console.log("Connected");
    })
    .on('error', (error) => {
        console.log("[ERROR]", error);
    });

}

databaseConnection()