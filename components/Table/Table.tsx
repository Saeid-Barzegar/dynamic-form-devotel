"use client"

import { FC } from 'react';
import { flexRender, HeaderGroup, Row } from "@tanstack/react-table";
import Pagination from '../Pagination/Pagination';
import { Table, TableContainer, TBody, Tbr, Td, Th, THead, Thr } from './table.elements';
import { TableDataType } from '@/types/submissions.types';
import { TablePropTypes } from './table.types';

const TableComponent: FC<TablePropTypes> = ({ table }) => {

  const headerGroups: HeaderGroup<TableDataType>[] = table.getHeaderGroups();
  const rows: Row<TableDataType>[] = table.getRowModel().rows;

  return (
    <TableContainer>
      <Table>
        <THead>
          {headerGroups.map(headerGroup => (
            <Thr key={headerGroup.id}>
              {headerGroup?.headers.map(header => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Thr>
          ))}
        </THead>
        <TBody>
          {rows.map((row) => {
            const cells = row.getVisibleCells();
            return (
              <Tbr key={row.id}>
                {cells.map(cell => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tbr>
            )
          })}
        </TBody>
      </Table>
      <Pagination
        table={table}
      />
    </TableContainer>
  )
}

export default TableComponent;