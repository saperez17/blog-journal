const express = require('express')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var postRouter = require('./routes/post')



//MongoDB Connection
// mongoose.connect('mongodb+srv://admin-santiago:admin-santiago@cluster0.neqzd.mongodb.net/todoDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('public'))
//Add route modules to the middleware chain
app.use(indexRouter)
app.use(postRouter)




let PORT = process.env.PORT;

if (PORT==null || PORT==""){
    PORT=8000;
}

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})


process.on('SIGINT', () => {
    console.log('Bye bye!')
    mongoose.connection.close(() => {
          process.exit(0);
      });
});
