const STORE_SONGS = 'STORE_SONGS';
const PLAY_SONG = 'PLAY_SONG';
const SET_SONG_VOLUME = 'SET_SONG_VOLUME';
const SET_SONG_DURATION = 'SET_SONG_DURATION';
const SET_SONG_PROGRESS = 'SET_SONG_PROGRESS';
const RESET = 'RESET';

const initialState = {
  songList: [],
  isPlaying: false,
  currentSongUrl: '',
  currentSongName: '',
  currentSongVolume: 0.3,
  currentSongProgress: 0,
  currentSongDuration: 0,
}

export function storeSongs (list) {
  return {
    type: STORE_SONGS,
    list
  }
}

export function playSong (song) {
  console.log(song)
  return {
    type: PLAY_SONG,
    song
  }
}

export function reset (song) {
  return {
    type: RESET,
    song
  }
}

export function songVolume (volume) {
  console.log('volume is', volume)
  return {
    type: SET_SONG_VOLUME,
    volume
  }
}

export function songDuration (duration) {
  return {
    type: SET_SONG_DURATION,
    duration
  }
}

export function songProgress (progress) {
  console.log('song progess', progress);
  return {
    type: SET_SONG_PROGRESS,
    progress
  }
}

export default function audio (state = initialState, action) {
  switch (action.type) {
    case STORE_SONGS :
      return {
        ...state,
        songList: action.list
      }

    // BUG: if 'songList' is empty, it will crash the app.
    case PLAY_SONG: {
      return {
        ...state,
        isPlaying: !state.isPlaying,
        currentSongUrl: action.song.downloadURL ? action.song.downloadURL : state.songList[0].downloadURL,
        currentSongName: action.song.songName ? action.song.songName : state.songList[0].songName
      }
    }
    case RESET: {
      return {
        ...state,
        isPlaying: false,
        currentSongUrl: '',
        currentSongName: '',
        currentSongVolume: 0.3,
        currentSongProgress: 0,
        currentSongDuration: 0,
      }
    }
    case SET_SONG_VOLUME: {
      return {
        ...state,
        currentSongVolume: action.volume
      }
    }
    case SET_SONG_DURATION: {
      return {
        ...state,
        currentSongDuration: action.duration
      }
    }
    case SET_SONG_PROGRESS: {
      return {
        ...state,
        currentSongProgress: Math.floor(action.progress)
      }
    }
    default:
      return state
  }
}
