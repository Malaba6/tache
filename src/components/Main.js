import { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, Slide, Typography, Collapse, IconButton, Tooltip
} from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { BlurCircular, Brightness7, Brightness4 } from "@mui/icons-material"
import moment, { now } from 'moment'
require("moment/min/locales.min")
import { TransitionGroup } from 'react-transition-group'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'next-i18next'

import Task from "./Task"
import { getDatesMenu, sortList } from "../utils"
import { useDarkMode } from "../hooks/useDarkMode";

const Main = ({
  createTask, tasks, setTasks, toggleTaskChange,
  deleteTask, locale
}) => {
  const theme = useTheme()
  const { toggleColorMode } = useDarkMode()
  const { t } = useTranslation()

  const [selectedItem, setSelectedItem] = useState(1)
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [when, setWhen] = useState({})
  const [tasks_, set_Tasks] = useState([])
  
  const [menuLabels, setMenuLabels] = useState([{
    label: t('home:sort'),
    value: 1
  }])

  useEffect(() => {
    getDatesMenu({
      when, setWhen, tasks,
      setMenuLabels, menuLabels
    })
  }, [tasks, menuLabels])

  const handleMenuChange = e => {
    setSelectedItem(e.target.value)
    const item = menuLabels.find(l => l.value === e.target.value)
    const { label } = item

    const tasks_ = when[label]

    set_Tasks(tasks_ || [])
  }

  const handleDateChange = useCallback(newDate => setDate(newDate), [])

  const handleTaskChange = e => setTask(e.target.value)

  const handleAddTask = async() => {
    if (task) {
      const time = date < new Date() ? new Date() : date
      const dateInSeconds = moment(time).valueOf()

      await createTask(task, dateInSeconds)

      setTask('')
    }
  }

  const getGreetings = (hour) => {
    return hour < 12 ? 'Good morning'
      : hour < 16 ? 'Good afternoon'
      : 'Good evening'
  }

  const getTranslation = (greeting) => {
    switch (greeting) {
      case 'Good morning':
        return t('home:morning')
      case 'Good afternoon':
        return t('home:afternoon')
      case 'Good evening':
        return t('home:evening')
    }
  }

  const tasks__ = tasks_.length ? tasks_ : sortList(tasks)
  const greeting = getGreetings(moment().hour())
  
  return (
    <Box sx={{
      height: '100%',
      mt: 4,
      mb: 4,
    }}>
      <Grid container sx={{
        width: {xs: '98%', md: '72%'},
        m: '0 auto',
        mb: 8,
      }}>
        <Grid container item xs={2} sm={1}
          justifyContent='center'>
          <BlurCircular fontSize="large" sx={{
            color: 'secondary.main',
          }} />
        </Grid>
        <Grid container direction='column' item
          alignItems="flex-start"
          xs={10} sm={11}>
            <Typography variant="h4">
              {t("home:greeting", { greeting: getTranslation(greeting) })}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5em',
                color: 'text.secondary',
              }}>{`${t("home:time")} ${moment(new Date())
                .locale(locale).format('dddd, MMM DD')}`}</Typography>
        </Grid>
      </Grid>
      <Box container item justifyContent='center' direction='column' alignItems='center' sx={{
        height: '100%'
      }}>
        <Task
          isNewTask
          selectedItem={selectedItem}
          task={task}
          locale={locale}
          date={date}
          handleTaskChange={handleTaskChange}
          handleMenuChange={handleMenuChange}
          handleDateChange={handleDateChange}
          handleAddTask={handleAddTask}
          menuLabels={menuLabels} />
        <TransitionGroup>
          {tasks__.map(({id, content, date, isDone}) => id !== '0'
            ? (<Collapse key={id}>
                <Task
                  key={id}
                  id={id}
                  task={content}
                  date={new Date(parseInt(date))}
                  isDone={isDone}
                  locale={locale}
                  tasks={tasks}
                  setTasks={setTasks}
                  deleteTask={deleteTask}
                  toggleTaskChange={toggleTaskChange}
                  handleDateChange={handleDateChange} />
                </Collapse>)
            : null
            )}
        </TransitionGroup>
      </Box>
      <Box>
        <Tooltip
          title={theme.palette.mode === 'dark'
            ? t('home:light')
            : t('home:dark')}>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              bottom: 0,
              left: 0,
              position: 'fixed',
            }}>
            {theme.palette.mode === 'light'
              ? <Brightness7 fontSize="medium" />
              : <Brightness4 fontSize="medium" />
            }
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Main
