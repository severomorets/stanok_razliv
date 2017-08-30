    var rMinus = 31
    var rPlus = 32
    var rZazhiganie = 33
    var rZapusk = 34
    var rFari = [35,36,37]
    var rPovorot = [38,39]
    var rPechka = [40,41]
    var rDveri = [42,43]
    var rProtivotum = 44
    var rSignal = 45

//инициализация реле
module.exports.initRelay = function(data){
    Pin[rMinus].pin.high()
    Pin[rPlus].pin.high()
    Pin[rMinus].val = 1
    Pin[rPlus].val = 1
}
module.exports.zazhiganie = function(data){
    
    if (Pin[rZazhiganie].val==0){
        Pin[rZazhiganie].pin.low()//ON!
        Pin[rZazhiganie].val = 1
    }
    else if (Pin[rZazhiganie].val==1){
        Pin[rZazhiganie].pin.high()//OFF!
        Pin[rZazhiganie].val = 0
        Pin[rZapusk].pin.high()//OFF!
        Pin[rZapusk].val = 0
    }
    
}
module.exports.zapusk = function(data){
    if (Pin[rZazhiganie].val==0){console.log("NOOOOOO");return;}
    if (Pin[rZapusk].val==0){
        Pin[rZapusk].pin.low()//ON!
        Pin[rZapusk].val = 1
    }
    else if (Pin[rZapusk].val==1){
        Pin[rZapusk].pin.high()//OFF!
        Pin[rZapusk].val = 0
    }
    
}
module.exports.fari = function(data){
    if (Pin[rFari[data.type]].val==0){
        Pin[rFari[data.type]].pin.low()//ON!
        Pin[rFari[data.type]].val = 1
    }
    else if (Pin[rFari[data.type]].val==1){
        Pin[rFari[data.type]].pin.high()//OFF!
        Pin[rFari[data.type]].val = 0
    }
    
}
module.exports.povorot = function(data){
    if (Pin[rPovorot[data.type]].val==0){
        Pin[rPovorot[data.type]].pin.low()//ON!
        Pin[rPovorot[data.type]].val = 1
    }
    else if (Pin[rPovorot[data.type]].val==1){
        Pin[rPovorot[data.type]].pin.high()//OFF!
        Pin[rPovorot[data.type]].val = 0
    }
}
module.exports.pechka = function(data){
    if (Pin[rPechka[data.type]].val==0){
        Pin[rPechka[data.type]].pin.low()//ON!
        Pin[rPechka[data.type]].val = 1
    }
    else if (Pin[rPechka[data.type]].val==1){
        Pin[rPechka[data.type]].pin.high()//OFF!
        Pin[rPechka[data.type]].val = 0
    }
}
module.exports.pechka = function(data){
    if (Pin[rPechka[data.type]].val==0){
        Pin[rPechka[data.type]].pin.low()//ON!
        Pin[rPechka[data.type]].val = 1
    }
    else if (Pin[rPechka[data.type]].val==1){
        Pin[rPechka[data.type]].pin.high()//OFF!
        Pin[rPechka[data.type]].val = 0
    }
}
module.exports.dver = function(data){
    if (Pin[rDveri[data.type]].val==0){
        Pin[rDveri[data.type]].pin.low()//ON!
        Pin[rDveri[data.type]].val = 1
    }
    else if (Pin[rDveri[data.type]].val==1){
        Pin[rDveri[data.type]].pin.high()//OFF!
        Pin[rDveri[data.type]].val = 0
    }
}
module.exports.protivotum = function(data){
    if (Pin[rProtivotum].val==0){
        Pin[rProtivotum].pin.low()//ON!
        Pin[rProtivotum].val = 1
    }
    else if (Pin[rProtivotum].val==1){
        Pin[rProtivotum].pin.high()//OFF!
        Pin[rProtivotum].val = 0
    }
    
}
module.exports.signal = function(data){
    if (Pin[rSignal].val==0){
        Pin[rSignal].pin.low()//ON!
        Pin[rSignal].val = 1
    }
    else if (Pin[rSignal].val==1){
        Pin[rSignal].pin.high()//OFF!
        Pin[rSignal].val = 0
    }
    
}