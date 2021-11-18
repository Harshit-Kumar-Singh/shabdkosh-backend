const {MongoClient} = require('mongodb');
let url = "";
if(process.env.ISHEROKU){
    url = "something.com";
}
else{
    url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
}
let database=new MongoClient(url);
async function connectToDataBase() {
    
    try{
        await database.connect();
        console.log('database connected...');
    }
    catch(e){
        console.log('Failed to connect to database...')
    }

}
connectToDataBase();
let Len = 1; 
async function searchInDatabase(givenWord) {
    let result = await database.db('dictionaryDatabase').collection('description').find({word:givenWord}).toArray();
    if(result.length ==0){
        Len = 0
    }
    else Len = 1;
    console.log(result);
    return result;
}

async function insertInDatabase(my_data) {
    console.log('Inside Insert Function');
    my_data = my_data + "";
    my_data = JSON.parse(my_data);
    my_word = my_data[0].word;
    console.log(my_word);
    let arr = await searchInDatabase(my_word)
    // console.log(arr.length);
    if(Len==0){
        Len = 1;
        let myObj = {
            word:my_word,
            des:my_data
        }
        database.db('dictionaryDatabase').collection('description').insertOne(myObj,(err,res)=>{
            if(err){
                console.log("Error Occured..");
            }
            else{
                console.log('1 document Inserted...')
            }
        })
        
    
    }
}
// database.db('dictionaryDatabase').collection('description').deleteMany({})

module.exports =  {insertInDatabase,searchInDatabase};