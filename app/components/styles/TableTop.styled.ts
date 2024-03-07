import styled from 'styled-components';

// Styled component for the TableHeader
export const TableTop = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

// Left purple Pipe in the table header
export const TableTopPipe = styled.div`
    width: 16px;
    height: 32px;
    border-radius: 4px;
    background-color: ${({theme}) => theme.table.pipeColor};
    margin-right:15px;
`;