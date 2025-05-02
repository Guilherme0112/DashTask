import { useEffect } from 'react';

function Financas() {
    useEffect(() => {
        // Carrega o script do Google Charts
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
          window.google.charts.load('current', { packages: ['bar'] });
          window.google.charts.setOnLoadCallback(drawStuff);
        };
        document.head.appendChild(script);
    
        function drawStuff() {
          var data = new google.visualization.arrayToDataTable([
            ['Move', 'Percentage'],
            ["King's pawn (e4)", 44],
            ["Queen's pawn (d4)", 31],
            ["Knight to King 3 (Nf3)", 12],
            ["Queen's bishop pawn (c4)", 10],
            ['Other', 3]
          ]);
  
          var options = {
            width: 800,
            legend: { position: 'none' },
            chart: {
              title: 'Últimos 4 meses',
              subtitle: 'Subtração das entradas e saídas' },
            axes: {
              x: {
                0: { side: 'top', label: ''} // Top x-axis.
              }
            },
            bar: { groupWidth: "90%" }
          };
  
          var chart = new google.charts.Bar(document.getElementById('top_x_div'));
          // Convert the Classic options to Material options.
          chart.draw(data, google.charts.Bar.convertOptions(options));
        };
      }, []);
    
      return (
        <div id="top_x_div" style={{width: "800px", height: "600px"}}></div>
      );
    }
        
export default Financas;
