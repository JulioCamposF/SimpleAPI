//primeira coisa a fazer é importar o fastify
import fastify from "fastify";

import cors from"@fastify/cors"



   // configuramos para dar alguns logs
const server= fastify({logger: true})

//aqui posso limitar quem pode acessar a minha api
server.register(cors, {
    //origin:["www.dio.me","www.julio.com"]
    origin:"*"
   // podemos tambem limitar qual metodo pode ser acessado methods:["GET"]
})




const teams=[ {
    id:1,name:"McLaren",base:"Woking ,United Kingdom"
},
{
    id:2,name:"Mercedes",base:"Brackley,United Kingdom"
},
{
    id:3,name:"Red Bull Racing",base:"Milton,United Kingdom"
}
]

const drivers=[
    {id:1,name:"Max Verstappen", team:"Red Bull Racing"},
    {id:2,name:"Lewis Hamilton", team:"Ferrari"}
]

// agora vamos listar as equipes de formula 1

server.get("/teams", async(request, response)=>{

    response.type("application/json").code(200);

    return {teams};
});

server.get("/drivers",async(request,response)=>{
    response.type("application/json").code(200);
    return{drivers};
});
//fiz um contrato para informara como quero receber 
interface DriverParams{
    id:string
}

//anexei a roto o contrato nesta camada de services
server.get<{Params:DriverParams}>("/drivers/:id", async (request,response)=>{
    const id=parseInt(request.params.id);
    const driver = drivers.find(dri=>dri.id===id);

    if(!driver){
        response.type("application/json").code(404);
        return{message:"Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return{driver};
}



})







server.listen({port:3333},()=>{
console.log("Server init");
});