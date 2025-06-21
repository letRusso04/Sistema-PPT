import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
function LineChart(props) {
let widthg;
let heightg;
props.size[0] > 0 ? widthg = props.size[0] : widthg = 200;
props.size[1] > 0 ? heightg = props.size[1] : heightg = 200;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


var beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
var meses = ["6:00","7:00","8:00","9:00","10:00","11:00","12:00"];

var midata = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'MS',
            data: beneficios,
            tension: 0.5,
            fill : true,
            borderColor: 'rgb(163, 6, 155)',
            backgroundColor: 'rgba(155, 4, 155, 0.5)',
            pointRadius: 3,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'estabilidad',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
        },
    ],
};

var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 0, 221)'}
        }
    }
};

  return  <Line data={midata} options={misoptions} style={{width: widthg, height: heightg}} />;
}

export default LineChart;
