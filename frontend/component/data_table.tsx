'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'email',
    headerName: 'email',
    width: 150,
    editable: true,
  },
  {
    field: 'lastname',
    headerName: 'lastname',
    width: 150,
    editable: true,
  },
  {
    field: 'firstname',
    headerName: 'firstname',
    width: 170,
    editable: true,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, email: 'fjkfdsj', lastname: 'Jon', firstname: 'jfdkjfsd' },
  { id: 2, email: 'fjkfdsj', lastname: 'Jon', firstname: 'kfdjlfksd' },
  { id: 3, email: 'fjkfdsj', lastname: 'Jon', firstname: 'nfldfdsjk' },
  { id: 4, email: 'fjkfdsj', lastname: 'Jon', firstname: 'jfkdjkfdsjfkd' },
  { id: 5, email: 'fjkfdsj', lastname: 'Jon', firstname: 'jfkdjfksdj' },

];


export default function DataGridD() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}