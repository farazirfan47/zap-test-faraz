/**
 * Payout interface representing the structure of payout data.
 */
interface Payout {
    dateAndTime: string;
    status: string;
    value: string;
    username: string;
  }
  
  /**
   * Metadata interface representing the metadata of the payout data.
   */
  interface Metadata {
    page: number;
    limit: number;
    totalCount: number;
  }
  
  /**
   * PayoutResponse interface representing the structure of payout response from the API.
   */
  interface PayoutResponse {
    data: Payout[];
    metadata: Metadata;
  }

  /**
 * ComponentState interface representing the state of the DataTable component.
 */
interface ComponentState {
    currentPage: number;
    searchUsername: string;
    payouts: Payout[];
    metadata: Metadata;
    searchedPayouts: Payout[],
    noDataFound: boolean
  }