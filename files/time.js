		// Load the visualization API and the corechart packages
		google.charts.load('current',{'packages':['corechart','table']});
		
		// Set callback when the google visualization API is loaded
		google.charts.setOnLoadCallback(drawAllSheets);
		
		function drawAllSheets() {
			// Set chart area title
			document.getElementById("title_div").innerHTML = category + ' (2000-2016)';
			
			// Create Google Sheets query
			var queryString = 'https://docs.google.com/spreadsheets/d/10CZZ5kkUFC5knplBAtj0MfYF7JYqgqIvDOFz0WmOvVM/gviz/tq?sheet=country&headers=1&tq=' + encodeURIComponent('SELECT B,C,D,E,F,G,H,I,J,K,L WHERE A = "' + category + '"');
			console.log(queryString);
			query1 = new google.visualization.Query(queryString);
			query1.send(chartfunction);
		
			function chartfunction (response) {
				// Get and sort data
				var data1 = response.getDataTable();
				data1.sort({column: 0, desc: false});
				
				// Set number format based on category name
				if (category.includes('%')) {var format1 = {fractionDigits: 2, pattern: "#.##'%'"}}
				else if (category.includes('USD')||category.includes('US$')) {var format1 = {fractionDigits: 0, pattern: '$#,###'}}
				else {var format1 = {fractionDigits: 0, pattern: '#,###'}};
				var formatter = new google.visualization.NumberFormat(format1);
				formatter.format(data1,1);
				formatter.format(data1,2);
				formatter.format(data1,3);
				formatter.format(data1,4);
				formatter.format(data1,5);
				formatter.format(data1,6);
				formatter.format(data1,7);
				formatter.format(data1,8);
				formatter.format(data1,9);
				formatter.format(data1,10);
				
				// Set chart options
				var options = {
				  hAxis: {titleTextStyle: {color: '#333'}, format:'####'},
				  vAxis: {minValue: 0}, 
				  height:600,
				  width:1100,
				  isStacked:true
				};
				
				// Set chart style based on selection
				if (styletext == 'Area') {var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));}
				else if (styletext == 'Line') {var chart = new google.visualization.LineChart(document.getElementById('chart_div'));};
				
				// Create chart
				chart.draw(data1, options);
				
				// Create data table
				var table = new google.visualization.Table(document.getElementById('tab_div'));
				table.draw(data1, {showRowNumber: true, width:9000, height:400});

				}		
		}