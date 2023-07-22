const express= require('express');
const app= express();
app.use(express.json());
const fs= require('fs');
const rateLimit = require('express-rate-limit'); 
const https= require('https');
const validator = require('validator');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 requests
});

// Apply the rate limiter to all requests
app.use(limiter);

const checkURLValidity = async(req, res)=> {

  const encodedurl= req.query.host
  const url = decodeURIComponent(encodedurl)

  if (!url.startsWith('https://')) {
    res.status(400).send({'data':'Invalid URL. Please provide a valid HTTPS URL.'});
    return;
  }

  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'Node.js' // Some servers may require a User-Agent header
    },
    rejectUnauthorized: false
  };

  const request = https.request(url, options, (response) => {
    // Check if the response status code is 2xx, indicating a successful request
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.status(200).send({'data':'200'});
    } else {
      res.status(200).send({'data':'Not200'});
    }

    // Consume the response data to free up resources
    response.resume();
  });

  request.on('error', (error) => {
    res.status(500).send('Error: ' + error.message);
  });

  request.end();
}
app.get("/status",checkURLValidity);
// Example usage:
// const url = 'https://www.example.com';


//SSL
const getDaysBetween = (validFrom, validTo) => {
  return Math.round(Math.abs(+validFrom - +validTo) / 8.64e7);
};

const getDaysRemaining = (validFrom, validTo) => {
  const daysRemaining = getDaysBetween(validFrom, validTo);
  if (new Date(validTo).getTime() < new Date().getTime()) {
      return -daysRemaining;
  }
  return daysRemaining;
};

const getSSLCertificateInfo = host => {
  if(!validator.isFQDN(host)) {
      return Promise.reject(new Error('Invalid host.'));
  }
  const options = {
      agent: false,
      method: 'HEAD',
      port: 443,
      rejectUnauthorized: false,
      hostname: host
  };

  return new Promise((resolve, reject) => {
      try {
          const req = https.request(options, res => {
              const crt = res.connection.getPeerCertificate(),
                  vFrom = crt.valid_from, vTo = crt.valid_to;
              var validTo = new Date(vTo);
              resolve({
                  daysRemaining: getDaysRemaining(new Date(), validTo),
                  valid: res.socket.authorized || false,
                  validFrom: new Date(vFrom).toISOString(),
                  validTo: validTo.toISOString()
              });
          });
          req.on('error', reject);
          req.end();
      } catch (e) {
          reject(e);
      }
  });
};


const checkCertificateValidity = async (req,res) => {
  try {
    const encodedurl= req.query.host
    let host = decodeURIComponent(encodedurl)
    
    if(host.startsWith('https://')|| host.startsWith('http://')){
      host=host.split("://");
      host=host[1]  
    }
    
    let isValid = true;
    try {
    const response = await getSSLCertificateInfo(host);
    if(response.daysRemaining <= 0 || !response.valid) {
      isValid = false;
    }
    } catch(err)  {
      console.log(err)
      isValid = false;
    }  
      return res.status(200).send(isValid);
  
  } catch (error) {
    return res.status(400).send({"error":error});
  }
 };

app.get("/ssl",checkCertificateValidity)



//ReadFile
app.get('/readFile', (req, res) => {
    fs.readFile('./Robert.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading file');
      } else {
        res.status(200).send({'data':data});
      }
    });
  });




app.listen(5000, ()=>{
    console.log('listening to port 5000');
})
