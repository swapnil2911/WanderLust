import React, { useEffect } from 'react';
import cx from 'clsx';
import { Paper, Typography, CircularProgress, Divider, Avatar, Chip, Box, Card, CardMedia, CardContent } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch, getUserByID } from '../../actions/posts';
import useClasses from './styles';
import useStyles from './cardStyles';
import CommentSection from './CommentSection';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const Post = () => {
  const { creator, post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useClasses();
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
      dispatch(getUserByID(post.creator));
    }
  }, [post]);

  const searchByTag = ({tag}) => {
    dispatch(getPostsBySearch({ search: 'none', tags: tag }));
    history.push(`/posts/search?searchQuery=none&tags=${tag}`);
  }

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPostsTemp = posts.filter(({ _id }) => _id !== post._id);
  const recommendedPosts = recommendedPostsTemp.length > 2 ? recommendedPostsTemp.slice(0,3) : recommendedPostsTemp;

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.imageSection}  >
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        <div className={classes.section} >
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography variant="body1">{moment(post.createdAt).format("dddd, MMMM Do YYYY")}</Typography>
          <Box display = "flex" flexDirection="row">
          {post.tags.map((tag) =>
            <Box p={1} >
            <Chip variant="outlined" className={classes.chip} label={tag} onClick={(e) => searchByTag({tag})}  />
              <span>&nbsp;</span>
            </Box>
          )}
          </Box>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
        </div>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <Avatar className={classes.purple} alt={creator?.data?.name} src={creator?.data?.imageUrl}>{creator?.data?.name?.charAt(0)}</Avatar>
      <Typography variant="h6">Created by: {creator?.data?.name}</Typography>
      <Divider style={{ margin: '20px 0' }} />
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message ,createdAt , selectedFile, _id }) => (
              <Card className={cx(styles.root, shadowStyles.root)}  xs = { 12 } lg = { 6 } style={{ cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id} >
                <CardMedia  className={styles.media}  image={ selectedFile }  />
                <CardContent>
                  <TextInfoContent
                    classes={contentStyles}
                    overline={moment(createdAt).format("dddd, MMMM Do YYYY")}
                    heading={title}
                    body={ message.split(' ').splice(0, 20).join(' ') }
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;