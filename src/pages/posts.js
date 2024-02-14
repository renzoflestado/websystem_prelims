import { Container, Card, CardContent, Grid, Typography, Button, Modal, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Posts(props) {
  const { loading = false } = props;
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  
        if (Array.isArray(array[i])) {
          shuffleArray(array[i]);
        }
      }
      return array;
    }

    const fetchPost = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json);
        setShuffledPosts(shuffleArray(json));
      })
    }

    const fetchComments = () => {
      fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        setComments(json);
      })
    }

    const fetchUsers = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
      })
    }
    
    fetchPost();
    fetchComments();
    fetchUsers();
    setShuffledPosts(shuffleArray(posts));
    console.log(shuffledPosts)
  }, []);

  const handleViewComments = (postId) => {
    setSelectedPost(postId);
    handleOpen();
  }

  return (
      loading
      ?
      (
        <Skeleton variant="text" />
      )
      :
        <Container maxWidth="md">
          <Grid container spacing={6}>
            {shuffledPosts.map((post, index) => (
              <Grid item lg={12} md={12} key={index}>
                <Card sx={{ height: "300px" }}>
                  <CardContent>
                    <Typography variant="p" component="div">
                      <PersonIcon sx={{ fontSize: "30px" }} /> {users.find((user) => post.userId === user.id)?.name || 'N/A'}<MoreVertIcon sx={{ float: "right" }} />
                    </Typography>
                    <Typography variant="body2" component="div">
                      {users.find((user) => post.userId === user.id)?.email || 'N/A'}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h5" component="div">{post.title}</Typography>
                    <Typography variant="body2" component="div">{post.body}</Typography>
                  </CardContent>
                  <CardContent sx={{ alignItems: "space-evenly" }} >
                    <FavoriteIcon sx={{ fontSize: "20px", color: 'blue' }} /><Button sx={{ fontSize: "20px" }} onClick={() => handleViewComments(post.id)}><CommentIcon /></Button><ReplyIcon sx={{ color: 'blue', fontSize: "20px" }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 24, p: 4, maxHeight: '80vh', overflow: 'auto'}}>
              {comments.map((comment, index) => {
                  if (comment.postId === selectedPost) {
                    return (
                      <Grid sx={{ padding: '10px' }} key={index}>
                        <Card sx={{ height: "100px" }}>
                          <CardContent>
                            <strong>{comment.name}</strong>
                            <Typography variant="p" component="p">{comment.body}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  }
                  return null;
                })}
                <Button variant="contained" color="primary" sx={{ float: "right" }} onClick={handleClose}>Close Modal</Button>
              </Box>
            </Modal>
          </Grid>
        </Container>
  );
}
