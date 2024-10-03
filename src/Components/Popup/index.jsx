import React, { useEffect, useState } from 'react';
import {
  PopupOverlay,
  PopupContent,
  CloseButton,
  SelectToggle,
  FileType,
  Heading,
  InputField,
  Button,
} from './styles';

const Popup = ({ isOpen, onClose, handleSubmit, renameDocument, setDocumentName, documentName, headingName, btnText, }) => {
  const [isActive, setIsActive] = useState({
    file: true,
    folder: false,
  });

  useEffect(() => {
    setIsActive({
      file: renameDocument ? (renameDocument?.type === 'file' ? true : false)  : true,
      folder: renameDocument ? (renameDocument?.type !== 'file' ? true : false) : false,
    });
  }, [renameDocument, ]);

  const toggleActive = (type) => {

    if(renameDocument) return;
    
    setIsActive((prevState) => ({
      file: type === 'file',
      folder: type === 'folder',
    }));
  };

  const handleChange = (e) => {
    setDocumentName(e.target.value);
  };

  return (
    <>
      {isOpen && (
        <PopupOverlay onClick={onClose}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>X</CloseButton>
            <Heading>{headingName}</Heading>
            <SelectToggle>
              <FileType
                type="file"
                isActive={isActive.file}
                renameDocument={renameDocument}
                onClick={() => toggleActive('file')}
              >
                File
              </FileType>
              <FileType
                type="folder"
                isActive={isActive.folder}
                style={{ borderLeft: '0'}}
                renameDocument={renameDocument}
                onClick={() => toggleActive('folder')}
              >
                Folder
              </FileType>
            </SelectToggle>
            <InputField type="text" value={documentName} onChange={handleChange} />
            <Button onClick={() => handleSubmit(isActive, documentName, setIsActive)}>{btnText}</Button>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default Popup;
