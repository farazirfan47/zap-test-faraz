/**
 * styled-components Documentation:
 * This file contains styled components for various UI elements.
 */

import styled from 'styled-components';

/** Wrapper Component */
export const Wrapper = styled.div`
    position: relative;
`;

/** ControlContainer Component */
export const ControlContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

/**
 * TableWrapper Component
 * @param loading - Indicates whether the table is loading or not.
 */
export const TableWrapper = styled.div<{ loading: boolean }>`
    width: 100%;
    overflow-x: auto;
    margin-top: 1rem;
    min-height: 360px;
    filter: ${(props) => (props.loading ? 'blur(4px)' : 'none')};
`;

/** Table Component */
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

/** TableHeader Component */
export const TableHeader = styled.thead`
    background-color: #f6f9fc;
`;

/**
 * TableRow Component
 * @param isEven - Indicates if the row is even.
 */
export const TableRow = styled.tr<{ isEven: boolean }>`
    background-color: ${(props) => (props.isEven ? '#ffffff' : '#f6f9fc')};
`;

/**
 * TableDataCell Component
 * @param colSpan - Optional colspan for the cell.
 */
export const TableDataCell = styled.td<{colSpan?: number}>`
    padding: 12px;
    border-bottom: 1px solid #eaeaea;
    color: #4a4a4a;
    vertical-align: middle;
    text-align: left;
`;

/** TableHeaderCell Component */
export const TableHeaderCell = styled.th`
    padding: 12px;
    border-bottom: 1px solid #eaeaea;
    color: #4a4a4a;
    vertical-align: middle;
    text-align: left;
    position: relative;
    cursor: pointer;
`;