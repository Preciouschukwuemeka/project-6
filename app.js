
/*** Creating and requiring variables and Dependencies. ***/

const express = require('express');                                             
const app = express();
const pug = require('pug');                                                      
const path = require('path');
const data = require('./data.json');





/*** Setting up Middleware ***/


// Setting view Engine to pug.
app.set('view engine', 'pug');




// Setting up static route
app.use('/static', express.static('public'));




// Index route
app.get("/", (req, res, next)=>{
    res.render('index', {projects: data.projects});
  })




// About route
app.get("/about", (req, res, next)=>{
    res.render('about');
  })

  


// Project route with ID param
app.get("/project/:id", (req, res, next)=>{
    const pro = parseInt(req.params.id);
    const project = data.projects[pro];
  
    // check if project page has valid ID else throw specific project page error
    if(Number.isInteger(pro) && pro < data.projects.length && pro >= 0){
      return res.render('project',{project});
    } else{
      let err = new Error("This project page doesn't exist");
      next(err);
    }
  })




// Starting server
app.listen(3000,  () => {
    console.log('The App is listening to port 3000')
   })

   


// Unspecific 404 error
app.use((req, res, next)=>{
    const err = new Error('Not found')
    next(err);
  });



  
// Print error page
app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.locals.error = err;
    err.status = 404;
    


  // Console Log
  console.error('Error message:', err.message, ', Error status:', err.status)



  // Error Page
  res.status(err.status);
  res.render('error');
});
