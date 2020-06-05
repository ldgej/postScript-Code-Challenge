let express = require('express');

let app =express();


let data = {
   physicians:[
   {
    id:'10',
    name:"Krieger,Algernop",
    appointment:[
        {id:101,name:"Sterling Archer1",time:"8:00AM",Kind:"New Patient"},
        {id:102,name:"Cyril Figis1",    time:"8:30AM",Kind:"Follow-Up"},
        {id:103,name:"Ray Giliette1",   time:"9:00AM",Kind:"Follow-Up"},
        {id:104,name:"Lana Kane1",      time:"9:30AM",Kind:"New Patient"},
        {id:105,name:"Pam Poovey1",     time:"10:00AM",Kind:"New Patient"},
        ]
   },
   {
    id:'20',
    name:"Hibbert,Julius",
    appointment:[
        {id:201,name:"Sterling Archer222",time:"18:00AM",Kind:"New Patient"},
        {id:202,name:"Cyril Figis222",    time:"2:30PM",Kind:"Follow-Up"},
        {id:203,name:"Ray Giliette222",   time:"9:00PM",Kind:"Follow-Up"},
        {id:204,name:"Lana Kane222",      time:"19:30PM",Kind:"New Patient"}
        ]
   },
   {
    id:'30',
    name:"Riviera,Nick",
    appointment:[
        {id:301,name:"Sterling Archer3",time:"8:00AM",Kind:"New Patient"},
        {id:302,name:"Cyril Figis3",    time:"8:30AM",Kind:"Follow-Up"},
        {id:303,name:"Ray Giliette3",   time:"9:00AM",Kind:"Follow-Up"}
        ]
   }
   ]
}


const getPhyList=(data)=>{
      let arr=[];
      data.physicians.forEach((item) => {
         arr.push({id:item.id,name:item.name});
        //arr.push(item.name); 
      });
      return arr;
}

const getAppomListByPhyId=(data,phyid)=>{
    let arr=[];
    data.physicians.forEach((item) => {
      if(item.id==phyid){
          arr=[...item.appointment];
      } 
    });
    return arr;
}

const deleteAppomListById=(data,id)=>{  
   let arr=[];
   for(let i=0;i<data.physicians.length;i++){
        let appointment= data.physicians[i].appointment
        if(appointment.find(item=>item.id==id)){
            arr=[...appointment];
        }
     }
    console.log(arr.filter((item)=>{
        return item.id!=id
    }) )
}

//deleteAppomListById(data,102);

let api = '/api/user';

app.get('/api/getAll',(req,res)=>{
    res.send(data);
})

app.get('/api/user', (req, res) => {
    const arr=getPhyList(data);
    res.send(arr);
});


app.get('/api/user/:id',(req,res)=>{
    let phyid=req.params.id;
    const arr=getAppomListByPhyId(data,phyid);
    res.send(arr);
});

app.delete('/api/user/appointment/:id',(req,res)=>{
    let id=req.params.id;
    const arr=deleteAppomListById(data,id)
    res.send(arr);
})

var server = app.listen(8000, () => {

    console.log( `localhost:8000${api}`);

});

