'use client';
import { useState, useEffect, ReactEventHandler } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

interface User {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  blocked: boolean;
}



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


export default function DataGridD({ onSelectionChange }: { onSelectionChange?: (id: number) => void }) {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsClient(true));
    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user', {
          method: 'GET',
          credentials: 'include',
        });
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

  const handleRowClick = (params: GridRowParams) => {
    if (onSelectionChange) {
      onSelectionChange(params.id as number);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id || row.email}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}