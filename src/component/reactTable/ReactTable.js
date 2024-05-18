import './ReactTable.css';
import React from "react";
import {useTable, useFilters, usePagination} from "react-table";

export const TextFilter = ({column}) => {
    const {filterValue, setFilter} = column;
    return (
        <input className="filterInput"
               value={filterValue || ""}
               onChange={e => setFilter(e.target.value || undefined)}
               placeholder={`Digite para buscar`}
        />
    );
};

export default function ReactTable({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: {pageIndex, pageSize},
        setPageSize
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        usePagination
    );

    return (
        <div className="tableListSchema">
            {headerGroups.map(headerGroup => (
                <div className="filterInput" key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <div key={column.id} {...column.getHeaderProps()}>
                            {column.enableColumFilter ? <b>{column.render("Header").toUpperCase()}</b> : null}
                            {column.enableColumFilter ? <TextFilter column={column}/> : null}
                        </div>
                    ))}
                </div>
            ))}
            <table {...getTableProps()} className="customTable">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th key={column.id} {...column.getHeaderProps()}>
                                {column.render("Header").toUpperCase()}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                        <tr key={row.id} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td key={cell.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div>
                <button className='customButton' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Anterior
                </button>
                <button className='customButton' onClick={() => nextPage()} disabled={!canNextPage}>
                    Próxima
                </button>
                <div style={{margin: 5}}>
                    Página{' '}
                    <em>
                        {pageIndex + 1} de {pageOptions.length}
                    </em>
                </div>
                <select style={{padding: 5, borderRadius: 5, marginBottom: 15}}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
