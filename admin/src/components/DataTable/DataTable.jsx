import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';




const DataTable = ({rows,columns,rowsPerPageOption,h}) => {
  const [wid,setWidth]=useState(1);
  return (
  <>
  <Box>
      <DataGrid
       sx={{
      
        activeSortIcon: {
          opacity: 1,
          color : 'white',
        },
        inactiveSortIcon: {
          opacity: 0.4,
          color : 'white',
        },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
             outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-olumn--cell:focus-within": {
            outline: "none !important",
         },
         "&.MuiTouchRipple-root":{
              color:"white"
         },
       
      
        height:"100vh",width:wid==1 ? "80vw":"90vw",
        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        // '&.MuiDataGrid-root': {
        //   border: 'none',
        // },
        "& .MuiDataGrid-root": {
          borderBottom: "1px solid black",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid black",
        },
        "& .salaryStatus-column--cell": {
          color:"green",
        },
       
        // "& .MuiDataGrid-virtualScroller": {
        //   backgroundColor:"blueviolet",        // color the background of the table
        // },
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
          },
          '& .MuiDataGrid-column-cell:focus': {
            outline: 'none',
            },
          
        // "&.MuiDataGrid-columnHeaderTitle":{
        //     // color:"red",
        //     // fontSize:"8rem",
        //     fontWeight:600
          
        // },
        // "&.css-1jbbcbn-MuiDataGrid-columnHeaderTitle":{
        //   fontWeight:600
        // },
      
        "& .MuiDataGrid-footerContainer": {
          color:"white",
          borderTop: "none",
          backgroundColor:"#009df1",
         
        },
      
      
        "& .MuiDataGrid-columnHeaders": {
          color:"white;",
         
          backgroundColor: "#009df1",
           
          fontSize:"17px",
          // fontWeight:900
        },
       " .MuiPagination-root": {
          "button": {
            color: "red !important"
         }
        },
        "& .MuiPaginationItem-root": {
          color: "white"
        },
        "&.MuiTablePagination-actions":{
             button:{
              color:"white"
             }
        },
        "&.MuiButtonBase-root-MuiIconButton-root.Mui-disabled":{
               color:"white"
        },
        MuiPagination: {
          styleOverrides: {
              root: {
                  button: {
                      color: 'white'
                  },
              },
          },
      }
        
       
      }}
    
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[20]}
      // disableColumnMenu
        autoHeight={true}
        autoPageSize={true}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  </>
  )
}

export default DataTable