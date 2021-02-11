const request = require('request');
const fs = require('fs').promises;
const { Blob } = require('buffer');



const args = process.argv.splice(2, 4);


request({
  method: 'GET',
  uri: args[0],
  
}, async function(error, response, body) {

  if (error) {
    return console.log("error");
  }
  if (response.statusCode === 200) {

    writeFile(body);
  } else {
    console.log("Failed to download file data.");
  }
  
  
});

const writeFile = async function(b) {
    
  try {

    const file = fs.writeFile(args[1], b, function(err) {
      if (err) return console.log(err);
     
    });

    setTimeout(readFile,1000);
    console.log(file);
  } catch (error) {
    console.log(error);
  }
    
};

    
const readFile = async function() {

  try {

    const read = await fs.readFile(args[1], (err, data) => {
      if (err) throw err;
      console.log(data);
    });

    const fileSize = new Blob([read]);

    console.log(`Downloaded and saved ${fileSize.size} bytes to ${args[1]}`);
    
  } catch (error) {
    console.log(error);
  }

};
   