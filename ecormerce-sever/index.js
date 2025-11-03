const express = require('express')
const PORT = 5000;
const app = express();
const authRoutes = require("./routes/auth.route")
const tickRouthes =require("./routes/products.routes")

app.use(express.json())

app.get('/',(req, res) => {
    console.log("Welcome to the page")
    res.send("Welcome to your homepage")
})

app.use('/auth', authRoutes)
app.use('/products', tickRouthes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})