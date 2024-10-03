import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 60px;
	width: 100%;
	border-bottom: 1px solid lightGrey;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: grey;
`;

const PathName = styled.span`
  color: ${props => (props.index === props.pathLength - 1) && "black"};
  text-decoration-color: rgba(0,0,0,0.1);
  text-decoration: ${props => (props.index === props.pathLength - 1) && "underline"};
	cursor: pointer;
`;

const BackButton = styled.img`
  width: 30px;
	height: 30px;
	margin-right: 10px;
  cursor: pointer;

	:hover {
		cursor: pointer;
		color: black;
	}
`;

const SearchInput = styled.input`
	border: 1px solid lightgrey;
	border-radius: 5px;
  margin-right: 100px;
  width: 300px;
  font-size: 16px;
	color: grey;
	cursor: pointer;
	padding: 2px 10px;
  height: 30px;
  outline: none;
`;

const BreadCrumb = ({
  setPath,
  path,
  searchText,
  setSearchText,
  searchDoc,
}) => {

  const crumbs = path?.split("/");
	const pathLength = crumbs?.length;

	const handleSetPath = (crumb) => {
		const index = crumbs.indexOf(crumb);
		const newPath = crumbs.slice(0, index + 1).join("/");
		setPath(newPath);
	};

	const handleBack = () => {
		if (pathLength > 1) {
			const newPath = crumbs.slice(0, pathLength - 1).join("/");
			setPath(newPath);
		}
	};

	const renderPathName = () => (
		<div  style={{
      display: 'flex',
      alignItems: 'center',
      padding: '20px 42px'
    }}>
			<BackButton src="https://cdn-icons-png.flaticon.com/512/55/55008.png" alt="back" onClick={handleBack} />
      <div>
			{crumbs?.map((item, index) => {
				return (
					<span key={index}>
						<PathName
              index={index}
              pathLength={pathLength}
							onClick={() => handleSetPath(item)}>
							{item}
						</PathName>
						<span> {index !== pathLength - 1 && "/"} </span>
					</span>
				);
			})}
      </div>
		</div>
	);

  const renderSearch = () => (
		<SearchInput
			placeholder="search"
			value={searchText}
			onChange={(event) => setSearchText(event.target.value)}
		/>
	);

	const renderSearchText = () => <span style={{marginLeft: '60px'}}>Found results: {searchDoc.length} items</span>;

  return (
    <Container>
      {!searchText ? renderPathName() : renderSearchText()}
      {renderSearch()}
    </Container>
  )
}

export default BreadCrumb;