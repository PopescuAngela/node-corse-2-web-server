const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');


// Middleware of how server works
app.use((req, respose, next) =>{
    var now = new Date().toString();
    var log = `${req.method}  ${req.url}- ${now} \n` ;
    fs.appendFile('server.log', log, (error)=>{
        if(error){
            console.log('Cannot add to log!');
        }
    });
     next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
//without next() the page is blocked
// app.use((req, resp, next)=> {
//     resp.render('mentenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
    // response.send('<h1>Hello express!</h1>');
    // response.send({
    //     name:'Angela',
    //     likes: ['flowers', 'sports']
    // });

    response.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage: 'Welcome message'
    });
});

app.get('/about', (req, response) => {
    response.render('about.hbs', {
        pageTitle : 'About Page'
    });
});

app.get('/bad', (req, response) =>{
    response.send({
        error : {
            message : 'Error',
            status: 'Failed'
        }
    });
});

// app.get('/mentenance', (req, response) =>{
//     response.render('mentenace.hbs', {
//         pageTitle : 'Mentenance Page',
//         menenanceMessage: 'This page is unavailalble'
//     });
// });

app.listen(port, () =>{
    console.log(`Server is running on port ${port}!`);
});