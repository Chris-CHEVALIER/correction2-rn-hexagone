import { Modal, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AddButton from './AddButton'
import MovieForm from './MovieForm'
import Fire from '../Fire'

export default function MovieModal (props) {
  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')

  /*   useEffect(() => {
    console.log('Le composant nait !')

    return () => {
      console.log('Le composant meurt... :( ')
    }
  }, []) */

  const handleSubmit = () => {
    const firebase = new Fire()
    firebase.addMovie({
      title: title,
      synopsis: synopsis,
      comments: []
    })
    props.onClose()
  }

  return (
    <Modal visible={props.isVisible}>
      <View style={styles.modalContent}>
        <MovieForm
          title={title}
          synopsis={synopsis}
          handleTitleChange={newTitle => setTitle(newTitle)}
          handleSynopsisChange={newSynopsis => setSynopsis(newSynopsis)}
        />
        <AddButton
          content='Valider'
          buttonColor='green'
          onButtonPress={handleSubmit}
        />
        <AddButton
          content='General Grievous'
          buttonColor='red'
          onButtonPress={props.onClose}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
