import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import 'isomorphic-unfetch';
import Head from 'next/head';
import NavbarHeader from '../../components/Navbar/Navbar';
import { Menu } from '../../components/Menu/Menu';
import { INote, PagedResponse } from '../../utils/interfaces/interfaces';
import EditorComponent from '../../components/Editor/Editor';
import { withAuthSync } from '../../utils/auth';
import { Grid } from '@material-ui/core';
import 'typeface-roboto';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      flexWrap: 'nowrap',
      height: '100vh',
      width: '100%'
    },
    menu: {
      backgroundColor: '#f4f5f7'
    },
    container: {
      height: '100%',
      width: '100%',
      flexWrap: 'nowrap',
    },
    editor: {
      padding: '20px'
    },
    paper: {
      padding: spacing(2),
      textAlign: 'center',
      color: palette.text.secondary
    }
  })
);

const Notes = ({ res, notes, ...ctx }: { res: any; notes: any; theme; token; req }) => {
  const classes = useStyles(ctx.theme);
  const router = useRouter();

  const [notesState, setNotesState]: [
    PagedResponse<INote>,
    React.Dispatch<PagedResponse<INote>>
  ] = useState({});

  const [noteState, setNoteState]: [INote, React.Dispatch<INote>] = useState(
    notesState.data ? notesState.data[0] : {}
  );

  useEffect(() => {
    if (notes) {
      setNotesState(notes);
    } else {
      redirectOnError();
    }
  }, [notes]);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? router.push('/signin')
      : res.writeHead(302, { Location: '/signin' }).end();

  const createNote = async event => {
    const { token } = nextCookie(ctx);

    const res = await fetch('/api/notes', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Authorization: token
      }
    });

    if (res.status === 200) {
      router.replace('/notes');
    } else {
      throw new Error();
    }
  };

  const onClickNote = async ({ noteId }) => {
    const { token } = nextCookie(ctx);
    const res = await fetch(`/api/notes/noteById?nid=${noteId}`, {
      credentials: 'same-origin',
      headers: {
        Authorization: token
      }
    });
    if (res.status === 200) {
      const note = await res.json();
      setNoteState(note);
    } else {
      throw new Error();
    }
  };

  const onchange = async ({ value, note }) => {
    const { token } = nextCookie(ctx);
    const res = await fetch(`/api/notes?nid=${note.id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        Authorization: token
      },
      body: JSON.stringify({ content: JSON.stringify(value).toString() })
    });
    if (res.status === 200) {
      const note = await res.json();
    } else {
      throw new Error();
    }
  };

  return (
    <Grid container className={classes.root} direction="column">
      <Head>
        <title>Layout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHeader />

      <Grid container direction="row" className={classes.container}>
        <Grid item xs={4} className={classes.menu}>
          <Menu
            items={notesState}
            createNote={createNote}
            onClickNote={onClickNote}
            theme={ctx.theme}
          />
        </Grid>
        <Grid item xs={1}>
          <div id="sn-options-menu"></div>
        </Grid>
        <Grid item xs={7} className={classes.editor}>
          {noteState.content && (
            <Fragment>
              <div>Title here</div>
              <EditorComponent note={noteState} onChange={onchange} />
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

Notes.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  console.log(token)
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? `https://simplenote.becoder.com.br/api/notes`
      : process.env.NODE_ENV === 'development'
      ? `http://localhost:4000/api/notes`
      : `http://localhost:4000/api/notes`;

  try {
    const response = await fetch(apiUrl, {
      credentials: 'same-origin',
      headers: {
        Authorization: token
      }
    });

    if (response.ok) {
      const notes = await response.json();
      return { notes };
    } else {
      // https://github.com/developit/unfetch#caveats
      return null;
    }
  } catch (error) {
    // Implementation or Network error
    return null;
  }
};

export default withAuthSync(Notes);
