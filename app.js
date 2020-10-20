//POSTMAN api check
//https://api.airtable.com/v0/appBNEJiCkm3eMGAv/Inventory
//WALKTHROUGH
//https://dev.to/rizkyrajitha/using-airtable-as-a-database-421d

const express = require("express");
const app = express();
const cors = require("cors");
const bp = require("body-parser");
const fetch = require("node-fetch");

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

const AIRTABLEAPI = 'keyHAWKch2gI7fMXn'; // import airtable api key 
const AIRTABLEBASEID = 'appBNEJiCkm3eMGAv';// import airtable base  id 
const AIRTABLETABLENAME = "Inventory"; // table name


const port = process.env.PORT || 5000;

app.get("/view", (req, res) => {
    //we need to send a "GET" request with our base id table name and our API key to get the existing data on our table.  
      fetch(
        `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}?view=Grid%20view`,
        {
          headers: { Authorization: `Bearer ${AIRTABLEAPI}` } // API key
        }
      )
        .then((res) => res.json())
        .then((result) => {
        //   console.log(result);
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    app.get("/viewItem/:id", (req, res) => {
        //we need to send a "GET" request with our base id table name and our API key to get the existing data on our table.  
          fetch(
            `https://api.airtable.com/v0/${AIRTABLEBASEID}/${AIRTABLETABLENAME}/${req.params.id}`,
            {
              headers: { Authorization: `Bearer ${AIRTABLEAPI}` } // API key
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log("result",result);
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        });


app.listen(port, () => {
  console.log("listning on " + port);
});
