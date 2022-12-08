import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  
  app.get( "/filteredimage", async ( req, res ) => {
    console.log('heeeeeeeeeeeereeeeeeeee');

    let { image_url } = req.query;
    console.log(image_url);

    if(image_url){
      let filteredUrl:string = await filterImageFromURL(image_url) as string;
      console.log(filteredUrl);
      res.sendFile(filteredUrl, err => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
      }
      let files: string[] = [];
      files.push(filteredUrl);
      deleteLocalFiles(files);
      });
    }
    else{
      res.status(500).send("Invalid image URL");
    }
  } );
  
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  
  
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();