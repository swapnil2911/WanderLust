import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
    backgroundBlendMode: 'darken !important',
  },
  chip: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    fontFamily: "'Sen', sans-serif",
    '&:hover': {
      color: 'red !important',
      backgroundColor: 'white !important',  
      borderRadius: '0.5rem !important',
      marginBottom: '0.5rem !important',
      fontFamily: "'Sen', sans-serif !important",
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));