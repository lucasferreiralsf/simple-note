import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Theme,
  makeStyles,
  createStyles,
  createMuiTheme
} from '@material-ui/core';
import { GoMarkdown, GoDeviceCameraVideo, GoDeviceCamera } from 'react-icons/go';
import { ThemeProvider } from '@material-ui/styles';
import { SN_THEME } from '../Theme/Theme';

interface ICard {
  slug: string;
  title: string;
  content: string;
  chips: Array<{
    label: string;
  }>;
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      flexWrap: 'nowrap',
      height: '100vh',
      width: '100%'
    },
    title: {
      textTransform: 'uppercase',
      margin: '6px 0',
      color: (props: any) =>
        props.slug === 'markdown'
          ? palette.primary.main
          : props.slug === 'image'
          ? palette.secondary.main
          : '#FFBA63'
    },
    appbar: {
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
    gradientDiv: {
      backgroundImage: 'linear-gradient(to bottom right, #2E6AE2 40%, #020873 100%)',
      height: '500px',
      clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)'
    },
    paperContainer: {
      position: 'relative',
      top: '-200px'
    },
    actionsDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: '0 0 15px 0'
    },
    card: {
      minWidth: '280px',
      maxWidth: '280px',
      minHeight: '300px'
    },
    cardLogo: {
      padding: '10px',
      borderRadius: '50px',
      width: '64px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '14px',
      backgroundColor: (props: any) =>
        props.slug === 'markdown'
          ? palette.primary.light
          : props.slug === 'image'
          ? palette.secondary.light
          : '#FFF1E0',
      color: (props: any) =>
        props.slug === 'markdown'
          ? palette.primary.main
          : props.slug === 'image'
          ? palette.secondary.main
          : '#FFBA63'
    },
    chip: {
      backgroundColor: (props: any) =>
        props.slug === 'markdown'
          ? palette.primary.light
          : props.slug === 'image'
          ? palette.secondary.light
          : '#FFF1E0',
      color: (props: any) =>
        props.slug === 'markdown'
          ? palette.primary.main
          : props.slug === 'image'
          ? palette.secondary.main
          : '#FFBA63',
      margin: '6px 4px 0 0',
      textTransform: 'uppercase',
      fontSize: '0.65em',
      fontWeight: 600
    }
  })
);

const primaryTheme = createMuiTheme({
  palette: {
    primary: {
      main: SN_THEME.palette.primary.main,
      light: SN_THEME.palette.primary.light
    }
  }
});

const secondaryTheme = createMuiTheme({
  palette: {
    primary: {
      main: SN_THEME.palette.secondary.main,
      light: SN_THEME.palette.secondary.light,
      contrastText: 'white'
    }
  }
});

const yellowTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFBA63',
      light: '#FFF1E0',
      contrastText: 'white'
    }
  }
});

export const IndexCard = ({ theme, card, ...props }: { theme: Theme; card: ICard }) => {
  const classes = useStyles(card);
  return (
    <Grid item>
      <Card className={classes.card} elevation={6}>
        <CardContent>
          {card.slug === 'markdown' ? (
            <div className={classes.cardLogo}>
              <GoMarkdown size={36} />
            </div>
          ) : card.slug === 'video' ? (
            <div className={classes.cardLogo}>
              <GoDeviceCameraVideo size={36} />
            </div>
          ) : (
            <div className={classes.cardLogo}>
              <GoDeviceCamera size={36} />
            </div>
          )}
          <Typography variant="h6" component="h2" className={classes.title}>
            {card.title}
          </Typography>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {card.content}
          </Typography>
          <div>
            {card.chips.map((chip, index) => (
              <Chip key={index} size="small" label={chip.label} className={classes.chip} />
            ))}
          </div>
        </CardContent>
        <CardActions>
          <div className={classes.actionsDiv}>
            <ThemeProvider
              theme={
                card.slug === 'markdown'
                  ? primaryTheme
                  : card.slug === 'image'
                  ? secondaryTheme
                  : yellowTheme
              }
            >
              <Button variant="contained" size="large" color="primary">
                Learn More
              </Button>
            </ThemeProvider>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};
