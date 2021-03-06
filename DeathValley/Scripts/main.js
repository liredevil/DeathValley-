﻿function OnSuccess(data) {
    var results = $('#results');
    results.empty();
    var dps = [];
    for (var i = 0; i < data.length; i++) {
        dps[i] = { x: data[i].PointX, y: data[i].PointY };
    }

        var chart = new CanvasJS.Chart("chartContainer", {
        theme: "theme2",
            animationEnabled: true,

            data: [{
            type: "line",
                dataPoints: dps
                }]
        });
        chart.render();
}

function drawChart() {
    var parameters = {
        ParameterA: $('#ParameterA').val(),
        ParameterB: $('#ParameterB').val(),
        ParameterC: $('#ParameterC').val(),
        Step: $('#Step').val(),
        Range1: $('#Range1').val(),
        Range2: $('#Range2').val()
    }

    if (validate(parameters) == true) {
        $.ajax({
            url: '/Chart/Chart',
            type: 'POST',
            data: { parameters },
            success: function (data) {
                OnSuccess(data);
            }
        });
    }
}

function validate(parameters) {
    if (parameters.ParameterA == '' || parameters.ParameterB == '' || parameters.ParameterC == '' ||
        parameters.Step == '' || parameters.Range1 == '' || parameters.Range2 == '') {

        alert("enter the all data");
        event.preventDefault();

        return false;
    }
    else if (parameters.ParameterA == 0) {
        alert("parameter a can not be 0");
        event.preventDefault();

        return false;
    }
    else if (parameters.Step <= 0)
    {
        alert("The step must be> 0");
        event.preventDefault();

        return false;
    }
    else if (parameters.Range1 >= parameters.Range2) {
        alert("Step is not correct");
        event.preventDefault();

        return false;
    }
    else
        return true;
}
