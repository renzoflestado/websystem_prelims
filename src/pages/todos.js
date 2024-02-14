import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodosPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [todos, setTodos] = useState([]);
  const [user, setUsers] = useState(null);

  useEffect(() => {
      const fetchTodo = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setTodos(json)
        });
    }
    const fetchUser = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setUsers(json)
        });
    }

    fetchTodo()
    fetchUser()
  }, []);


  return (
    <>
      <Button variant="contained" color="primary" onClick={() => router.back()}>Go Back</Button>
      {user && <h3>Todos <span style={{ float: "right" }}>Presented by: {user.name}</span></h3>}
      <Grid container spacing={6}>
        {todos.map(todo => (
          <Grid item key={todo.id} lg={3} md={6} sm={12}>
            <Card sx={{ height:"200px" }}>
              <CardContent>
                <Typography variant="p" component="div">
                  {todo.id}
                  {(todo.completed === true) 
                  ?
                    <CheckBoxIcon sx={{ float: "right" }} />
                  :
                    <CheckBoxOutlineBlankIcon sx={{ float: "right" }} />
                  }
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" component="div">{todo.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TodosPage;
