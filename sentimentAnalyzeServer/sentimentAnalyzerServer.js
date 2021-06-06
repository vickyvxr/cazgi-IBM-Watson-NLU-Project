const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    console.log(' api key ', api_key);
    console.log('api url', api_url);
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}


app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
   const params = {
        url: req.query.url,
        features: {
            emotion:{},
            keywords: {
                emotion: true
            }
        }  
    };
    getNLUInstance().analyze(params)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        }
    );
});

app.get("/url/sentiment", (req,res) => {
    const params = {
        url: req.query.url,
        features: {
            sentiment:{},
            keywords: {
                sentiment: true
            }
        }  
    };
    
    getNLUInstance().analyze(params)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        }
    );
});

app.get("/text/emotion", (req,res) => {  
    const params = {
        text: req.query.text,
        features: {
            emotion:{},
            keywords: {
                emotion: true
            }
        }  
    };
    getNLUInstance().analyze(params)
        .then(analysisResults => {
        return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        }
    );
});

app.get("/text/sentiment", (req,res) => {
    const params = {
        text: req.query.text,
        features: {
            sentiment:{},
            keywords: {
                sentiment: true
            }
        }  
    };
    
     getNLUInstance().analyze(params)
        .then(analysisResults => {
        return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        }
    );
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

