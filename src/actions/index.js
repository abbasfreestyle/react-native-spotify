export const takeAction = (type,payload) =>{
  return {
    type: 'universalReducer',
    task: {
      type: type,
      payload: payload
    }
  }
};

export const addToMyPlaylist = (playlist) => {
  return {
      type: 'myPlaylistAdd',
      payload: playlist
  }
}

export const removeFromMyPlaylist = (playlist) => {
  return {
      type: 'myPlaylistDelete',
      payload: playlist,
      id: playlist.id
  }
}

export const playlistUpdate = (playlist) => {
  return (dispatch) => {
      dispatch({type: 'playlistUpdate', payload: playlist});
  }
}
