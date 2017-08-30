function TogglTopMenu(i,$this){
$(".indexBlocks").hide()
$(".indexBlocks_"+i).show()
    $(".TogglTopMenu").removeClass('active')
    $($this).addClass('active')
}


function CalibrationNewBuilds(){
    $("#calibrationSetting").show()
    var t = Object.keys(Valves)[0]
    var str = `
    <div>pin: `+Valves[t].pin+`</div>
    <div>Импульсы: <span class="pulseValves" pin="pin_`+t+`">`+Valves[t].pulse+`</span></div>
    <br>
    <div>РЕЛЕ: <span class="releyValves" pin="pin_`+t+`">`+Valves[t].reley+`</span></div>
    <br>
    <div class="form-group">
    <a  onmousedown="enterVilve(1,'`+t+`')" onmouseup="enterVilve(0,'`+t+`')" class="btn btn-warning">Включить кран</a>
    <a  onclick="resetPulse('`+t+`')"  class="btn btn-warning">сбросить счетчик</a>
    </div>
    `
    $("#dataVi").html(str)
    console.log(Valves[t])

}

function enterVilve(val,pin){

    console.log(val)
    ws.send(JSON.stringify({
        calibration:{
            pin:pin,
            val:val
        }
    }))

}