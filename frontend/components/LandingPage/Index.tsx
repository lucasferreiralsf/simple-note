import {
  Button,
  Typography,
  Grid,
  Divider,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Appbar from './Appbar';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    gradientDiv: {
      // backgroundImage: 'linear-gradient(to bottom right, #2E6AE2 40%, #020873 100%)',
      background:
        'url(/assets/circles@2x.png) repeat-y fixed left top, linear-gradient(to bottom right, #2E6AE2 40%, #020873 100%)',
      backgroundSize: 'contain',
      marginBottom: (props: any) => (props.page === '/' || '' ? '150px' : '0')
      // height: '600px'
      // clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)',
    },
    footerInnerContainer: {
      padding: '16px'
    },
    footerOutContainer: {
      position: 'relative',
      bottom: 0
    }
  })
);

export const IndexLayout = props => {
  const router = useRouter();
  const [page, setPage] = useState(router.pathname);
  const classes = useStyles({ page });

  useEffect(() => {
    const handleRouteChange = url => {
      setPage(url);
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <Grid container direction="column" style={{ overflowX: 'hidden' }}>
      
      <Appbar />

      <div className={classes.gradientDiv}>{props.children}</div>

      {/* <Grid item xs={12} className={classes.children}>
      </Grid> */}

      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.footerOutContainer}
      >
        <Grid item xs={10} style={{ width: '100%' }}>
          <Divider variant="middle" />
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.footerInnerContainer}
          >
            <Grid item xs={4}>
              <Typography
                color="textSecondary"
                variant="body2"
                component="p"
                display="inline"
                gutterBottom
              >
                © 2019
              </Typography>
              <Link href="/">
                <Button color="primary">Simple Note</Button>
              </Link>
            </Grid>
            <Grid item>
              <Button href="https://www.github.com/lucasferreiralsf/simple-note" target="_blank">
                Github
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
