const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const chart_creator = require("./src/create_charts.js");
const fs = require("fs");
const host_data = require("./host.json")

const host = host_data["host"];
//const host = '139.91.71.18';
const port = host_data["port"];
const url = "http://" + host + ":" + port

var server = app.listen(port, host, function () {
  console.log("Example app listening at http://%s:%s", host, port);
});

app.use(express.json());

// Custom middleware function to modify a JavaScript file
function modifyJavaScriptFile(req, res, next) {
  if (req.url.endsWith(".js")) {
    const filePath = path.join(__dirname, "frontend", req.url);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return next(err);
      }

      // Replace the placeholders with the actual values
      const modifiedData = data.replace("{MAIN_URL}", url);
      res.type("text/javascript").send(modifiedData);
    });
  } else {
    next();
  }
}


// Use the custom middleware function to serve the directory
app.use(modifyJavaScriptFile);
app.use(express.static(path.join(__dirname, "frontend")));

// sendFile will go here
app.get("/", function (req, res) {
  const index = path.join(__dirname, "frontend/views", "first_screen.html");
  res.sendFile(index);
});
app.get("/custom_build", function (req, res) {
  const index = path.join(__dirname, "frontend/views", "custom_build.html");
  res.sendFile(index);
});
app.get("/prebuild_interfaces", function (req, res) {
  const index = path.join(
    __dirname,
    "frontend/views",
    "prebuild_interfaces.html"
  );
  res.sendFile(index);
});

app.post("/custom_build_endpoint", function (req, res) {
  //response_obj= JSON.parse(JSON.stringify(req.body))
  response_obj = req.body;
  //response_obj=JSON.parse(req.body)
  chart_creator.make_chart(response_obj, res);
  //console.log(response_obj);
  //res.send(response_obj);
});

app.post("/prebuild_interface_endpoint", function (req, res) {
  //console.log("Got a POST request for the homepage");
  //res.send('you want a prebuild interface \n');
  response_obj = req.body;
  chart_creator.make_chart(response_obj, res);
});
