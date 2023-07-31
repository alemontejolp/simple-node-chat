import app from "./app.js";
import cnf from "./cnf.js";

app.listen(cnf.port, () => {
  console.log('-----------------------------------------')
  console.log(`Server running on port: ${cnf.port}`)
  console.log('-----------------------------------------')
})
