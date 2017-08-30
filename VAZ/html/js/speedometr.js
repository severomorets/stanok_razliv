
var speedometr = function(sp){
    

var speedometr = document.getElementById("speedometr");
var ctx_speedometr = speedometr.getContext("2d");
// general settings
var middleX = speedometr.width / 2;
var middleY = speedometr.height / 2;
var radius = speedometr.width / 2 - speedometr.width / 10;
// beginning and ending of our arc. Sets by rad * pi
var startAngleIndex = 0.7;
var endAngleIndex = 2.3;

// zones settings
var zoneLineWidth = speedometr.width / 30;
var counterClockwise = false;

// ticks settings
var tickWidth = speedometr.width / 100;
var tickColor = "#FFFFFF";
var tickOffsetFromArc = speedometr.width / 40;

// Center circle settings
var centerCircleRadius = speedometr.width / 20;
var centerCircleColor = "#efe5cf";
var centerCircleBorderWidth = speedometr.width / 100;

// Arrow settings
var arrowValueIndex = 0.6;
var arrowColor = "#FF0A0E";
var arrowWidth = speedometr.width / 50;

// Digits settings
var digits = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
var digitsColor = "#F1f1f1";
var digitsFont = "bold 20px Tahoma";
var digitsOffsetFromArc = speedometr.width / 12;

var zonesCount = digits.length - 1;
var step = (endAngleIndex - startAngleIndex) / zonesCount;
var DrawZones = function() {
        var greenZonesCount = Math.ceil(zonesCount / 2);
        var yellowZonesCount = Math.ceil((zonesCount - greenZonesCount) / 2);
        var redZonesCount = zonesCount - greenZonesCount - yellowZonesCount;

        var startAngle = (startAngleIndex - 0.02) * Math.PI;
        var endGreenAngle = (startAngleIndex + greenZonesCount * step) * Math.PI;
        var endYellowAngle = (startAngleIndex + (greenZonesCount + yellowZonesCount) * step) * Math.PI;
        var endRedAngle = (endAngleIndex + 0.02) * Math.PI;


        var sectionOptions = [
            {
                startAngle: startAngle,
                endAngle: endGreenAngle,
                color: "#FFFFFF"
            },
            {
                startAngle: endGreenAngle,
                endAngle: endYellowAngle,
                color: "#cc0"
            },
            {
                startAngle: endYellowAngle,
                endAngle: endRedAngle,
                color: "#900"
            }
        ];

        this.DrawZone = function(options) {
            ctx_speedometr.beginPath();
            ctx_speedometr.arc(middleX, middleY, radius, options.startAngle, options.endAngle, counterClockwise);
            ctx_speedometr.lineWidth = zoneLineWidth;
            ctx_speedometr.strokeStyle = options.color;
            ctx_speedometr.lineCap = "butt";
            ctx_speedometr.stroke();
        };

        sectionOptions.forEach(function(options) {
            DrawZone(options);
        });
    };
    var DrawTicks = function() {

        this.DrawTick = function(angle) {
            var fromX = middleX + (radius - tickOffsetFromArc) * Math.cos(angle);
            var fromY = middleY + (radius - tickOffsetFromArc) * Math.sin(angle);
            var toX = middleX + (radius + tickOffsetFromArc) * Math.cos(angle);
            var toY = middleY + (radius + tickOffsetFromArc) * Math.sin(angle);

            ctx_speedometr.beginPath();
            ctx_speedometr.moveTo(fromX, fromY);
            ctx_speedometr.lineTo(toX, toY);
            ctx_speedometr.lineWidth = tickWidth;
            ctx_speedometr.lineCap = "round";
            ctx_speedometr.strokeStyle = tickColor;
            ctx_speedometr.stroke();
        };

        for (var i = startAngleIndex; i <= endAngleIndex; i += step) {
            var angle = i * Math.PI;
            this.DrawTick(angle);
        }
    };
    var DrawDigits = function() {
        var angleIndex = startAngleIndex;

        digits.forEach(function(digit) {
            var angle = angleIndex * Math.PI;
            angleIndex += step;
            var x = middleX + (radius - digitsOffsetFromArc) * Math.cos(angle);
            var y = middleY + (radius - digitsOffsetFromArc) * Math.sin(angle);

            ctx_speedometr.font = digitsFont;
            ctx_speedometr.fillStyle = digitsColor;
            ctx_speedometr.textAlign = "center";
            ctx_speedometr.textBaseline = "middle";
            ctx_speedometr.fillText(digit, x, y);
        });
    };
    var DrawArrow = function(sp) {
        var arrowAngle = sp * Math.PI;
        
        var toX = middleX + (radius) * Math.cos(arrowAngle);
        var toY = middleY + (radius) * Math.sin(arrowAngle);

        ctx_speedometr.beginPath();
        ctx_speedometr.moveTo(middleX, middleY);
        ctx_speedometr.lineTo(toX, toY);
        ctx_speedometr.strokeStyle = arrowColor;
        ctx_speedometr.lineWidth = arrowWidth;
        ctx_speedometr.stroke();
    };

    var DrawCenterCircle = function() {
        ctx_speedometr.beginPath();
        ctx_speedometr.arc(middleX, middleY, centerCircleRadius, 0, 2 * Math.PI, false);
        ctx_speedometr.fillStyle = centerCircleColor;
        ctx_speedometr.fill();
        ctx_speedometr.lineWidth = centerCircleBorderWidth;
        ctx_speedometr.strokeStyle = arrowColor;
        ctx_speedometr.stroke();
    };
      return function speed(sp){
        sp = sp*0.008900
        sp = sp+0.7
        //
        ctx_speedometr.clearRect(0, 0, 800, 800); // Очистка области указанного размера и положения
        

        DrawTicks();
        DrawZones();
        DrawDigits();
        DrawArrow(sp);
        DrawCenterCircle();
    }
    
}

  
  
