const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const uri =
  "mongodb+srv://root:root@cluster0.9u3oi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {});

app.use("/", apiRoutes);

app.listen(7070, () => console.log("Example app listening on port 7070!"));
