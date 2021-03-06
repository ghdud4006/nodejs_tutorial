var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty=true;

app.set('views', './views');
app.set('view engine', 'jade');



app.get('/topic/new', function(req, res){
    res.render('new');
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, function(err){
        if(err){
            //만약 err num이 500(내부오류)이면 res.send실행
            // eg. 만약 'dataaa/'이런식이면 에러창 res send됌
            res.status(500).send('Internal Server Error');
        }
        res.send('Success'); 
    }); 
});

app.get('/topic', function(req, res){
    fs.readdir('data',function(err, files){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});
    });
});

app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        fs.readdir('data',function(err, files){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
        });
    });
});


app.listen(3000, function(){
    console.log('Connected, 3000 PORT!');
});
