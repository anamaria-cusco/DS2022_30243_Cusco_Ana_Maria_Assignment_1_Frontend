import React, { useState, useEffect, useMemo, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DatePicker from "react-datepicker";
import ClientService from "../services/client.service";
import "react-datepicker/dist/react-datepicker.css";
import {useLocation} from 'react-router-dom';
import { format } from 'date-fns';
Chart.register(...registerables);


  
const DailyConsumptionChart = () => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const location = useLocation();
    
useEffect(() => {
    getChartData();
    }, []);
    
const getChartData = () => {
    var date = JSON.parse(localStorage.getItem('date'));
    ClientService.getDailyConsumption(location.state.deviceId, date)
      .then(response => {
        for (const [hour, value] of Object.entries(response.data)) {
            labels.push(hour);
            data.push(value);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };



return (
    
    <div className="row justify-content-md-center">
       <div className="col-md-10">
      <Bar data={{
          labels:labels,
          datasets: [{
              label: 'Hour (X) , Max Consumption (Y) ',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      }} />
  </div>
  </div>
);
};

    

export default DailyConsumptionChart;