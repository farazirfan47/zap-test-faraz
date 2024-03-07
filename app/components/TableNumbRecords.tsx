/**
 * TableNumRecords Component
 * 
 * Displays information about the number of records being viewed in a table.
 * 
 * @param metadata - An object containing metadata about the records, including totalCount and limit.
 * @param currentPage - The current page number being viewed.
 * 
 * @returns JSX.Element - A div element containing information about the number of records being viewed.
 */

export const TableNumRecords = ({metadata, currentPage}: ComponentState) => {
    return (
        <div>
            <span>{`Viewing ${
                metadata.totalCount === 0
                ? 0
                : Math.min(
                    (currentPage - 1) * metadata.limit + 1,
                    metadata.totalCount
                    )
            }-${Math.min(
                currentPage * metadata.limit,
                metadata.totalCount
            )} of ${metadata.totalCount} results`}</span>
        </div>
    )
}