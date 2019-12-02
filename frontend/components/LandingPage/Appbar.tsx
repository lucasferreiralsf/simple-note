import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    title: {
      textTransform: "uppercase",
      margin: "6px 0"
    },
    appbar: {
      boxShadow: "none",
      backgroundColor: "transparent"
    },
  })
);

const Appbar = (props?) => {
  const classes = useStyles(props);
  return (
    <Grid item xs={12}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                Simple Note
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <Link href="/signin">
                    <Button variant="outlined" color="inherit">
                      Entrar
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup">
                    <Button variant="contained" color="primary">
                      Criar Conta
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Appbar;