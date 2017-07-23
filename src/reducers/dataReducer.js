const initialState = {
  searchText: '',
  token: null,
  myPlaylist: [],
  playlist: [],
  listLoading:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'universalReducer':
      return {...state, [action.task.type]: action.task.payload}
      break;
    case 'myPlaylistDelete':
      //Remake the this array by NOT including any matches, this will avoid the state from being mutated
      const Playlists = state.myPlaylist.filter(item => {
        return item.id !== action.id
      })
      return {...state, myPlaylist: Playlists};
      break;
    case 'myPlaylistAdd':
      const myPlaylist = [...state.myPlaylist, action.payload];
      return {...state, myPlaylist}
      break;
    case 'playlistUpdate':
      return {...state, playlist: action.payload, listLoading:false}
      break;
    default:
      return state;
  }
}
