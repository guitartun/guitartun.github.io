var canvas1 = $('#canvas1');
var canvas2 = $('#canvas2');

canvas1.prop('width', document.body.clientWidth * 0.70);
canvas1.prop('height', 240);
canvas2.prop('width', document.body.clientWidth * 0.20);
canvas2.prop('height', 240);


$(function () {
    // var handle = $("#custom-handle");
    $("#slider").slider({
        min: 0,
        max: 1200,
        value: 0,
        create: function () {
            // handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            //  handle.text(ui.value);
            frequencyShift = parseInt($(this).slider("value"));
            console.log(frequencyShift);
        }
    });
});

var strings = [329.63, 246.94, 196.00, 146.83, 110.00, 82.407];
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 32.70) / Math.log(2) );
    return Math.round(noteNum % 12);
}

$(function () {
    var table = document.getElementById("notesBody");
    var tr = "";
    var td = "";
    var root = Math.pow(2, (1 / 12));
    for (var i = 0; i < 6; i++) {
        td = '<th scope="row">' + (i + 1) + '</th>';
        for (var j = 0; j < 20; j++) {
            var fr = (strings[i] * Math.pow(root, j)).toFixed(1);
            td += "<td>" + fr + "<br>" + noteStrings[noteFromPitch(fr)] + "</td>";
        }
        tr += "<tr>" + td + "</tr>";
    }
    table.innerHTML = tr;
    console.log(root);
});

function colorTable() {
    $(function () {
        $("#notesBody tr").each(function () {
            $("td", this).each(function () {
                var value = parseFloat(this.innerText);
                if (value > 65 && value < 125) {
                    $(this).addClass("bigoct");
                }
                if (value > 130 && value < 250) {
                    $(this).addClass("smalloct");
                }
                if (value > 260 && value < 500) {
                    $(this).addClass("firstoct");
                }
                if (value > 520 && value < 990) {
                    $(this).addClass("secondoct");
                }
                if (value > 32 && value < 62) {
                    $(this).addClass("controct");
                }
                if (value > 1040 && value < 2000) {
                    $(this).addClass("controct");
                }
            });
        });
    });
}

var alttun = 0;
var drop = 0;

function alternateTuning() {
    var table = document.getElementById("notesBody");
    var tr = "";
    var td = "";
    var fr = 0;
    var root = Math.pow(2, (1 / 12));
    for (var i = 0; i < 6; i++) {
        td = '<th scope="row">' + (i + 1) + '</th>';
        for (var j = 0; j < 20; j++) {
            if (i === 5) {
                fr = (strings[i] * Math.pow(root, j + alttun + drop)).toFixed(1);
            } else {
                fr = (strings[i] * Math.pow(root, j + alttun)).toFixed(1);
            }
            td += "<td>" + fr + "<br>" + noteStrings[noteFromPitch(fr)] + "</td>";
        }
        tr += "<tr>" + td + "</tr>";
    }
    table.innerHTML = tr;
    colorTable();
    console.log(alttun);
}

$(function () {
    $('#altTun').selectmenu({
        change:
            function () {
                alttun = parseInt($('#altTun option:selected').val());
                console.log(alttun);
                alternateTuning();
            }
    });
});

$(function () {
    $('#dropTun').selectmenu({
        change:
            function () {
                drop = parseInt($('#dropTun option:selected').val());
                console.log(drop);
                alternateTuning();
            }
    });
});

$(function () {
    colorTable();
});

var rightFrequency = 1500;
var leftFrequency = 0;

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1500,
        values: [0, 1500],
        slide: function (event, ui) {
            //  $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            leftFrequency = parseInt(ui.values[0]);
            rightFrequency = parseInt(ui.values[1]);
            console.log(ui.values[0] + ' ' + ui.values[1]);
        }
    });
});

$(function () {
    $(".ui-controlgroup-horizontal").controlgroup();
    $(".controlgroup-vertical").controlgroup({
        "direction": "vertical"
    });
});


$(function () {
    $("#tabs").tabs();
});

$("#slider-range").width($('#canvas1').width() / 2.1);
$("#slider").width($('#canvas1').width() / 2.1);

$('#prefFreq').addClass('w3-hide');
$('#slider-range').addClass('w3-hide');
$('#slider').addClass('w3-hide');

var slideIndex = 1;
showDivs(slideIndex);

$('#leftMainButton').click(function () {
    slideIndex++;
    showDivs(slideIndex)
});
$('#rightMainButton').click(function () {
    slideIndex--;
    showDivs(slideIndex)
});


$('a').click(function () {

    $('a').each(function () {
        $(this).removeClass('ui-state-active');
    });

    if ($(this).hasClass('ui-state-active')) {
        $(this).removeClass('ui-state-active');
    }
    else {
        $(this).addClass('ui-state-active');
    }
});

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slides");
    console.log(x);
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        $('#backgroundImage').removeClass('back1');
        $('#backgroundImage').removeClass('back2');
        $('#backgroundImage').removeClass('back3');
    }
    x[slideIndex - 1].style.display = "inherit";
    switch (slideIndex - 1) {
        case 0: {
            $('#topText').text('Тюнер');
            break;
        }
        case 1: {
            $('#topText').text('Настройки');
            break;
        }
        case 2: {
            $('#topText').text('О программе');
            break;
        }
    }
    $('#backgroundImage').addClass('back' + slideIndex);
    console.log('back' + slideIndex);
}

var audioCtx;
var source;
var ctx1;
var ctx2;

canvas1 = document.getElementById("canvas1");
ctx1 = canvas1.getContext("2d");
canvas2 = document.getElementById("canvas2");
ctx2 = canvas2.getContext("2d");


var algorithm = 1; //метода поиска ноты
var timeDomainAnalyzer;
var timeDomainData; //массив данных во временной области
var frequencyDomainAnalyzer;
var frequencyDomainData; //массив данных в частотной области
var canvas1Width = canvas1.width;
var canvas1Height = canvas1.height;
var canvas2Width = canvas2.width;
var canvas2Height = canvas2.height;
var barWidth;
var sliceWidth;
var halfCanvasHeight;
var frequencyShift = 0;
var harm = 5;


audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var biquadFilter1 = audioCtx.createBiquadFilter();
var biquadFilter2 = audioCtx.createBiquadFilter();
frequencyDomainAnalyzer = audioCtx.createAnalyser();
frequencyDomainAnalyzer.minDecibels = -70;
frequencyDomainAnalyzer.maxDecibels = -20;
frequencyDomainAnalyzer.smoothingTimeConstant = 0.82;
frequencyDomainAnalyzer.fftSize = 16384;
console.log("frequencyDomainAnalyzer.fftSize " + frequencyDomainAnalyzer.fftSize);
timeDomainAnalyzer = audioCtx.createAnalyser();
timeDomainAnalyzer.fftSize = 8192;
timeDomainAnalyzer.smoothingTimeConstant = 0.9;
console.log("timeDomainAnalyzer.fftSize " + timeDomainAnalyzer.fftSize);
/*
navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(function(stream) {
            // use the stream
            source = audioCtx.createMediaStreamSource(stream);
            console.log("audioCtx sampleRate " + audioCtx.sampleRate);
            if (algorithm == 1) {
                source.connect(timeDomainAnalyzer);
                console.log("timeDomainAnalyzer подключен");
            }
            else {
                source.connect(frequencyDomainAnalyzer);
                console.log("frequencyDomainAnalyzer подключен");
            }

            visualize();
        })
        .catch(function(err) {
            // handle the error
            console.log('Возникла ошибка: ' + err);
        });
*/

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {

        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = ( navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
}

navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(function (stream) {
        source = audioCtx.createMediaStreamSource(stream);
        console.log("audioCtx sampleRate " + audioCtx.sampleRate);
        if (algorithm == 1) {
            source.connect(timeDomainAnalyzer);
            console.log("timeDomainAnalyzer подключен");
        }
        else {
            source.connect(frequencyDomainAnalyzer);
            console.log("frequencyDomainAnalyzer подключен");
        }

        visualize();

    })
    .catch(function (err) {
        console.log(err.name + ": " + err.message);
    });


var timeDataLength = timeDomainAnalyzer.fftSize;
var frequencyDataLength = frequencyDomainAnalyzer.frequencyBinCount;


function visualize() {
    timeDomainData = new Float32Array(timeDataLength);
    frequencyDomainData = new Uint8Array(frequencyDataLength);
    barWidth = (canvas1Width / (frequencyDataLength)) * (15);
    sliceWidth = (canvas1Width / timeDataLength) * 15;
    halfCanvasHeight = canvas1Height / 2;
    drawGraph();
}


$(function () {
    $("#algType").selectmenu({
        change: function (event, data) {
            var value = data.item.value;
            console.log(value);
            if (value == 1) {
                try {
                    algorithm = 1;
                    $('#prefTime').removeClass('w3-hide');
                    $('#prefFreq').addClass('w3-hide');
                    $('#slider-range').addClass('w3-hide');
                    $('#slider').addClass('w3-hide');
                    source.disconnect(frequencyDomainAnalyzer);
                    source.connect(timeDomainAnalyzer);
                }
                catch (e) {
                    console.log(e)
                }
            }
            if (value == 2) {
                algorithm = 2;
                try {
                    $('#prefTime').addClass('w3-hide');
                    $('#prefFreq').removeClass('w3-hide');
                    $('#slider-range').removeClass('w3-hide');
                    $('#slider').removeClass('w3-hide');
                    source.disconnect(timeDomainAnalyzer);
                    source.connect(frequencyDomainAnalyzer);

                }
                catch (e) {
                    console.log(e)
                }
            }
        }

    });
});

$(function () {
    $('#harmonics').selectmenu({
        change: function () {
            harm = parseInt($('#harmonics option:selected').val());
            console.log(harm);
        }
    });
});

$(function () {
    $('#smoothTime1').selectmenu({
        change:
            function () {
                timeDomainAnalyzer.smoothingTimeConstant = parseFloat($('#smoothTime1 option:selected').val());
                console.log(timeDomainAnalyzer.smoothingTimeConstant);
            }
    });
});

$(function () {
    $('#smoothTime2').selectmenu({
        change:
            function () {
                frequencyDomainAnalyzer.smoothingTimeConstant = parseFloat($('#smoothTime2 option:selected').val());
                console.log(frequencyDomainAnalyzer.smoothingTimeConstant);
            }
    });
});

$(function () {
    $('#fft1').selectmenu({
        change:
            function () {
                timeDomainAnalyzer.fftSize = parseInt($('#fft1 option:selected').val());
                timeDataLength = timeDomainAnalyzer.fftSize;
                timeDomainData = new Float32Array(timeDataLength);
                barWidth = (canvas1Width / (frequencyDataLength)) * (15);
                sliceWidth = (canvas1Width / timeDataLength) * 15;
                halfCanvasHeight = canvas1Height / 2;
                console.log(timeDomainAnalyzer.fftSize);
            }
    });
});

$(function () {
    $('#fft2').selectmenu({
        change:
            function () {
                frequencyDomainAnalyzer.fftSize = parseInt($('#fft2 option:selected').val());
                frequencyDataLength = frequencyDomainAnalyzer.frequencyBinCount;
                frequencyDomainData = new Uint8Array(frequencyDataLength);
                barWidth = (canvas1Width / (frequencyDataLength)) * (15);
                sliceWidth = (canvas1Width / timeDataLength) * 15;
                halfCanvasHeight = canvas1Height / 2;
                console.log(frequencyDomainAnalyzer.fftSize);
            }
    });
});


$(function () {
    $('#dbells').selectmenu({
        change:
            function () {
                frequencyDomainAnalyzer.minDecibels = parseInt($('#dbells').val());
                console.log(frequencyDomainAnalyzer.minDecibels);
            }
    });
});


$(window).resize(function () {
    canvas1 = $('#canvas1');
    canvas2 = $('#canvas2');
    canvas1.prop('width', document.body.clientWidth * 0.70);
    canvas1.prop('height', 240);
    canvas2.prop('width', document.body.clientWidth * 0.20);
    canvas2.prop('height', 240);
    canvas1 = document.getElementById("canvas1");
    ctx1 = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    ctx2 = canvas2.getContext("2d");
    canvas1Width = canvas1.width;
    canvas1Height = canvas1.height;
    canvas2Width = canvas2.width;
    canvas2Height = canvas2.height;
    console.log(canvas1Width);
    console.log(canvas1Height);

});

function autoCorrelate() {
    var sampleRate = audioCtx.sampleRate;
    var MIN_SAMPLES = 0;
    var GOOD_ENOUGH_CORRELATION = 0.985;
    var SIZE = timeDataLength;
    var MAX_SAMPLES = Math.floor(SIZE / 4);
    var bestOffset = -1;
    var bestCorrelation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    for (var i = 0; i < SIZE; i++) {
        var val = timeDomainData[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.015) //если нет сигнала
        return -1;

    var lastCorrelation = 1;
    for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
        var correlation = 0;

        for (i = 0; i < MAX_SAMPLES; i++) {//найдем корреляцию
            correlation += Math.abs((timeDomainData[i]) - (timeDomainData[i + offset]));
        }
        correlation = 1 - (correlation / MAX_SAMPLES);
        if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
            foundGoodCorrelation = true;
            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        } else if (foundGoodCorrelation) {
            return sampleRate / bestOffset;
        }
        lastCorrelation = correlation;
    }
    return -1;
}

function frequencyCorrelate() {
    var correlation = -1;
    var bestCorrelation = -1;
    var baseFrequency = -1;
    var left = iToFrequency(leftFrequency);
    var right = iToFrequency(rightFrequency);
    for (var frequency = left; frequency < right; frequency += 0.5) {
        var i = frequencyToI(frequency);
        for (var harmonic = i; harmonic < (harm + 1) * i; harmonic += i) {
            correlation += frequencyDomainData[harmonic];
        }
        if ((correlation > bestCorrelation + 20)) {
            bestCorrelation = correlation;
            baseFrequency = frequency;
        }
        correlation = 0;
    }
    return baseFrequency;
}

function iToFrequency(i) {
    return ((i / frequencyDataLength ) * (audioCtx.sampleRate / 2));
}

//i*sampleRate/(2*frequencyDataLength)=frequency
function frequencyToI(frequency) {
    return Math.round((frequency * frequencyDataLength) / (audioCtx.sampleRate / 2));
}

function drawNote(frequency) {
    var freq;
    var fc = -1;
    var cell;
    var delta = 100;
    var minDelta = 10;
    var text = "";
    var percent = -1;
    ctx2.clearRect(0, 0, canvas2Width, canvas2Height);
    ctx2.fillStyle = 'rgba(0,0,0,0.25)';
    ctx2.fillRect(0, 0, canvas2Width, canvas2Height);
    ctx2.fillStyle = 'rgba(250,250,250,0.7)';
    ctx2.font = "italic 20pt Verdana";
    $("#notes tr").each(function () {
        $("td", this).each(function () {
            freq = parseFloat(this.innerText);
            delta = frequency - freq;
            if (Math.abs(delta) < minDelta) {
                minDelta = Math.abs(delta);
                cell = this;
                text = this.innerText;
                fc = freq;
            }
        });
    });
    $("#notes tr").each(function () {
        $("td", this).each(function () {
            if (Math.abs(parseFloat(this.innerText) - frequency) < 2.5) {
                this.style.backgroundColor = 'rgba(200,200,50,0.9)';
            }
            else {
                this.style.backgroundColor = "";
            }
        });
    });
    ctx2.fillText(text, 10, 40);
    if (frequency > 0)
        ctx2.fillText(frequency.toFixed(1), 10, 200);
    ctx2.fillRect(0, Math.round(canvas2Height / 2), canvas2Width, 2);
    ctx2.fillRect(0, Math.round((canvas2Height / 2) + 15 * (fc - frequency)), canvas2Width, 1);
    if (fc > frequency) {
        percent = (fc - frequency) / (frequency * 1.0595 - frequency);
    }
    else {
        percent = (frequency - fc) / (frequency - frequency / 1.0595);
    }
    if (frequency > 0 && percent < 1)
        ctx2.fillText((100 * percent).toFixed(2) + "%", canvas2Width / 2, 200);

}

function drawGraph() {
    requestAnimationFrame(drawGraph);
    var fc;
    if (algorithm === 1) {
        timeDomainAnalyzer.getFloatTimeDomainData(timeDomainData);
        fc = autoCorrelate();
        ctx1.clearRect(0, 0, canvas1Width, canvas1Height);
        ctx1.fillStyle = 'rgba(0,0,0,0.25)';
        ctx1.fillRect(0, 0, canvas1Width, canvas1Height);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = 'rgb(250, 250, 250)';
        ctx1.beginPath();
        var x = 0;
        for (i = 0; i < 1200; i += 2) {
            var v = timeDomainData[i];
            var y = 2 * v * halfCanvasHeight + halfCanvasHeight;
            if (i === 0) {
                ctx1.moveTo(x, y);
            } else {
                ctx1.lineTo(x, y);
            }
            x += sliceWidth * 2;
        }
        ctx1.lineTo(canvas1.width, canvas1.height / 2);
        ctx1.stroke();
        drawNote(fc);
    }

    if (algorithm === 2) {
        frequencyDomainAnalyzer.getByteFrequencyData(frequencyDomainData);
        fc = frequencyCorrelate();
        ctx1.clearRect(0, 0, canvas1Width, canvas1Height);
        ctx1.fillStyle = 'rgba(0,0,0,0.25)';
        ctx1.fillRect(0, 0, canvas1Width, canvas1Height);
        for (var i = leftFrequency; i < rightFrequency; i++) {
            var barHeight = 2 * frequencyDomainData[i];
            ctx1.fillStyle = 'rgba(250,250,250,0.7)';
            ctx1.fillRect(i * barWidth - frequencyShift * barWidth, canvas1Height - barHeight / 2, barWidth, barHeight / 2);
        }
        ctx1.fillStyle = "rgba(50,50,100,0.9)";
        var I = frequencyToI(fc);
        for (var harmonic = I; harmonic < (harm + 1) * I; harmonic += I) {
            ctx1.fillRect(harmonic * barWidth - frequencyShift * barWidth, 0, barWidth, canvas1Height);
        }
        ctx1.fillStyle = "rgba(0,150,0,0.8)";
        ctx1.fillRect(leftFrequency * barWidth - frequencyShift * barWidth, 0, barWidth, canvas1Height);
        ctx1.fillStyle = "rgba(150,0,0,0.8)";
        ctx1.fillRect(rightFrequency * barWidth - frequencyShift * barWidth, 0, barWidth, canvas1Height);
        drawNote(fc);
    }
}

