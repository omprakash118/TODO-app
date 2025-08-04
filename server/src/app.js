const express = require('express');
// dotenv.require()
const app = express();
const PORT = process.env.PORT || 8000 ;

app.get('/' , (req, res) => {
    res.send("Hello Om");
})

app.listen(PORT , () => {
    console.log(`Server is started at the PORT :- ${PORT}`);
});