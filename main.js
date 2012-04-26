/* Marble Jar Experiment Runner
   by Devon Blandin, April 2012 
   for IT 238, Spring Quarter 2012 */


var runExperiment = function() {
	// set variables
	var numExperiments, numDraws, numWhite, numBlack, probability, numIdenticalDraw = 0, numIdenticalWhiteDraw = 0, numIdenticalBlackDraw = 0, resultMessage;

	// get experiment control values from page
	numExperiments = Number($("#numExperiments").val());
	numDraws = Number($("#numDraws").val());
	numWhite = Number($("#numWhite").val());
	numBlack = Number($("#numBlack").val());

	for (var i = 0; i < numExperiments; i++) {
		// setup the Marble Jar
		var jar = new MarbleJar;
		jar.white = numWhite;
		jar.black = numBlack;

		// draw marbles from the jar
		var drawnMarbles = new Array;
		for (var k = 0; k < numDraws; k++) {
			drawnMarbles.push(jar.drawMarble());
		}
		
		var allDrawsIdentical = function() {
			var identical = true;
			for(var j = 0; j < drawnMarbles.length - 1; j++) {
				if (drawnMarbles[j] != drawnMarbles[j + 1]) {
					identical = false;
				}
			}
			return identical;
		}
		
		// check if they're identical and bump the count if so
		if (allDrawsIdentical()) {
			if (drawnMarbles[0] === 'white') {
				numIdenticalWhiteDraw++;
			} else {
				numIdenticalBlackDraw++
			}
			numIdenticalDraw = numIdenticalWhiteDraw + numIdenticalBlackDraw;
		}
	}

	drawResultChart(numIdenticalWhiteDraw, numIdenticalBlackDraw, (numExperiments - numIdenticalDraw));

	// print out the experiment results 
	resultMessage = numIdenticalDraw + ' Identical Draws across ' + numExperiments + ' Experiments.<br>That\'s ' + (numIdenticalDraw / numExperiments * 100).toFixed(2) + '% of all Experiemnts.<br>' + numIdenticalWhiteDraw + ' Draws were of White Marbles.<br>' + numIdenticalBlackDraw + ' Draws were of Black Marbles.';

	$('#result').html(resultMessage);
}

var drawDistributionChart  = function() {

	var numWhite = Number($("#numWhite").val());
	var numBlack = Number($("#numBlack").val());

	var data = new google.visualization.DataTable();
        data.addColumn('string', 'Color');
        data.addColumn('number', 'Number of Marbles');
        data.addRows([
          ['White', numWhite],
          ['Black', numBlack]
        ]);

        // Set chart options
        var options = {title:'Marble Jar Distribution',
                       width:400,
                       height:200,
                   	   is3D: true,
                   	   slices: {0: {color: 'black', textStyle: {color: 'white'}}, 1: {color: 'F5EBEF', textStyle: {color: 'black'}}}};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('distributionChart'));
        chart.draw(data, options);

}

var drawProbabilityChart  = function(probabilityOfIdenticalWhiteDraws, probabilityOfIdenticalBlackDraws, numDraws) {

	var expectedWhiteIdentical = probabilityOfIdenticalWhiteDraws * numDraws;
	var expectedBlackIdentical = probabilityOfIdenticalBlackDraws * numDraws;
	var expectedNotIdentical = numDraws - expectedWhiteIdentical - expectedBlackIdentical;

	var data = new google.visualization.DataTable();
        data.addColumn('string', 'Result');
        data.addColumn('number', 'Number of Occurances');
        data.addRows([
          ['White Marble Match', expectedWhiteIdentical],
          ['Black Marble Match', expectedBlackIdentical],
          ['Not Identical', expectedNotIdentical],
        ]);

        // Set chart options
        var options = {'title':'Expected Results',
                       'width':400,
                       'height':200,
                   	   'is3D': true,
                   	   slices: {0: {color: '#F5EBEF', textStyle: {color: 'black'}}, 1: {color: 'black', textStyle: {color: 'white'}}, 2: {color: 'blue', textStyle: {color: 'white'}}}};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('probabilityChart'));
        chart.draw(data, options);
}

var drawResultChart  = function(numIdenticalWhiteDraw, numIdenticalBlackDraw, numNotIdentical) {

	var data = new google.visualization.DataTable();
        data.addColumn('string', 'Result');
        data.addColumn('number', 'Number of Occurances');
        data.addRows([
          ['White Marble Match', numIdenticalWhiteDraw],
          ['Black Marble Match', numIdenticalBlackDraw],
          ['Not Identical', numNotIdentical],
        ]);

        // Set chart options
        var options = {'title':'Results',
                       'width':400,
                       'height':300,
                   	   'is3D': true,
                   	   slices: {0: {color: '#F5EBEF', textStyle: {color: 'black'}}, 1: {color: 'black', textStyle: {color: 'white'}}, 2: {color: 'blue', textStyle: {color: 'white'}}}};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('resultChart'));
        chart.draw(data, options);
}

var calculateProbability = function() {
	// get values
	var numWhite = Number($("#numWhite").val());
	var numBlack = Number($("#numBlack").val());
	var numDraws = Number($("#numDraws").val());

	// calculate probabilities
	var probabilityOfWhiteDraw = (numWhite / (numWhite + numBlack));
	var probabilityOfBlackDraw = (numBlack / (numWhite + numBlack));
	var probabilityOfIdenticalWhiteDraws = Math.pow(probabilityOfWhiteDraw, numDraws);
	var probabilityOfIdenticalBlackDraws = Math.pow(probabilityOfBlackDraw, numDraws);
	var probabilityOfIdenticalDraws = probabilityOfIdenticalWhiteDraws + probabilityOfIdenticalBlackDraws;

	// set message
	probabilityMessage = 'Probability of Drawing a White Marble: ' + (probabilityOfWhiteDraw * 100).toFixed(2) + '%<br>Probability of Drawing a Black Marble: ' + (probabilityOfBlackDraw * 100).toFixed(2) + '%<br>Probability of Drawing ' + numDraws + ' White Marbles in a Row: ' + (probabilityOfIdenticalWhiteDraws * 100).toFixed(2) + '%<br>Probability of Drawing ' + numDraws + ' Black Marbles in a Row: ' + (probabilityOfIdenticalBlackDraws * 100).toFixed(2) + '%<br>Probability of Drawing ' + numDraws + ' Identical Marbles in a Row: ' + (probabilityOfIdenticalDraws * 100).toFixed(2) + '%';

	// display message and chart
	$('#probability').html(probabilityMessage);
	drawProbabilityChart(probabilityOfIdenticalWhiteDraws, probabilityOfIdenticalBlackDraws, numDraws);
}

var googleAPIsLoaded = function() {
	// setup the page
	$('input#runExperimentButton').removeAttr('disabled');
	calculateProbability();
	drawDistributionChart();

	// set event handlers
	$("#runExperimentButton").click(runExperiment);
	$("#numWhite").keyup(calculateProbability);
	$("#numBlack").keyup(calculateProbability);
	$("#numDraws").keyup(calculateProbability);
	$("#numWhite").keyup(drawDistributionChart);
	$("#numBlack").keyup(drawDistributionChart);
};

function loadGoogleAPIs() {
    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(googleAPIsLoaded);
}