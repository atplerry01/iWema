var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var oracleConnector = require('./oracleConnector');


function StartServer(){

    const app = express();

    app.use(cors());
    app.options('*', cors());

    app.use(bodyParser.json({
        limit: '50mb'
    }));


    app.get('/', function(req, res){
       return res.status(200).json({
           post1: '/livedb',
           post2: '/drdb',
           post3: '/treasurydb'
       });
    })

    app.post('/livedb', function(req, res){

        var dbquery = req.body.dbquery;
        if(!dbquery){       
          return res.status(400).json({ err: 'Oracle query required!' });
        }

        oracleConnector.executeFinacleLiveQuery(dbquery).then(result=>{
            return res.status(200).json(result);
        }).catch(err => {
            return res.status(400).json({ err });
        });
    })

    app.post('/drdb', function(req, res){
       
        var dbquery = req.body.dbquery;

      if(!dbquery){       
        return res.status(400).json({ err: 'Oracle query required!' });
      }

        oracleConnector.executeFinacleDRQuery(dbquery).then(result=>{
            return res.status(200).json(result);
        }).catch(err => {
            return res.status(400).json({ err });
        });
    })


    app.post('/treasurydb', function(req, res){
       
        var dbquery = req.body.dbquery;

      if(!dbquery){       
        return res.status(400).json({ err: 'Oracle query required!' });
      }

        oracleConnector.executeWemaTreasuryQuery(dbquery).then(result=>{
            return res.status(200).json(result);
        }).catch(err => {
            return res.status(400).json({ err });
        });
    })

    // handle global exceptions
    process.on('uncaughtException', function (err) {
        console.error('global exception:', err.message);
    });
    process.on('unhandledRejection', function (reason, _promise) {
        console.error('unhandled promise rejection:', reason.message || reason);
    });


    const port =  80;
    app.listen( port, () => {
        console.log(`🚀 Oracle Connector Server Started  ready at http://localhost:${port} for REST APIs`);
    } );
    
    return app;
}

StartServer();