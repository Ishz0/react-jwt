const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://Ishkat:Ishan123@cluster0.7qjrt.mongodb.net/crudjwt?retryWrites=true&w=majority')
    .then(() => {
        console.log("DB Connetion Successfull");
      })
    .catch((err) => {
        console.log(err.message);
      });