import React from 'react';
import styled from 'styled-components';

import FolderIcon from '../assets/images/folder.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
	border-radius: 10px;

  &:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const Icon = styled.img``;

const Image = styled.div`
  position: relative;
`;

const FileName = styled.div`
  padding-top: 2px;
`;

export const Folder = ({ 
  folderName,
  setPath,
  path,
  setSearchText,
  searchText
 }) => {
  const handleSetPath = () => {
    if (searchText) {
			setPath(path);
			setSearchText();
		} else {
			const newPath = path + "/" + folderName;
			setPath(newPath);
		}
	};

  const handleClick = (e) => {
    if(e.detail === 2) {
      handleSetPath();
    }
  }

  return (
    <Container onClick={handleClick}>
       <Image>
         <Icon src={FolderIcon} alt='folder image' />
       </Image>
       <FileName>{folderName}</FileName>
    </Container>
   )
}
