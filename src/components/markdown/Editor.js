import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const RichTextEditor = ({ state, setState }) => {
  return (
    <div style={{
      border: '2px solid #ccc',
      height: 200,
      overflow: 'scroll'
    }}
    >
      <Editor
        editorState={state}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={setState}
        placeholder="The message goes here..."
      />
    </div>
  );
};

export default RichTextEditor;
