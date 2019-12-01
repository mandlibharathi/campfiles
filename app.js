const express=require('express')
const fs=require('fs')
const path=require('path')
const multer=require('multer')
const bodyParser=require('body-parser')
const camp=require('./model/campdb')
const upload=require('./routers/upload')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static('./public'));
  app.get('/',(req,res)=>{
    res.render('index')
  })
app.post('/upload',(req,res)=>{
upload(req, res,(error) => {
  if(error){
    res.send(error)
  }else{
    if(req.file == undefined){
      
     res.send('sorry no files found')

    }else{
         
        /**
         * Create new record in mongoDB
         */
        var fullPath = req.file.filename;

        var document = {
          campName: req.body.campName,
          campDescription:req.body.campDescription,
          campImage:fullPath,
          campAmenities:req.body.campAmenities

        };

      var camp1 = new camp(document); 
      camp1.save(function(error){
        if(error){ 
          throw error;
        } 
        else{
         res.redirect('image')  
           
        }
        
        
     });
  }
}
});    
});
app.get('/image',(req,res)=>{
 camp.find((err,data)=>{
   if(err){throw err;}
   else
   res.render('imagefile',{records:data})
 })
     
})

app.listen(5000,
    ()=>
    console.log
    ('server is running on port')
    )