const mongoose =  require('mongoose')


async function connectDb() {

    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log('mongodb connected')
}
module.exports =connectDb;