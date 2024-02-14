import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const LineChart = () => {
  const [users, mgaUsers] = useState([]);
  const [todos, mgaTodos] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json =>{
  
        mgaUsers(json)
        console.log(json)
      })
    }
  
    const fetchTodo = () => {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json =>{
  
        mgaTodos(json)
        console.log(json)
      })
    }

    fetchUser()
    fetchTodo()
  }, [])

    const TodoPerUser = {};
    todos.map(todo => {
      if (TodoPerUser[todo.userId]){
        TodoPerUser[todo.userId]++;
      }else {
        TodoPerUser[todo.userId] = 1;
      }
    })

    return (
      <div>
        <Line
          data={{
            labels: users.map(user => user.name),
            datasets: [
              {
                data: users.map(user => TodoPerUser[user.id] || 0),
                backgroundColor: "purple",
              },
            ],
          }}
          height={100}
        />
      </div>
    );
  };
  export default LineChart;