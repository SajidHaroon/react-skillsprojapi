const config = require ('./utils/config')
const app = require ('./app')

// const PORT = process.env.PORT || 3030
//We can now use process.env.PORT from .env file. AND also after that config.PORT

app.listen(config.PORT, () => console.log(`Server is running at port ${config.PORT}`))