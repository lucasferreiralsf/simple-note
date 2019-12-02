import React from 'react';
import { INote, PagedResponse } from '../../utils/interfaces/interfaces';
import { Grid, Button, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const MenuButton = React.forwardRef((props: any, ref) => (
  <div
    {...props}
    ref={ref}
    // className={cx(
    //   className,
    //   css`
    //     & > * {
    //       display: inline-block;
    //     }
    //     & > * + * {
    //       margin-left: 15px;
    //     }
    //   `
    // )}
  />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export const Menu = React.forwardRef(
  (
    {
      items,
      createNote,
      onClickNote,
      ...props
    }: { items: PagedResponse<INote>; createNote: Function; onClickNote: Function; theme },
    ref
  ) => {
    const classes = useStyles(props.theme);

    return (
      <Grid container direction="column">
        {/* <Row style={{ margin: '40px 2px' }} className="align-items-center">
        <Col md={9}>
          <InputGroup className="input-group-alternative">
            <Input className="form-control-alternative" placeholder="Search" type="text" />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fa fa-search" style={{}} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col> */}
        <Grid item md={3}>
          <Button
            // className="btn-icon"
            color="primary"
            type="button"
            style={{ padding: 0, borderRadius: '50px', width: '3em', height: '3em' }}
            onClick={() => createNote()}
          >
            Add
          </Button>
        </Grid>
        {items.data
          ? items.data.map(item => (
              <MenuButton ref={ref} key={item.id}>
                <Grid item>
                  {/* <Link href={`/notes/[nid]`} as={`/notes/${item.id}`} replace> */}
                  <Button
                    color="secondary"
                    // className="btn-block"
                    type="button"
                    fullWidth
                    onClick={() => onClickNote({ noteId: item.id })}
                  >
                    <div style={{ textAlign: 'left', paddingLeft: '5px', textTransform: 'none', width: '100%' }}>
                      <h5>{item.title ? item.title : 'Sem Título'}</h5>
                      {item.content.document !== undefined &&
                        (item.content.document.nodes[0].nodes[0].text.length > 30
                          ? `${item.content.document.nodes[0].nodes[0].text.slice(0, 30)}...`
                          : item.content.document.nodes[0].nodes[0].text
                          ? item.content.document.nodes[0].nodes[0].text
                          : 'Sem conteúdo')}
                    </div>
                  </Button>
                  {/* </Link> */}
                </Grid>
              </MenuButton>
            ))
          : null}
      </Grid>
    );
  }
);
