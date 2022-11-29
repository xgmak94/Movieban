import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Tab, Tabs, Typography, Box } from '@mui/material';
import { Movie } from '../../models/movies';
import Column from '../Column/Column';

interface Props {
  columns: Column[];
  handleOnDragEnd: (result: DropResult) => any;
}

interface Column {
  label: String;
  columnData: Movie[];
  setColumnData: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function BasicTabs({ columns, handleOnDragEnd }: Props) {
  const [value, setValue] = React.useState(0);

  function handleChange(_event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box>
        <Box className="flex justify-center">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {columns.map((col) => (
              <Tab
                className="text-black dark:text-white"
                key={col.label as string}
                label={col.label}
              />
            ))}
          </Tabs>
        </Box>
        {columns.map((col, index) => (
          <TabPanel key={col.label as string} value={value} index={index}>
            <Column
              key={col.label as string}
              columnData={col.columnData}
              setColumnData={col.setColumnData}
              columnName={col.label}
            />
          </TabPanel>
        ))}
      </Box>
    </DragDropContext>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
