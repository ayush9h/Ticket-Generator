require("dotenv").config();  

const {server} = require("./src/app");
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
