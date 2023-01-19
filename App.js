import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AddButton from './components/AddButton'
import MovieModal from './components/MovieModal'
import Fire from './Fire'

export default function App () {
  const [isVisible, setIsVisible] = useState(false)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const firebase = new Fire()
    firebase.getMovies(movies => {
      setMovies(movies)
      setLoading(false)
    })
  }, [])

  function deleteMovie (movie) {
    const firebase = new Fire()
    firebase.deleteMovie(movie)
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {movies.map(movie => (
        <Text onPress={() => deleteMovie(movie)}>{movie.title}</Text>
      ))}
      <AddButton
        content='General Kenobi'
        buttonColor='dodgerblue'
        onButtonPress={() => setIsVisible(true)}
      />
      {isVisible && (
        <MovieModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
