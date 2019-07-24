		// Load the visualization API and the corechart packages
		google.charts.load('current',{'packages':['corechart','table']});
		
		// Set callback when the google visualization API is loaded
		google.charts.setOnLoadCallback(drawAllSheets);
		
		function drawAllSheets() {
			// Set chart area title
			document.getElementById("title_div").innerHTML = category + ' (' + yeartext + ')';
			
			// Create Google Sheets query
			var queryString = 'https://docs.google.com/spreadsheets/d/10CZZ5kkUFC5knplBAtj0MfYF7JYqgqIvDOFz0WmOvVM/gviz/tq?sheet=combined&headers=1&tq=' + encodeURIComponent('SELECT A,' + yearcol + ' WHERE B = "' + category + '"');
			console.log(queryString);
			query1 = new google.visualization.Query(queryString);
			query1.send(chartfunction);
		
			function chartfunction (response) {
				// Get and sort data
				var data1 = response.getDataTable();
				data1.sort({column: 1, desc: true});
				
				// Set number format based on category name
				data1.setColumnLabel(1, category);
				
				// Set number format based on category name
				if (category.includes('%')) {var format1 = {fractionDigits: 2, pattern: "#.##'%'"}}
				else if (category.includes('USD')||category.includes('US$')) {var format1 = {fractionDigits: 0, pattern: '$#,###'}}
				else {var format1 = {fractionDigits: 0, pattern: '#,###'}};
				var formatter = new google.visualization.NumberFormat(format1);
				formatter.format(data1,1);
			
				// Create map
				var chart = new google.visualization.GeoChart(document.getElementById('map_div'));
				chart.draw(data1, {});
				
				// Set chart options
				var options = {height:500,
								width:500,
								pieHole:.4,
								legend: {position: 'top', maxLines: 4},
								bars: {groupWidth: '85%'},
								isStacked:true
							  };
				
				// Create chart
				var chart = new google.visualization.PieChart(document.getElementById('pie_div'));
				chart.draw(data1, options);
				
				// Create chart
				var chart = new google.visualization.BarChart(document.getElementById('bar_div'));
				chart.draw(data1, options);
				
				// Create data table
				var table = new google.visualization.Table(document.getElementById('tab_div'));
				table.draw(data1, {showRowNumber: true, width:9000, height:400});
				
				}		
		}