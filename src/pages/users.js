import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Users = () => {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = () => {
            fetch('https://jsonplaceholder.typicode.com/users/')
            .then(response => response.json())
            .then(json => {
              setUsers(json);
            })
        }

        fetchUsers()
    }, [])

  return (
    <Grid container spacing={6}>
      {users.map(user => {
        return (
          <Grid item lg={6} md={12} sm={12} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant='p' component='div'>{user.name}</Typography>
                <Typography variant='body2' component='div'>{user.username}</Typography>
                <Typography variant='body2' component='div'>{user.email}</Typography>
                <Typography variant='body2' component='div'>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Typography>
                <Typography variant='body2' component='div'>{user.phone}</Typography>
                <Typography variant='body2' component='div'>{user.website}</Typography>
                <Button 
                  onClick={() => router.push(`/todos?userId=${user.id}`)} 
                  sx={{ float: "right" }}
                >
                  View Todos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default Users;
