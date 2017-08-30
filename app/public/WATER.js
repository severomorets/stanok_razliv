//ЖИДКОСТИ
startProcess = function(cranID,waterID){

    if ($('.cranListSelectSize[cran='+cranID+']')){
            $('.startProcess[dir='+cranID+']').hide()
            $('.stopProcess[dir='+cranID+']').show()
        var maxpulse = WATER[waterID].size[$('.cranListSelectSize[cran='+cranID+']').val()].pulse
        ws.send(JSON.stringify({
            startProcess:{
                cranID:cranID,
                waterID:waterID,
                maxpulse:maxpulse
            }
        }))


    }
}
stopProcess = function(cranID,waterID){
    $('.startProcess[dir='+cranID+']').show()
    $('.stopProcess[dir='+cranID+']').hide()
    ws.send(JSON.stringify({
        stopProcess:{
            cranID:cranID,


        }
    }))
}
resetPulse = function (_id){

    ws.send(JSON.stringify({
        resetPulse:{
            _id:_id,

        }
    }))
}
createWATER = function(name){
    ws.send(JSON.stringify({
        createWATER:{
            name:name
        }
    }))
    console.log(name)
}
startWATER = function(_id){
    cranListInit(WATER[_id])
    $('.WATERright').hide()
    $('#startWATER').show()
    $('.waterListInit').removeClass('listAct')
    $('.waterListInit[dir='+_id+']').addClass('listAct')
    changeWATER(WATER[_id])

    console.log(_id)
}

saveCalibration = function(){
    var CRAN_id = $($('.activCranID')[0]).text()
    var WATER_id = $($('.waterIDActive')[0]).text()
    var Size_i = parseInt($('#calibrationWATERSize').val())

    console.log("CRAN_id",CRAN_id)
    console.log("WATER_id",WATER_id)
    console.log("Size_i",Size_i)
    console.log("CRANPULSE",CRAN[CRAN_id].pulse)
    console.log(WATER[WATER_id])
    WATER[WATER_id].size[Size_i].pulse = CRAN[CRAN_id].pulse
    ws.send(JSON.stringify({
        saveRedWATER:WATER[WATER_id]
    }))
    changeWATER(WATER[WATER_id])
    initWaterList(WATER[WATER_id])

}

resetActivPulse = function(){
    var _id = $('.activCranID').text()
    console.log(_id)
    ws.send(JSON.stringify({
        resetActivPulse:{
            _id:_id
        }
    }))
}
calibrationCRANinit = function(_id){

    $('#calibrationBlock').show()
    $('.activCranID').text(_id)
    $('.activCranPulse').text(CRAN[_id].pulse)
    $('.activCranPulse').addClass('pulseCran')
    $('.activCranPulse').attr('dir',_id)

}
initCalibration = function(val){
    var size = $('#calibrationWATERSize').val()
    var cran = $('#calibrationCRANselect').val()
    if (!cran){alert('Выберите кран для калибровки');return;}
    ws.send(JSON.stringify({
        togleCran:{
            _id:cran,
            RELE:val
        }
    }))
    console.log(cran)

}


saveRedWATER = function(_id){
    WATER[_id].name = $('#redactWATERName').val()
    var sizes = []
    for(var i=0;i<$('.redactWaterSize').length;i++){
        sizes.push({
            size:parseInt($($('.redactWaterSize')[i]).val()),
            pulse:parseInt($($('.redactWaterPulse')[i]).val())
        })
   }
    WATER[_id].size = sizes
    ws.send(JSON.stringify({
        saveRedWATER:WATER[_id]
    }))
    changeWATER(WATER[_id])
    initWaterList(WATER[_id])

}
deleteSizeWATER = function(i,_id){
    WATER[_id].size.splice(i,1)
    redactWATER(_id)
    ws.send(JSON.stringify({
        saveRedWATER:WATER[_id]
    }))
    changeWATER(WATER[_id])
    initWaterList(WATER[_id])
}
addsizeWATER = function(_id){
    WATER[_id].size.push({
        size:0,
        pulse:0
    })
    redactWATER(_id)
    changeWATER(WATER[_id])
}
redactWATER = function(_id){
    $('.WATERright').hide()
    $('#redactWATER').show()
    $('.waterListInit').removeClass('listAct')
    $('.waterListInit[dir='+_id+']').addClass('listAct')
    changeWATER(WATER[_id])
    $('#redactWATERName').val(WATER[_id].name)
    $('.activeWATER').attr('dir',_id)
    var sizes = ''
    for(var i=0;i<WATER[_id].size.length;i++){
        sizes+=`
        
          <div class="input-group ">
            <span class="input-group-addon">мл.</span>
            <input type="number" class="form-control redactWaterSize" value="`+WATER[_id].size[i].size+`">
    
            <span class="input-group-addon">имп.</span>
            <input type="number" class="form-control redactWaterPulse" value="`+WATER[_id].size[i].pulse+`">
            <span class="input-group-btn">
              <button class="btn btn-danger" type="button" onclick="deleteSizeWATER(`+i+`,'`+_id+`')">удалить</button>
            </span>
          </div>
          
        `
    }
    sizes+=`
   
`
    $('#watersizeID').html(sizes)
}
calibrationWATER = function(_id){
    $('#calibrationBlock').hide()
    $('.WATERright').hide()
    $('#calibrationWATER').show()

    $('.waterListInit').removeClass('listAct')
    $('.waterListInit[dir='+_id+']').addClass('listAct')
    $('.waterIDActive').text(_id)
    changeWATER(WATER[_id])
    var sizes = ''
    for(var i=0;i<WATER[_id].size.length;i++){
        sizes+='<option value="'+i+'">'+WATER[_id].size[i].size+'</option>'
    }
    $('#calibrationWATERSize').html(sizes)
    var crans = '<option selected disabled>Выберите кран</option>'
    for(var key in CRAN){
        crans+='<option value="'+CRAN[key]._id+'">'+CRAN[key].pin+'</option>'
    }
    $('#calibrationCRANselect').html(crans)


}
function initWaterList(water){

    // Math.floor(this.pulse*100/OPTIONS.params.pulse)
    var size = ""
    for(var i=0;i<water.size.length;i++){
        size+=`<div><span class="label label-primary " ><span class="waterSize_`+i+`" dir="`+water._id+`">`+water.size[i].size+`</span>мл.</span><span class="label label-default "><span class="waterPulse_`+i+`"  dir="`+water._id+`">`+water.size[i].pulse+`</span>имп.</span></div>`
    }
    var str = `
            
                <div class="col-lg-3"><h4 class="waterName" dir="`+water._id+`">`+water.name+`</h4></div>
                <div class="col-lg-2">`+size+`</div>
                <div class="col-lg-7">
                 <div class="btn-group">
                    <a href="#" class="btn btn-primary" onclick="redactWATER('`+water._id+`')">редактировать</a>
                    <a href="#" class="btn btn-info" onclick="calibrationWATER('`+water._id+`')">калибровать</a>
                    <a href="#" class="btn btn-warning" onclick="startWATER('`+water._id+`')">Разлить</a>
                 </div>
                </div>
                
         
            
            `
    $('.waterListInit[dir='+water._id+']').html(str)
}
waterListInit = function(){

    $("#waterList").html("")
    for(var _id in WATER){
        var str = '<li class="waterListInit list-group-item" dir="'+_id+'"></li>'
        $("#waterList").append(str)
        initWaterList(WATER[_id])
    }

}
function initCranList(cran,water){

    // Math.floor(cran.pulse*100/OPTIONS.params.pulse)
    var size = ""
    for(var i=0;i<water.size.length;i++){
        size+=`<option value="`+i+`">`+water.size[i].size+`</option>`
    }


    $(".pulseCran[dir="+cran._id+"]").text(cran.pulse)
    var str = `
            
                
                <table style="width: 100%;height: 100%">
                    <tr>
                        <td>
                            <span class="label label-default">pin</span>&nbsp;<span class="label label-info">`+cran.pin+`</span><br>
                            <span class="label label-default">releyPin</span>&nbsp;<span class="label label-info">`+cran.releyPin+`</span><br>
                            <span class="label label-default">_id</span>&nbsp;<span class="label label-info">`+cran._id+`</span><br>
                            <span class="label label-default">pulse</span>&nbsp;<span class="label label-info pulseCran" dir="`+cran._id+`">`+cran.pulse+`</span><br>
                            <span class="label label-default">pulseAll</span>&nbsp;<span class="label label-info pulseAllCran"  dir="`+cran._id+`">`+cran.pulseAll+`</span><br>
                            <span class="label label-default">reley</span>&nbsp;<span class="label label-info releyCran"  dir="`+cran._id+`">`+cran.reley+`</span>
                        </td>
                        <td>
                            <div>
                            <label class="control-label">Объем тары для текущего крана</label>
                        <select class="form-control cranListSelectSize" water="`+water._id+`" cran="`+cran._id+`">`+size+`</select>
                        </div>
                        <div>
                           <a href="#" class="btn btn-info" onclick="resetPulse('`+cran._id+`')" >сбросить счетчик</a>
                        </div>
                        </td>
                        <td rowspan="2" class="btn-success startProcess" dir="`+cran._id+`"  onclick="startProcess('`+cran._id+`','`+water._id+`')">
                            START
                        </td>
                        <td rowspan="2" class="btn-danger stopProcess" dir="`+cran._id+`"  onclick="stopProcess('`+cran._id+`','`+water._id+`')">
                            STOP
                        </td>
                    </tr>
                    <tr ><td colspan="2" style="position: relative;height: 20px;background-color: #FFF">
                    <div class="progress" water="`+water._id+`" cran="`+cran._id+`"></div>
                    <div class="progress-text" water="`+water._id+`" cran="`+cran._id+`">0%</div>
                    </td></tr>
                </table>

                
         
            
            `
    $('.cranListInit[dir='+cran._id+']').html(str)
}
cranListInit = function(water){
    var sizeActiv = ""
    for(var i=0;i<water.size.length;i++){
        sizeActiv+=`<option value="`+i+`">`+water.size[i].size+`</option>`
    }
    $("#waterSizeActive").html(sizeActiv)
    $("#CranListBlock").html("")
    for(var _id in CRAN){
        if (!CRAN[_id].init){continue}
        var str = '<div class="cranListInit" dir="'+_id+'"></div>'
        $("#CranListBlock").append(str)
        initCranList(CRAN[_id],water)
        if (CRAN[_id].reley){
            $('.startProcess[dir='+_id+']').hide()
            $('.stopProcess[dir='+_id+']').show()
        }else{
            $('.startProcess[dir='+_id+']').show()
            $('.stopProcess[dir='+_id+']').hide()
        }


    }




}

initSizeAllCran =function(i){
    $(".cranListSelectSize [value="+i+"]").attr("selected", "selected");

}


/*
Build = function(data) {

    this.id = data.id
    this.name = data.name
    this.size = data.size
    this.pulse = data.pulse
    this.el = $("<div class='builds row' attr='"+this.id+"'></div>")



}
function deleteBuild(id){

    if (confirm("Удалить?")){
        $(".builds[attr="+id+"]").remove()
        delete Builds[id]
        ws.send(JSON.stringify({
            deleteBuild:{
                id:id
            }
        }))
    }
}
function calibratBuild(id){

}
function initBuild(id){
    if (confirm("Инициализация Тары?")){
        console.log(Builds[id])
        OPTIONS.params = Builds[id];
        OPTIONS.render(Builds[id])
        ws.send(JSON.stringify({
            setBuild:id
        }))
        for(var k in Valves){
            Valves[k].el.html("")

            Valves[k].render(false)
        }
        $(".crans").show()
    }
}
Build.prototype.render = function(init){
    var calibration = ""
    if (this.pulse==0){
        calibration = `<span class="label label-danger">Не откалибровано</span>`
    }
    this.el_html = `
    <div class="col-lg-4">
        <h3>`+this.name+`</h3>`+calibration+`
        <div class="text-muted"><small>Объем мл.:<span class="badge">`+this.size+`</span></small></div>
        <div class="text-success"><small>Импульсов.:<span class="badge" >`+this.pulse + `</span></small></div>
    </div>
    <div class="col-lg-2" style="padding: 5px">
    <a href="#" class="btn btn-danger" onclick="deleteBuild('`+this.id+`')">Удалить</a>
    
    <a href="#" class="btn btn-primary" onclick="calibratBuild('`+this.id+`')">Калибровка</a>
    <a href="#" class="btn btn-primary" onclick="initBuild('`+this.id+`')">Инициализация</a>
    </div>
    <div class="col-lg-6" style="padding: 5px"></div>
    
    `
    this.el_name = $("<h3></h3>").text(this.name)
    this.el_size = $("<div></div>").text("Объем мл.:"+this.size)
    this.el_pulse = $("<div></div>").text("Импульсов.:"+this.pulse)
    this.el_startBottle =  $("<button></button>").text("Инициализация Тары");
    this.el_startBottle.on( "click", function() {

    }.bind(this));
    this.el_buttonDelete =  $("<button></button>").text("удалить");
    this.el_buttonDelete.on( "click", function() {
        if (confirm("Удалить?")){
            this.el.remove()
            delete Builds[this.id]
            ws.send(JSON.stringify({
                deleteBuild:{
                    id:this.id
                }
            }))
        }
    }.bind(this));

    // this.el.append(this.el_name)
    // this.el.append(this.el_size)
    // this.el.append(this.el_pulse)
    // this.el.append(this.el_buttonDelete)
    // this.el.append(this.el_startBottle)
    this.el.append(this.el_html)
    if(init){
        $("#buildsContaner").append(this.el)
    }


}
Build.prototype.change = function(data){
    this.el.html("")
    this.name = data.name
    this.size = data.size
    this.pulse = data.pulse
    this.render(false)
}*/