import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Paper, Typography, Divider, Avatar, IconButton, Grid, TextField } from '@material-ui/core/';
import Form from './../Form/Form';
import Posts from './../Posts/Posts';
import useStyles from './styles';
import { getPostByUser, getUserByID } from './../../actions/posts';
import AvatarEdittable from 'react-avatar-edit'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { updateUser } from './../../actions/posts';
import useStateRef from 'react-usestateref';


const Profile = () => {
    const user = JSON.parse(localStorage.getItem('profile'));	
    const creator = useSelector((state) => state.posts);
    const [creatorNew, setCreatorNew] = useState(creator);
    const [currentId, setCurrentId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();	
    useEffect(() => {
        dispatch(getPostByUser(id));
        dispatch(getUserByID(id));
    }, [id]);
    const onCrop = (preview) => {
        setPreview(preview);
    };
    const userChange = () => {
        setIsEditing(!isEditing);
        if(preview === null)
            dispatch(updateUser(user?.result?._id,{...creatorNew, imageUrl: creator?.creator?.data?.imageUrl}));
        else
            dispatch(updateUser(user?.result?._id,{...creatorNew, imageUrl: preview}));
        //window.location.reload();
    };
    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            <Grid item xs={12}>
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}> 
                    {(user?.result?._id === creator?.creator?.data?._id) ? [
                            ( isEditing ?
                                <div>
                                    <IconButton  className = {classes.iconButton} onClick={userChange}>
                                        <CheckIcon />
                                    </IconButton>
                                    <Grid container spacing={1}>
                                        <Grid container item xs = {1} />
                                        <Grid container item xs = {11} md = {8} >
                                            <Grid   item xs = {3} >
                                                <img src={creatorNew.preview || creator?.creator?.data?.imageUrl} />
                                            </Grid>
                                            <Grid  item xs = {6} >
                                                <Typography className={classes.creatorName} variant="h5">Name: {creator?.creator?.data?.name}</Typography>
                                                {/* <TextField id="outlined-multiline-static" onChange={(e) => setCreatorNew({...creatorNew,aboutMe: e.target.value})} label="About Me" multiline rows={4} variant="outlined" fullWidth value = {creatorNew.aboutMe} /> */}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs = {12} md = {3}>
                                            <AvatarEdittable
                                                width={250}
                                                height={155}
                                                onCrop={onCrop}
                                                exportAsSquare={true}
                                                exportSize={100}
                                                label={"Chose Profile Pic"}
                                                // src={creator?.creator?.data?.imageUrl}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>   :
                                <div>
                                    {/* <IconButton colour="primary" className = {classes.iconButton} onClick={() => setIsEditing(!isEditing)}>
                                        <EditOutlinedIcon />
                                    </IconButton> */}
                                    <Avatar className={classes.purple} alt={creator?.creator?.data?.name} src={creator?.creator?.data?.imageUrl}>{creator?.creator?.data?.name?.charAt(0)}</Avatar>
                                    <Typography className={classes.creatorName} variant="h5">{creator?.creator?.data?.name}</Typography>
                                    {/* <Typography className={classes.creatorName} variant="h6">{creator?.creator?.data?.aboutMe}</Typography> */}
                                </div>
                            )
                    ]
                    : (
                        <div>
                            <Avatar className={classes.purple} alt={creator?.creator?.data?.name} src={creator?.creator?.data?.imageUrl}>{creator?.creator?.data?.name?.charAt(0)}</Avatar>
                            <Typography className={classes.creatorName} variant="h5">{creator?.creator?.data?.name}</Typography>
                            {/* <Typography className={classes.creatorName} variant="h6">{creator?.creator?.data?.aboutMe}</Typography> */}
                        </div>
                     )}
                </Paper>
                <Divider style={{ margin: '20px 0' }} />
            </Grid>
            <Grid item xs={12} sm={7} md = {9}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        </Grid>
    );
};

export default Profile;