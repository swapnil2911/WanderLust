  import React, { useState, useEffect } from 'react';
  import { Card, CardActions , CardMedia, Button, Typography, ButtonBase, Box, Chip, Avatar } from '@material-ui/core/';
  import { Row, Item } from '@mui-treasury/components/flex';
  import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
  import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
  import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
  import DeleteIcon from '@material-ui/icons/Delete';
  import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
  import { useDispatch } from 'react-redux';
  import moment from 'moment';
  import { useHistory } from 'react-router-dom';


  import { likePost, deletePost, getPostsBySearch } from '../../../actions/posts';
  import useStyles from './styles';
  import { readingTime } from 'reading-time-estimator';

  const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));	
    const [likes, setLikes] = useState(post?.likes);	
    const dispatch = useDispatch();	
    const mediaStyles = useCoverCardMediaStyles();
    const history = useHistory();	
    const classes = useStyles();	
    const userId = user?.result?._id;	
    const tag = post?.tags[0];
    const MinRead = () => {
        const reqMinutes =  readingTime(post.message, 10);
        return reqMinutes.text;
    }

    useEffect(() => {
      if(post.likes)
        setLikes(post.likes);
    },[dispatch,post?.likes]);

    const Likes = () => {	
      if (likes.length > 0) {	
        return likes.find((like) => like === userId)	
          ? (	
            <><FavoriteIcon color="secondary" fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>	
          ) : (	
            <><FavoriteBorderIcon color="secondary" fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>	
          );	
      }

      return <><FavoriteBorderIcon color="secondary" fontSize="small" />&nbsp;Like</>;
    };
    const openPost = (e) => {	
      history.push(`/posts/${post._id}`);	
    };	

    const searchByTag = ({tag}) => {
      dispatch(getPostsBySearch({ search: 'none', tags: tag }));
      history.push(`/posts/search?searchQuery=none&tags=${tag}`);
    }

    return (
      <Card className={classes.card}>
        <Row className={classes.author}  m={0}  p={3}  pt={2}  gap={2}  bgcolor={'common.white'} >
          <Item>
            <Avatar className={classes.avatar} > {post.name?.charAt(0)} </Avatar>
          </Item>
          <Info position={'middle'} useStyles={useNewsInfoStyles}>
            <InfoTitle> <Button onClick={() => history.push(`/profile/${post?.creator}`)} > { post.name } </Button> </InfoTitle>
            <InfoSubtitle>{moment(post.createdAt).fromNow()} | <MinRead /> </InfoSubtitle>
          </Info>
          {(user?.result?._id === post?.creator) && (
            <div className={classes.overlay2} name="edit">
                <Button 
                    onClick={(e) => {	
                        e.stopPropagation();	
                        setCurrentId(post._id);	
                    }}
                    style={{ color: 'white' }} size="small">
                    <MoreHorizIcon color="action" fontSize="default" />
                </Button>
            </div>
          )}
        </Row>
        <ButtonBase	component="span"	name="test"	className={classes.cardAction}  onClick={openPost}	>
          <Box className={classes.main} minHeight={300} position={'relative'}>
              <CardMedia
                  classes={mediaStyles}
                  image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                  title={post.title}
              />
              <div className={classes.content}>
                  <Box display = "flex" flexDirection="row">
                      <Box p={1} >
                          <Chip variant="outlined" className={classes.chip} label={tag} onClick={(e) => searchByTag({tag})}  />
                          <span>&nbsp;</span>
                      </Box>
                  </Box>
                  <Typography variant={'h2'} className={classes.title}> {post.title} </Typography>
              </div>
          </Box>
        </ButtonBase>
        <Row  className={classes.likeDelete}  m={0}  p={3}  pt={2}  gap={2}  bgcolor={'common.white'}  >
          <CardActions className={classes.cardActions}>
            <Button size="small" color="secondary" disabled={!user?.result}  onClick={() => dispatch(likePost(post._id))} >
              <Likes />
            </Button>
          {(user?.result?._id === post?.creator) && (
            <Button className={classes.delete} size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          )}
          </CardActions>
        </Row>
        <div className={classes.shadow} />
        <div className={`${classes.shadow} ${classes.shadow2}`} />
      </Card>
    );
  };

  export default Post;
