import { useEffect } from "react";
import {
  Box, Checkbox, Container, Divider, FormControl,
  IconButton, InputBase, InputLabel, ListItem,
  MenuItem,
  Select, Tooltip, Typography, Zoom
} from "@mui/material";
import { DateTimePicker, MobileDatePicker } from "@mui/lab"
import { useTheme } from "@mui/material/styles"
import moment from 'moment'
import { DeleteOutline } from "@mui/icons-material"

const Task = ({
  isNewTask, selectedItem, task, isDone,
  date, handleTaskChange, handleMenuChange,
  handleDateChange, menuLabels, handleAddTask, id,
  newTasks: _tasks, toggleTaskChange, deleteTask,
}) => {
  const theme = useTheme();
  
  const hanleTaskStatusChange = async () => await toggleTaskChange(id)
  const handleDeleteTask = async () => await deleteTask(id)

  useEffect(() => {
    if (_tasks) {
      _tasks.forEach(t => {
        if (t.id !== '0') {
        // Turn timestamp into date
        const newDate = new Date(parseInt(t.date))
      }})
    }
  }, [_tasks])

  useEffect(() => {
    handleDateChange(new Date())
  }, [handleDateChange])

  return (
    <Zoom style={{ transitionDelay: '100ms'}} in>
      <Container sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        width: { xs: '95%', md: '60%' },
        height: 'fit-content',
        p: 1.5,
        borderRadius: '0.7em',
        flexDirection: { xs: isNewTask && 'column-reverse', md: 'row' },
        mb: isNewTask ? 3.5 : 1.5,
      }}>
        <Box sx={{
          display: 'flex',
          flexGrow: 1,
        }}>
          <Tooltip  
            title={isDone ? 'Mark as not done' : 'Mark as done'}
            placement="top" arrow>
            <Checkbox
              disabled={isNewTask}
              sx={{
                '&.Mui-checked': {
                  color: 'info.main',
                },
              }}
              onChange={hanleTaskStatusChange}
              checked={isDone}
              fontSize="small" />
          </Tooltip>
          <InputBase
            onChange={handleTaskChange}
            value={task}
            readOnly={!isNewTask}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="What's your plan today?"
            multiline
            sx={{
              textDecoration: isDone ? 'line-through' : 'none',
              color: isDone ? 'info.main' : 'text.primary',
              flexGrow: 1,
              mr: 1,
            }}
            inputProps={{ 'aria-label': "what's your plan today?"}} />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'flex-end',
          alignSelf: 'center'
        }}>
          {isNewTask
            ? <DateTimePicker
                label="Pick date and time"
                value={date}
                inputFormat="MMM Do YY, hh:mm A"
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', m: 1,
                      backgroung: '#121212',
                    }}
                    >
                    <InputBase ref={inputRef}
                      {...inputProps}
                      disabled
                      sx={{
                        p: .5,
                        pl: 1,
                        pr: 1,
                        borderRadius: '0.5em',
                        background: `${theme.palette.primary.light}`,
                      }} />
                      {InputProps?.endAdornment}
                  </Box>
                )}
                onChange={handleDateChange} />
            : <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}>
                  <Typography
                    sx={{
                      backgroundColor: 'primary.light',
                      p: 1,
                      pt: 1,
                      pb: 1,
                      mr: 1,
                      minWidth: '9em',
                      borderRadius: '0.7em',
                      fontSize: { xs: '0.6rem', sm: '0.8rem' },
                    }}>
                    {moment(date).format('D MMM, hh A')}
                  </Typography>
                  <Tooltip title="Delete" arrow placement="top">
                    <IconButton
                      color="info"
                      onClick={handleDeleteTask}>
                        <DeleteOutline  />
                    </IconButton>
                  </Tooltip>
              </Box>
          }
          {isNewTask && (
            <>
              <Divider orientation='vertical'
                sx={{
                  m: 1,
                  mr: 2,
                  height: 30,
                }} />
              <FormControl>
                <InputLabel id="my-todo-list">Todos</InputLabel>
                <Select
                  labelId="my-todo-list"
                  id="my-todo-menu"
                  defaultValue={1}
                  value={selectedItem}
                  label="todo"
                  onChange={handleMenuChange}
                  sx={{
                    p: 0,
                    height: 40,
                    mb: 1,
                  }}>
                  {menuLabels.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>
      </Container>
    </Zoom>
  )
}

export default Task
