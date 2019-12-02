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
    className="options-menu"
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
        // ReactDOM.createPortal()
      }}
    >
      <span className="btn-inner--icon">
        <i className={`fa fa-${icon}`} />
      </span>
    </Button>
  );
};

class OptionsMenu extends React.Component<{ editor: any; forwardRef: any }> {
  componentDidMount() {
    this.element = document.getElementById('sn-options-menu');
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
        <MarkButton editor={editor} type="bold" icon="plus" />
      </Menu>,
      this.element
    );
    // });
  }
}

export default OptionsMenu;
