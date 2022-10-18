const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pool.connect()
// .then((client) => {
//     client.query(query)
//         .then(res => {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         })
//         .catch(err => {
//             console.error(err);
//         });
// })
// .catch(err => {
//     console.error(err);
// });
// const query = "create table Users(id INTEGER NOT NULL,password varchar(30),email varchar(30),PRIMARY KEY (id));"
//const query = "CREATE TABLE Reflection (id INTEGER,success varchar(30),low_point varchar(30),take_away varchar(30),owner_id varchar(30),created_date date,modified_date date,PRIMARY KEY(id),CONSTRAINT fk_ReflectionFOREIGN KEY (id)REFERENCES Users (id));"
// const query = "select*from users"
app.use("/api/v1", router);
app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
