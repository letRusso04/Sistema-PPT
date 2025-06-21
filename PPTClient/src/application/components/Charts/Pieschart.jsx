import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Pieschart(props) {
let widthg;
let heightg;
props.size[0] > 0 ? widthg = props.size[0] : widthg = 200;
props.size[1] > 0 ? heightg = props.size[1] : heightg = 200;
ChartJS.register(ArcElement, Tooltip, Legend);
var options = {
    responsive : true,
    maintainAspectRatio: false,
};
var data = {
    labels: ['data', 'Prueba'],
    datasets: [
        {
            label: 'Crecimiento.',
            data: [20,80],
            backgroundColor: [
                'rgba(234, 7, 241, 0.959)',
                'rgba(100, 0, 109, 0.2)',
                'rgba(108, 25, 116, 0.2)'
            ],
            borderColor: [
                '#cb00f3',
                'rgb(248, 0, 248)',
                'rgba(108, 25, 116, 0.2)'
            ],
            borderWidth: 1,
        },
    ],
};
  return (
     <Pie data={data} options={options} style={{width: widthg, height: heightg}}/>
  )
}

export default Pieschart