import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native'
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

      <ScrollView style={styles.moviesContainer}>
        {movies.map(movie => (
          <View
            style={{ margin: 15, alignItems: 'center' }}
            key={movie.id}
            onPress={() => deleteMovie(movie)}
          >
            <Image
              source={{ uri: movie.image }}
              style={{ width: 200, height: 300 }}
            />
            <Text key={movie.id}>{movie.title}</Text>
          </View>
        ))}
      </ScrollView>

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },

  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
