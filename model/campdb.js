const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/camp', { useNewUrlParser: true })
const Schema=mongoose.Schema;
const campSchema=new Schema({
    
    campName:{
        type:String,
    },
    campDescription:{
        type:String
    },
    campImage:{
        type:String
    },
    campAmenities:{
        type:Array
    }
})


module.exports=mongoose.model('camp',campSchema)