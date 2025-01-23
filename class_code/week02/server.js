const http = require("http")
const app = http.createServer((req, res)=>{
//    console.log(req) //request
//    res.end("Hello") //response
if(req.url == "/"){
    res.end("Hello")
} else {
    res.end("Page not found")
}
}) //else if with req.url
app.listen(8000) //port

