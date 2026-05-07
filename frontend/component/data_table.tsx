'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'email',
    headerName: 'email',
    width: 150,
    editable: false,
  },
  {
    field: 'lastname',
    headerName: 'lastname',
    width: 150,
    editable: false,
  },
  {
    field: 'firstname',
    headerName: 'firstname',
    width: 150,
    editable: false,
  },
  {
    field: 'blocked',
    headerName: 'blocked',
    type: 'boolean',
    width: 100,
    editable: false,

  }
];




export default function DataGridD() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();

        if (response.ok) {
          setRows(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

   if (!isClient) {
      return null;
    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id || row.email}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
