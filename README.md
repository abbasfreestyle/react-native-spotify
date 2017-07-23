# React Native Spotify

## The App
The goal was to make a basic Spotify App using the Spotify API. The app should display featured playlists, view that playlist, search for a track then add searched tracks into your own playlist. Each track can be viewed and played (previews only). Viewing from your own playlist will autoplay into the next track until you reach the end of your playlist.

## Technical Features
 - Uses React Navigation throughout
 - Uses Redux to manage the states
 - Uses dependencies react-native-spotify-auth (android), react-native-audio-streamer, react-native-vector-icons and react-native-popup-dialog
 - Respects platform designs, iOS tabs placed at the bottom, Android swipeable tabs placed at the top
 - Color theme is customisable in theme/theme.js
 - Re-useable components created such as AudioPlayer, Button, SearchBar, ImageRatio etc...
 - Some tracks do not have preview urls, so i displayed a play button for those that do have it for simplicity
 - Deep linking callback was not working with iOS, so I resorted to using WebView and Popup Dialog for logging in
 - Android Back Button listener added because React Navigation documents state you must add your own if using Redux.

## Timeframe
App completion time 2 days

## Requirements
React Native 0.46

## Installation

If you haven't installed react native you can follow this guide:
[Install React Native](https://facebook.github.io/react-native/docs/getting-started.html)

Once you've downloaded or cloned this repository, run `npm install` inside the directory.

then install these dependencies

`npm i -s wiyarmir/react-native-spotify-auth`

`npm i -s react-native-vector-icons`

`npm i -s react-navigation`

`npm i -s react-native-popup-dialog`

then launch

`react-native run-android`

or

`react-native run-ios`
