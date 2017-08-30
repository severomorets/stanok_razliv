
var tahometr = function(sp){
    

var tahometr = document.getElementById("tahometr");
var ctx_tahometr = tahometr.getContext("2d");
// general settings
var middleX = tahometr.width / 2;
var middleY = tahometr.height / 2;
var radius = tahometr.width / 2 - tahometr.width / 10;
// beginning and ending of our arc. Sets by rad * pi
var startAngleIndex = 0.7;
var endAngleIndex = 2.3;

// zones settings
var zoneLineWidth = tahometr.width / 30;
var counterClockwise = false;

// ticks settings
var tickWidth = tahometr.width / 100;
var tickColor = "#FFFFFF";
var tickOffsetFromArc = tahometr.width / 40;

// Center circle settings
var centerCircleRadius = tahometr.width / 20;
var centerCircleColor = "#efe5cf";
var centerCircleBorderWidth = tahometr.width / 100;

// Arrow settings
var arrowValueIndex = 0.6;
var arrowColor = "#FF0A0E";
var arrowWidth = tahometr.width / 50;

// Digits settings
var digits = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
var digitsColor = "#F1f1f1";
var digitsFont = "bold 20px Tahoma";
var digitsOffsetFromArc = tahometr.width / 12;

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
            ctx_tahometr.beginPath();
            ctx_tahometr.arc(middleX, middleY, radius, options.startAngle, options.endAngle, counterClockwise);
            ctx_tahometr.lineWidth = zoneLineWidth;
            ctx_tahometr.strokeStyle = options.color;
            ctx_tahometr.lineCap = "butt";
            ctx_tahometr.stroke();
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

            ctx_tahometr.beginPath();
            ctx_tahometr.moveTo(fromX, fromY);
            ctx_tahometr.lineTo(toX, toY);
            ctx_tahometr.lineWidth = tickWidth;
            ctx_tahometr.lineCap = "round";
            ctx_tahometr.strokeStyle = tickColor;
            ctx_tahometr.stroke();
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

            ctx_tahometr.font = digitsFont;
            ctx_tahometr.fillStyle = digitsColor;
            ctx_tahometr.textAlign = "center";
            ctx_tahometr.textBaseline = "middle";
            ctx_tahometr.fillText(digit, x, y);
        });
    };
    var DrawArrow = function(sp) {
        var arrowAngle = sp * Math.PI;
        
        var toX = middleX + (radius) * Math.cos(arrowAngle);
        var toY = middleY + (radius) * Math.sin(arrowAngle);

        ctx_tahometr.beginPath();
        ctx_tahometr.moveTo(middleX, middleY);
        ctx_tahometr.lineTo(toX, toY);
        ctx_tahometr.strokeStyle = arrowColor;
        ctx_tahometr.lineWidth = arrowWidth;
        ctx_tahometr.stroke();
    };

    var DrawCenterCircle = function() {
        ctx_tahometr.beginPath();
        ctx_tahometr.arc(middleX, middleY, centerCircleRadius, 0, 2 * Math.PI, false);
        ctx_tahometr.fillStyle = centerCircleColor;
        ctx_tahometr.fill();
        ctx_tahometr.lineWidth = centerCircleBorderWidth;
        ctx_tahometr.strokeStyle = arrowColor;
        ctx_tahometr.stroke();
    };
      return function speed(sp){
        sp = sp*0.000200
        sp = sp+0.7
        //
        ctx_tahometr.clearRect(0, 0, 800, 800); // Очистка области указанного размера и положения
        

        DrawTicks();
        DrawZones();
        DrawDigits();
        DrawArrow(sp);
        DrawCenterCircle();
    }
    
}

  
  
