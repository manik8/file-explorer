import { useState, } from 'react';

import Document from './Components/Document';
import BreadCrumb from './Components/BreadCrumb';
import data from './files';

function App() {
  const [jsonData, setJsonData] = useState(data);
	const [path, setPath] = useState("root");
	const [searchText, setSearchText] = useState("");
  const [searchDoc, setSearchDoc, ] = useState(null);
  return (
    <div>
      <BreadCrumb
        jsonData={jsonData}
				setPath={setPath}
				path={path}
				searchText={searchText}
				setSearchText={setSearchText}
        searchDoc={searchDoc}
      />
      <Document 
        jsonData={jsonData}
        setJsonData={setJsonData}
        path={path}
        setPath={setPath}
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchDoc={setSearchDoc}
      />
    </div>
  );
}

export default App;
