//КРАНЫ
Valve = function(data,Build){
    this.Build = Build
    this.pin = data.pin
    this.init = data.init
    this.pulse = data.pulse
    this.pulseAll = data.pulseAll
    this.reley = data.reley
    this.releyPin = data.releyPin
    this.el = $("<td class='valves'></td>")

}

Valve.prototype.render = function(init){


    this.el_pin = $("<div></div>").text("pin: "+this.pin)
    this.el_init = $("<div></div>").text("Активность: "+this.init)
    this.el_pulse = $("<div></div>").text("Текущие импульсы: "+this.pulse)
    this.el_pulseAll = $("<div></div>").text("Всего импульсов: "+this.pulseAll)
    this.el_reley = $("<div></div>").text("РЕЛЕ: "+this.reley)
    this.el_releyPin = $("<div></div>").text("пин РЕЛЕ: "+this.releyPin)

    this.el_startValve = $("<button></button>").text("Запуск")
    this.el_startValve.on( "click", function() {
        if (confirm("Начать розлив?")){
            ws.send(JSON.stringify({
                startValve:{
                    pin:this.pin
                }
            }))
        }
    }.bind(this));
    this.el_animat = $("<div class='progress progress-striped'></div>")

   // this.el_animatDiv = $("<div style='width: "+sad+"%'  class='progress-bar progress-bar-info'></div>")
    var prs = Math.floor(this.pulse*100/OPTIONS.params.pulse)
    this.el_animatDiv = $("<div style='width: "+prs+"%'  class='progress-bar progress-bar-info'></div>")
    if (OPTIONS.params){

        //this.el_animatDiv.text(Math.floor(this.pulse*100/OPTIONS.params.pulse))
        //this.el_animatDiv.attr("style","width:"+Math.floor(this.pulse*100/OPTIONS.params.pulse)+"%")
        console.log("ssssss")
    }
    this.el_animat.append(this.el_animatDiv)
    this.el.append(this.el_animat)
    this.el.append(this.el_pin)
    this.el.append(this.el_init)
    this.el.append(this.el_pulse)
    this.el.append(this.el_pulseAll)
    this.el.append(this.el_reley)
    this.el.append(this.el_releyPin)
    this.el.append(this.el_startValve)


    if(init){
        $("#valvesContaner").append(this.el)
    }

}
Valve.prototype.change = function(data){
    this.el.html("")
    this.pin = data.pin
    this.init = data.init
    this.pulse = data.pulse
    this.pulseAll = data.pulseAll
    this.reley = data.reley
    this.releyPin = data.releyPin

    this.render(false)
}