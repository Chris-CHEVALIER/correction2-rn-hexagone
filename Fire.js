import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAvQnd4W7YTz9gSvWyFxbar1sRO2ZrSn6A',
  authDomain: 'my-movies-cb2dc.firebaseapp.com',
  projectId: 'my-movies-cb2dc',
  storageBucket: 'my-movies-cb2dc.appspot.com',
  messagingSenderId: '714618595187',
  appId: '1:714618595187:web:c5bdbb60075350d1d04706'
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default class Fire {
  getMovies (callback) {
    const q = query(collection(db, 'movies'), orderBy('title', 'asc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  addMovie (movie) {
    addDoc(collection(db, 'movies'), movie)
  }

  updateMovie (movie) {
    updateDoc(doc(db, 'movies', movie.id), movie)
  }

  deleteMovie (movie) {
    deleteDoc(doc(db, 'movies', movie.id))
  }
}
