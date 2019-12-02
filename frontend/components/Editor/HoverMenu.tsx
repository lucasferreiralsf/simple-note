import React from 'react';
import ReactDOM from 'react-dom';

import './editor.styles.scss';
import { Button } from '@material-ui/core';

const Menu = React.forwardRef(({ className, ...props }: any, ref) => (
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
    className="hover-menu"
  />
));

const MarkButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some(mark => mark.type === type);
  return (
    <Button
      className={`btn-icon btn-2 ${isActive ? 'active' : ''}`}
      color="secondary"
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        editor.toggleMark(type);
      }}
    >
      <span className="btn-inner--icon">
        <i className={`fa fa-${icon}`} />
      </span>
    </Button>
  );
};

class HoverMenu extends React.Component<{ editor: any; forwardRef: any }> {
  componentDidMount() {
    this.element = document.getElementById('sn-modal');
    this.forceUpdate();
  }

  element;

  render() {
    // return React.forwardRef((props: any, ref) => {
    if (this.element === undefined) {
      return null;
    }
    const { editor, forwardRef } = this.props;
    const root = document.getElementById('sn-modal');
    return ReactDOM.createPortal(
      <Menu
        ref={forwardRef}
        // className={css`
        //   padding: 8px 7px 6px;
        //   position: absolute;
        //   z-index: 1;
        //   top: -10000px;
        //   left: -10000px;
        //   margin-top: -6px;
        //   opacity: 0;
        //   background-color: #222;
        //   border-radius: 4px;
        //   transition: opacity 0.75s;
        // `}
        
      >
        <MarkButton editor={editor} type="bold" icon="bold" />
        <MarkButton editor={editor} type="italic" icon="italic" />
        <MarkButton editor={editor} type="strikethrough" icon="strikethrough" />
        <MarkButton editor={editor} type="underline" icon="underline" />
        <MarkButton editor={editor} type="code" icon="code" />
      </Menu>,
      this.element
    );
    // });
  }
}

export default HoverMenu;
