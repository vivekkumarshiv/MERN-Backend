const http=require('http');
const host='localhost';
const port=9000;
const onreq=(req,res)=>{
    console.log('Got incoming request');
    console.log(req.method);

    if(req.method=='POST'){
        let body='';
        req.on('data',packet=>{
            body+=packet.toString();
        })

        req.on('end',()=>{
            console.log(body);
            res.end('Success');
        })

    }
    else{

    res.writeHead(200);
    res.end('I Have got ur request eren, on my way');
    }
}

const server=http.createServer(onreq);
const onRunning=()=>console.log('Server Running');

server.listen(port,host,onRunning);