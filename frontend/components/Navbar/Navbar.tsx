import React from 'react';
import Link from 'next/link';
import { logout } from '../../utils/auth';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// const links = [
//   { href: 'https://zeit.co/now', label: 'ZEIT' },
//   { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
// ].map(link => {
//   link.key = `nav-link-${link.href}-${link.label}`;
//   return link;
// });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavbarHeader = (props) => {
  const classes = useStyles(props.theme);

  return (
  <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Simple Note
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>

  // <nav>
  //   <ul>
  //     <li>
  //       <Link href='/'>
  //         <a>Home</a>
  //       </Link>
  //     </li>
  //     {links.map(({ key, href, label }) => (
  //       <li key={key}>
  //         <a href={href}>{label}</a>
  //       </li>
  //     ))}
  //   </ul>

  //   <style jsx>{`
  //     :global(body) {
  //       margin: 0;
  //       font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
  //         Helvetica, sans-serif;
  //     }
  //     nav {
  //       text-align: center;
  //     }
  //     ul {
  //       display: flex;
  //       justify-content: space-between;
  //     }
  //     nav > ul {
  //       padding: 4px 16px;
  //     }
  //     li {
  //       display: flex;
  //       padding: 6px 8px;
  //     }
  //     a {
  //       color: #067df7;
  //       text-decoration: none;
  //       font-size: 13px;
  //     }
  //   `}</style>
  // </nav>
)};

export default NavbarHeader;
