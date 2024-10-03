import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContent = styled.div`
  background: #fff;
  padding: 36px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 270px;
  width: 100%;
  position: relative;
`;

export const CloseButton  = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
  color: #555;

  &:hover {
    color: #000;
  }
`;

export const Heading = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const SelectToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const FileType = styled.div`
  padding: 8px 20px;
  border: 1px solid #DFE3E4;
  border-radius: ${props => props.type ==='file' ? '6px 0 0 6px' : '0 6px 6px 0'};
  background: ${props => props.isActive ? '#49B8FF' : ''};
  cursor: ${props => props.renameDocument ? 'not-allowed' : 'pointer'};
`;

export const InputField = styled.input`
  width: -webkit-fill-available;
  height: 24px;
  margin-top: 30px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #DFE3E4 !important;
  font-size: 16px;
  outline: none;
`;

export const Button = styled.div`
  margin-top: 20px;
  background: #49B8FF;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border-color: transparent;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
