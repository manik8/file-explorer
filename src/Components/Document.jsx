
import React, { useState ,useEffect, } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import File from './File';
import { Folder } from './Folder';
import Popup from './Popup/index';
import AddIcon from '../assets/images/add_new_button.png';
import Menu from './Menu';

const Container = styled.div`
  padding: 20px 20px 0 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit,120px);
`;

const AddImage = styled.img`
	width: 70px;
	margin: 10px;
	cursor: pointer;
`;

const DocumentPage = ({ 
  jsonData,
  setJsonData,
  path,
  setPath,
  searchText,
  setSearchText,
  setSearchDoc,
}) => {
  const [files, setFiles, ] = useState([]); 
  const [copyDocument, setCopyDocument, ] = useState([]);
  const [documentName, setDocumentName, ] = useState(null);
  const [renameDocument, setRenameDocument, ] = useState("");
  const [showModal, setShowModal, ] = useState(false);

  const notify = (msg) => toast.error(msg);

  const searchDocuments = (jsonData, term) => {
    let searchedDocuments = [];
    const regex = new RegExp(term);
  
    const findDocuments = (jsonDataObj) => {
      jsonDataObj.forEach((doc) => {
        if (regex.test(doc.name)) {
          searchedDocuments.push({
            name: doc.name,
            path: doc.path,
            type: doc.type,
          });
        }
  
        if (
          doc.type === "folder" &&
          Array.isArray(doc.children) &&
          doc.children.length > 0
        ) {
          findDocuments(doc.children);
        }
      });
    };
  
    findDocuments(jsonData);
  
    return searchedDocuments;
  };
  

  const getDocument = (pathArr) => {
		let docs = jsonData;
		for (let i = 0; i < pathArr.length; i++) {
			const currPath = pathArr[i];
			const currDir = docs.filter((item) => item.name === currPath);
			docs = currDir[0].children;
		}
		return docs;
	};

	useEffect(() => {
		if (!searchText) {
			const pathArr = path.split("/");
			const docs = getDocument(pathArr);
			setFiles(docs);
      setSearchDoc(docs);
		}
	}, [path, searchText, jsonData]);

	useEffect(() => {
		if (searchText) {
			const foundDocs = searchDocuments(jsonData, searchText);
			setFiles(foundDocs);
      setSearchDoc(foundDocs);
		}
	}, [jsonData, searchText]);

  const updateDocument = (currDir, newChildren, oldData) => {
    return oldData.map((data) => {
      if (data.name === currDir) {
        data.children = newChildren;
        return data;
      } else if (data.type === "folder") {
        return {
          ...data,
          children: updateDocument(
            currDir,
            newChildren,
            data.children || []
          ),
        };
      } else {
        return data;
      }
    });
  };

  function findDocByName(data, targetName) {
    for (const item of data) {
      if (item.name === targetName) {
        return item;
      }
      if (item.type === 'folder' && Array.isArray(item.children)) {
        const result = findDocByName(item.children, targetName);
        if (result) {
          return result;
        }
      }
    }
    return null; // Return null if no match is found
  };

  const addFileFolder = (isActive, inputValue, setIsActive) => {
		const pathArr = path.split("/");

		if (inputValue) {
			const docs = getDocument(pathArr);
      const findDoc = findDocByName(docs, inputValue);
      if(findDoc) {
        notify('File/Folder name already exist');
        return;
      }
			const oldChildren = getDocument(pathArr) || [];
			const newChild = {
				path: path + "/" + inputValue,
				type: isActive.folder ? 'folder' : 'file',
				name: inputValue,
				children: isActive.folder && [],
			};
			let newChildren = [...oldChildren, newChild];

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(jsonData));
			const newData = updateDocument(currDir, newChildren, oldData);
			setJsonData(() => newData);
			setShowModal(false);
      setDocumentName(null);
      setRenameDocument(null);
      setIsActive({
        file: true, 
        folder: false,
      })
		}
	};

  const handleCopy = (item) => {
    setCopyDocument(item);
  };

  const handleRenameModal = (item) => {
    setShowModal(true);
    setRenameDocument(item);
    setDocumentName(item.name)
  };

  const handleRename = () => {
		const item = renameDocument;
		const pathArr = path.split("/");
		if (documentName) {
			const oldChildren = getDocument(pathArr) || [];
			const newChildren = oldChildren.map((doc) => {
				if (item.name === doc.name) {
					const nodePath =
						doc.path
							.split("/")
							.slice(0, doc.path.length - 1)
							.join("/") +
						"/" +
						documentName;
					return {
						path: nodePath,
						name: documentName,
						type: doc.type,
						children: doc.children,
					};
				}
				return doc;
			});

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(jsonData));
			const newData = updateDocument(currDir, newChildren, oldData);
      setJsonData(() => newData);
			setShowModal(false);
      setRenameDocument(null);
      setDocumentName(null);
		}
	};

  const handleDelete = (item) => {
		const pathArr = path.split("/");
		const oldChildren = getDocument(pathArr) || [];
		const newChildren = oldChildren.filter((node) => node.name !== item.name);

		const currDir = pathArr[pathArr.length - 1];
		const oldData = JSON.parse(JSON.stringify(jsonData));
		const newData = updateDocument(currDir, newChildren, oldData);
		setJsonData(newData);
	};

  const handlePaste = () => {
		if (copyDocument) {
			const newDocument = {
				type: copyDocument.type,
				name: copyDocument.name,
				children: copyDocument.children,
				path: path + "/" + copyDocument.name,
			};

			const pathArr = path.split("/");
			const oldChildren = getDocument(pathArr) || [];
			let newChildren = [...oldChildren, newDocument];

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(jsonData));
			const newData = updateDocument(currDir, newChildren, oldData);
			setJsonData(() => newData);
			setCopyDocument();
		}
	};

  return (
    <Menu 
      id='nav-bar-item'
      copyDocument={copyDocument}
      handlePaste={handlePaste}
    >
      <Container>
      {
      Array.isArray(files) &&
						files.map((item, index) =>
							item.type === "file" ? (
                <Menu 
                  id={item.path} 
                  key={index}
                  handleCopy={() => handleCopy(item)}
                  handleRename={() => handleRenameModal(item)}
                  handleDelete={() => handleDelete(item)}
                >
                  <File fileName={item.name} />
                </Menu>
							) : (
									<Menu 
                    id={item.path}
                    key={index}
                    handleCopy={() => handleCopy(item)}
                    handleRename={() => handleRenameModal(item)}
                    handleDelete={() => handleDelete(item)}
                  >
                    <Folder
										folderName={item.name}
										setPath={setPath}
										path={path}
										setSearchText={setSearchText}
										searchText={searchText}
									/>
                  </Menu>
							)
			)}
      <AddImage 
        src={AddIcon}
        alt='Add new folder/file'
        onClick={() => setShowModal(true)}
        
      />
      <Popup 
        isOpen={showModal} 
        headingName={renameDocument ? 'Edit Name' : 'Create New'}
        renameDocument={renameDocument}
        documentName={documentName}
        setDocumentName={setDocumentName}
        onClose={() => {
          setRenameDocument(null);
          setDocumentName(null);
          setShowModal(false);
        }} 
        btnText={renameDocument ? 'Edit' : 'Create'}
        handleSubmit={renameDocument ? handleRename : addFileFolder}
      />
    </Container>
    <ToastContainer />
    </Menu>
  )
}

export default DocumentPage;