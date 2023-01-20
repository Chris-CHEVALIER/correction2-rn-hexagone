import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function MovieForm (props) {
  return (
    <View>
      <Text>Nom du film</Text>
      <TextInput
        style={styles.title}
        onChangeText={props.handleTitleChange}
        value={props.title}
        placeholder='Titre du film'
      ></TextInput>
      <Text>Synopsis</Text>
      <TextInput
        style={[styles.title, styles.synopsis]}
        onChangeText={props.handleSynopsisChange}
        value={props.synopsis}
        placeholder='Synopsis'
        multiline
      ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    border: '1px solid black',
    padding: 10,
    height: 40
  },
  synopsis: {
    height: 120
  }
})
