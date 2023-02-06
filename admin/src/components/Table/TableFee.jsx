import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function DataTable({rows,columns}) {
  return (
    <div style={{  width: '100%' }}>
      <DataGrid
      sx={{
        height:"auto",
        borderRadius:"9px",
      
        "& .MuiDataGrid-columnHeaders": {
          color:"white",
          borderTop: "none",
          backgroundColor:"#08a3f6fb",
         
       
          // color:"009df1",
           
          fontSize:"17px",
          // fontWeight:900
        },
        "& .MuiDataGrid-footerContainer": {
          color:"white",
          borderTop: "none",
          backgroundColor:"#08a3f6fb",
        },
        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
       },
       "&.MuiDataGrid-root .MuiDataGrid-olumn--cell:focus-within": {
         outline: "none !important",
      },
      "& .MuiDataGrid-root": {
        borderBottom: "1px solid black",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "1px solid black",
      },
      
   
      }}
        rows={rows}
        columns={columns}
        hideFooterPagination
        hideFooterSelectedRowCount
        disableColumnMenu
        autoHeight={true}
       
      />
    </div>
  );
}
