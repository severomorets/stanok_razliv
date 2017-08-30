
module.exports.Pin = function(){
    

    
    for(var numPin in Pin){
        
        switch(Pin[numPin].type){
            case "D_OUT":
            console.log(numPin + "  "+Pin[numPin].val )
            Pin[numPin].pin = new five.Pin(numPin);
            Pin[numPin].val==0?Pin[numPin].pin.low():Pin[numPin].pin.high()
            break;
            case "D_OUT_R":
            console.log(numPin + "  "+Pin[numPin].val )
            Pin[numPin].pin = new five.Pin(numPin);
            Pin[numPin].val==1?Pin[numPin].pin.low():Pin[numPin].pin.high()
            break;
            
        }
    }


    
    
  return Pin;
}

var Pin = {
  31:{
    val:0,
    name:"IN RELAY -",
    type:"D_OUT"
  },
  32:{
    val:0,
    name:"IN RELAY +",
    type:"D_OUT"
  },
  33:{
    val:0,
    name:"Зажигание",
    type:"D_OUT_R",
    attr:"zazhiganie"
  },
  34:{
    val:0,
    name:"Запуск",
    type:"D_OUT_R",
    attr:"zapusk"
  },
  35:{
    val:0,
    name:"Габариты",
    type:"D_OUT_R",
    attr:"fari_0"
  },
  36:{
    val:0,
    name:"Ближний свет",
    type:"D_OUT_R",
    attr:"fari_1"
  },
  37:{
    val:0,
    name:"Дальний свет",
    type:"D_OUT_R",
    attr:"fari_2"
  },
  38:{
    val:0,
    name:"Поворотник влево",
    type:"D_OUT_R",
    attr:"povorot_0"
  },
  39:{
    val:0,
    name:"Поворотник вправо",
    type:"D_OUT_R",
    attr:"povorot_1"
  },
  40:{
    val:0,
    name:"Печка 1",
    type:"D_OUT_R",
    attr:"pechka_0"
  },
  41:{
    val:0,
    name:"Печка 2",
    type:"D_OUT_R",
    attr:"pechka_1"
  },
  42:{
    val:0,
    name:"Двери Закрыть",
    type:"D_OUT_R",
    attr:"dver_0"
  },
  43:{
    val:0,
    name:"Двери Открыть",
    type:"D_OUT_R",
    attr:"dver_1"
  },
  44:{
    val:0,
    name:"Противотуманки",
    type:"D_OUT_R",
    attr:"protivotum"
  },
  45:{
    val:0,
    name:"Сигнал",
    type:"D_OUT_R",
    attr:"signal"
  },
  46:{
    val:0,
    name:"Запуск",
    type:"D_OUT_R"
  },
  47:{
    val:0,
    name:"Запуск",
    type:"D_OUT_R"
  },
  48:{
    val:0,
    name:"Запуск",
    type:"D_OUT_R"
  }
  
  
  
}