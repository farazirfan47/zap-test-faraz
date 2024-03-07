import React from 'react';
import styled from 'styled-components';

const LoadingIndicator: React.FC<{ numRowsToCover: number; rowHeight: number }> = ({
    numRowsToCover,
    rowHeight,
  }) => {
    const indicatorHeight = numRowsToCover * rowHeight;
  
    return (
      <LoadingContainer height={indicatorHeight}>
        <Spinner />
      </LoadingContainer>
    );
  };
  
  interface LoadingContainerProps {
    height: number;
  }
  
  const LoadingContainer = styled.div<LoadingContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${(props) => props.height}px;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  
export default LoadingIndicator;