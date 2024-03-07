import styled from 'styled-components';

export const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #6772e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 8px;
    margin-left: 3px;
    margin-right: 3px;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #7795f8;
    }
`;