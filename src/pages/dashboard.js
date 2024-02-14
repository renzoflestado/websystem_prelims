import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
import PersonIcon from '@mui/icons-material/Person';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CommentIcon from '@mui/icons-material/Comment';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { FullscreenExit } from "@mui/icons-material";

const Dashboard = () => {
    const [posts, mgaPost] = useState([]);
    const [users, mgaUser] = useState([]);
    const [comments, mgaComment] = useState([]);
    const [todos, mgaTodo] = useState([]);
    useEffect(() => {
        const fetchPost = () => {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json =>{
      
              mgaPost(json)
              console.log(json)
            })
        }
        const fetchUser = () => {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json =>{
      
              mgaUser(json)
              console.log(json)
            })
        }
        const fetchComment = () => {
            fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(json =>{
      
              mgaComment(json)
              console.log(json)
            })
        }
        const fetchTodo = () => {
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json =>{
      
              mgaTodo(json)
              console.log(json)
            })
        }
        
        fetchPost()
        fetchUser()
        fetchComment()
        fetchTodo()
        
    }, [])
    return (
        <>
            <Container>
            <Grid container spacing = {2} sx={{ paddingBottom: 5 }}>
                <Grid item lg = {3} md = {6} sm = {12}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="p" component="div"><PersonIcon sx={{ fontSize: "20px", paddingRight: "30px" }}/>{users.length} users</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg = {3} md = {6} sm = {12}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="p" component="div"><DynamicFeedIcon sx={{ fontSize: "20px", paddingRight: "30px" }}/>{posts.length} posts</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg = {3} md = {6} sm = {12}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="p" component="div"><CommentIcon sx={{ fontSize: "20px", paddingRight: "30px" }}/>{comments.length} comments</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg = {3} md = {6} sm = {12}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="p" component="div"><DomainVerificationIcon sx={{ fontSize: "20px", paddingRight: "30px" }}/>{todos.length} todos</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <LineChart />
            </Container>
        </>
    );
}
 
export default Dashboard;