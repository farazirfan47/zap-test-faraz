'use client'
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import { TableTop, TableTopPipe } from './styles/TableTop.styled';
import { ControlContainer, Table, TableDataCell, TableHeader, TableHeaderCell, TableRow, TableWrapper, Wrapper } from './styles/DataTable.styled';
import { StyledInput } from './styles/Input.styled';
import { StyledButton } from './styles/Button.styled';
import { TableNumRecords } from './TableNumbRecords';
import { NoDataFound } from './styles/NoDataFound';
import { parseDate } from '../utils/helper';

/**
 * DataTable component representing the table displaying payout data.
 */
const DataTable = () => {

  const [componentState, setComponentState] = useState<ComponentState>({
    currentPage: 1,
    searchUsername: '',
    payouts: [],
    searchedPayouts: [],
    metadata: { page: 1, limit: 8, totalCount: 0 },
    noDataFound: false
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if we are viewing searched payouts then we don't need to call this API
    if(componentState?.searchedPayouts?.length > 0){
        // Local pagination for searched payouts
        paginateSearchedPayouts()
    }else if(componentState?.searchedPayouts?.length == 0 && !componentState?.noDataFound){
        // Normal flow with pagination via API calls
        fetchPayouts();
    }
  }, [componentState.currentPage, componentState.searchedPayouts]);

  useEffect(() => {
    // Should only run when we have data in payouts
    if(componentState?.payouts?.length > 0){
        const timerId = setTimeout(() => {
        if (componentState.searchUsername.trim() !== '') {
            // Perform search when user stops typing for 300 milliseconds
            handleSearch(componentState.searchUsername);
        }else{
            // Reset to normal flow
            setLoading(true)
            setComponentState((prevState) => ({
                ...prevState,
                metadata: {limit: 8, totalCount: 0, page: 1},
                payouts: [],
                currentPage: 1,
                searchedPayouts: [],
                noDataFound: false
            }));
        }
        }, 300);
        return () => {
            clearTimeout(timerId); // Clear the timer on component unmount or when query changes
        };
    }
  }, [componentState.searchUsername]);

    /**
     * Local paginations for searched payouts
    */
    const paginateSearchedPayouts = () => {
        const searchedPayputs = [...componentState.searchedPayouts]
        const { totalCount, limit } = componentState.metadata;
        const startIndex = (componentState.currentPage - 1) * limit;
        const endIndex = Math.min(componentState.currentPage * limit, totalCount);
        // Paginate the array based on the startIndex and endIndex
        const paginatedData = searchedPayputs.slice(startIndex, endIndex);
        setComponentState((prevState) => ({
            ...prevState,
            payouts: paginatedData,
            metadata: {...componentState.metadata, page: componentState.currentPage}
        }));
    }

  /**
   * Fetches payouts from the API based on the current component state.
   */
  const fetchPayouts = async () => {
    const { currentPage, metadata: {limit} } = componentState;
    const queryParams = `?page=${currentPage}&limit=${limit}`;
    const apiUrl = `https://theseus-staging.medley.gg/api/v1/analytics/tech-test/payouts${queryParams}`;

    try {
      const response = await fetch(apiUrl);
      const data: PayoutResponse = await response.json();
      setComponentState((prevState) => ({
        ...prevState,
        payouts: data.data,
        metadata: data.metadata
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      setLoading(false);
    }
  };

  /**
   * Handles changing the current page of the table.
   * @param pageNumber The page number to navigate to.
   */
  const handleChangePage = (pageNumber: number) => {
    setComponentState((prevState) => ({ ...prevState, currentPage: pageNumber }));
  };

  /**
   * Handles searching for payouts based on the provided username.
   * @param username The username to search for.
   */
  const handleSearch = async (username: string) => {
    const apiUrl = `https://theseus-staging.medley.gg/api/v1/analytics/tech-test/search?query=${username}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setComponentState((prevState) => ({
        ...prevState,
        searchedPayouts: data,
        noDataFound: data?.length == 0 ? true : false,
        metadata: {page: 1, limit: 8, totalCount: data?.length},
        currentPage: 1
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
    {loading && <LoadingIndicator numRowsToCover={8} rowHeight={45} />}
    <TableTop>
        <div>
            <TableTopPipe />
            <h3>Payout History</h3>
        </div>
        <StyledInput
            type="text"
            placeholder="Search by username"
            value={componentState.searchUsername}
            onChange={(e) => setComponentState((prevState) => ({ ...prevState, searchUsername: e.target.value }))}
        />
    </TableTop>
      <TableWrapper loading={loading} >
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>
                Username
              </TableHeaderCell>
              <TableHeaderCell>
                Date & Time
              </TableHeaderCell>
              <TableHeaderCell>
                Status
              </TableHeaderCell>
              <TableHeaderCell>
                Value
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {componentState?.noDataFound ? (
              <TableRow isEven>
                <TableDataCell colSpan={4}>
                  <NoDataFound>No Data Found!</NoDataFound>
                </TableDataCell>
              </TableRow>
            ) : (
              componentState.payouts.map((payout, index) => (
                <TableRow key={index} isEven={index % 2 === 0}>
                  <TableDataCell>{payout.username}</TableDataCell>
                  <TableDataCell>{parseDate(payout.dateAndTime)}</TableDataCell>
                  <TableDataCell>{payout.status}</TableDataCell>
                  <TableDataCell>{payout.value}</TableDataCell>
                </TableRow>
              ))
            )}
            
          </tbody>
        </Table>
      </TableWrapper>

      <ControlContainer>

        <TableNumRecords {...componentState} />

        <div>
          <StyledButton
            onClick={() => handleChangePage(componentState.currentPage - 1)}
            disabled={componentState.currentPage === 1}
          >
            Previous
          </StyledButton>
          <StyledButton
            onClick={() => handleChangePage(componentState.currentPage + 1)}
            disabled={componentState.metadata.page * componentState.metadata.limit >= componentState.metadata.totalCount}
          >
            Next
          </StyledButton>
        </div>
      </ControlContainer>
    </Wrapper>
  );
};

export default DataTable;