import React, { useEffect, useState, useRef, useContext, SetStateAction } from 'react';
import { Editor, OnChangeFn, OnChangeParam } from 'slate-react';
import { Value } from 'slate';
import { EditorPlugins } from './EditorPlugins';
import HoverMenu from './HoverMenu';
import { INote } from '../../utils/interfaces/interfaces';
import OptionsMenu from './OptionsMenu';

const init = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: ''
          }
        ]
      }
    ]
  }
});

const normalizeContent = content => JSON.parse(content);

const EditorComponent = ({ note, onChange }: { note?: INote, onChange: Function }) => {
  const [contentValue, setContentValue]: [
    Value,
    React.Dispatch<SetStateAction<Value>>
  ] = useState(Value.fromJSON(normalizeContent(note.content)));

  let menu = useRef(null);
  let optionsMenu = useRef<HTMLInputElement>(null);
  useEffect(() => {
    updateMenu(menu, contentValue);
    updateOptionsMenu(optionsMenu, contentValue);
  });

  useEffect(() => {
    setContentValue(Value.fromJSON(normalizeContent(note.content)));
  }, [note.content]);

  const updateOptionsMenu = (menuRef, value: Value) => {
    const optionMenu: HTMLElement = menuRef.current;
    if (!optionMenu) return;

    const { fragment, selection } = value;

    if (selection.isBlurred) {
      optionMenu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    optionMenu.style.opacity = '1';
    optionMenu.style.top = `${rect.top - optionMenu.offsetHeight / 2 }px`;

    // optionMenu.style.left = `25%`;
  };

  const updateMenu = (menuRef, value) => {
    const menu: any = menuRef.current;
    if (!menu) return;

    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  };

  // On change, update the app's React state with the new editor value.

  const onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();

    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      }

      default: {
        return next();
      }
    }
  };

  const renderEditor = (props, editor, next) => {
    const children = next();
    return (
      <React.Fragment>
        {children}
        {/* <h1>Teste</h1> */}
        <HoverMenu forwardRef={menu} editor={editor} />
        <OptionsMenu forwardRef={optionsMenu} editor={editor} />
      </React.Fragment>
    );
  };

  const onChangeValue = ({ value }: OnChangeParam) => {
    setContentValue(value);
    onChange({value, note});
  };

  const renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>;
      // Add our new mark renderers...
      case 'code':
        return <code>{props.children}</code>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'strikethrough':
        return <del>{props.children}</del>;
      case 'underline':
        return <u>{props.children}</u>;
      default:
        return next();
    }
  };

  return (
    <Editor
      placeholder="Digite alguma coisa aqui."
      value={contentValue}
      onChange={onChangeValue}
      onKeyDown={onKeyDown}
      renderMark={renderMark}
      plugins={EditorPlugins}
      renderEditor={renderEditor}
    />
  );
};

export default EditorComponent;
