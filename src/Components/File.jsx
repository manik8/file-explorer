import React from 'react';
import styled from 'styled-components';

import FileIcon from '../assets/images/file.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
	border-radius: 10px;
  cursor: pointer;
  
  &:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const Icon = styled.img``;

const Image = styled.div`
  position: relative;
`;

const ExtText = styled.p`
	margin: 0;
	font-size: 16px;
	bottom: 8px;
	left: 5px;
	position: absolute;
	color: white;
`;

const FileName = styled.div`
  padding-top: 2px;
`;

const File = ({ fileName, }) => {
  const ext = fileName.split(".").pop();
  return (
   <Container>
      <Image>
        <Icon src={FileIcon} alt='file image' />
        <ExtText>.{ext}</ExtText>
      </Image>
      <FileName>{fileName}</FileName>
   </Container>
  )
}

export default File;