import React from 'react';
import styled from 'styled-components';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import "./react-contextmenu.css";

const DeleteStyle = styled.div`
  color: red;

  &:hover {
    color: white;
  }
`;

const Menu = ({
  id, 
  children,
  handleCopy,
  handleRename,
  handleDelete,
  copyDocument,
  handlePaste, 
}) => {
  return (
    <>
      <ContextMenuTrigger id={id}>{children}</ContextMenuTrigger>

      <ContextMenu id={id}>
        {
          (copyDocument && id === 'nav-bar-item') ? (
            <MenuItem onClick={handlePaste}>Paste</MenuItem>
          ) : (
            <>
            <MenuItem onClick={handleCopy}>Copy</MenuItem>
            <MenuItem onClick={handleRename}>Rename</MenuItem>
            <MenuItem onClick={handleDelete}><DeleteStyle>Delete</DeleteStyle></MenuItem></>
          )
        }
        
      </ContextMenu>
    </>
  );
}

export default Menu;