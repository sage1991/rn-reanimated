import React, { FC, useCallback, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { TaskItem } from "./components"

const TASKS = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo"
]

export const SwipeToDeleteScreen: FC = () => {
  const scrollRef = useRef<ScrollView>(null)
  const [tasks, setTasks] = useState<string[]>(TASKS)

  const onDismiss = useCallback((text) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== text))
  }, [])

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Task</Text>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        {tasks.map((task) => (
          <TaskItem key={task} onDismiss={onDismiss} simultaneousHandlers={scrollRef}>
            {task}
          </TaskItem>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    margin: 20
  },
  scroll: {
    flex: 1
  },
  scrollContainer: {
    alignItems: "center"
  }
})
