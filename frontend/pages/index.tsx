import React from 'react';
import Head from 'next/head';
import 'typeface-roboto';
import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { IndexCard } from '../components/LandingPage/IndexCard';

const cards = [
  {
    slug: 'markdown',
    title: 'Markdown',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmo tempor invidunt ut labore et dolore magna',
    chips: [
      {
        label: 'Creative'
      },
      {
        label: 'Creative'
      }
    ]
  },
  {
    slug: 'video',
    title: 'Video Support',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmo tempor invidunt ut labore et dolore magna',
    chips: [
      {
        label: 'Creative'
      }
    ]
  },
  {
    slug: 'image',
    title: 'Image Support',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmo tempor invidunt ut labore et dolore magna',
    chips: [
      {
        label: 'Creative'
      },
      {
        label: 'Creative'
      },
      {
        label: 'Creative'
      }
    ]
  }
];

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    paperContainer: {
      position: 'relative',
      top: '-200px',
      zIndex: 1
    },
    introImgDiv: {
      zIndex: 1
    },
    introImg: {
      width: '600px'
    },
    introTextContainer: {
      color: palette.primary.contrastText
    },
  })
);
const Home = ({ theme, ...props }: { theme: Theme }) => {
  const classes = useStyles(theme);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.introTextContainer}
          >
            <Grid item>
              <Typography variant="h5" component="h2">
                Lorem ipsum dolor sit amet consetetur.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h2">
                Lorem ipsum dolor sit amet consetetur.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h2">
                Lorem ipsum dolor sit amet consetetur.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="flex-end" justify="flex-end">
            <Grid item className={classes.introImgDiv}>
              <img src="/assets/manboards@2x.png" className={classes.introImg} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ height: '50px'}}>
        <Grid container justify="center" spacing={4} className={classes.paperContainer}>
          {cards.map((card, index) => (
            <IndexCard key={index} theme={theme} card={card} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
