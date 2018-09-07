const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=4c6730fe59bdb675d9caeb65bd40e520&format=json'
function getData() {
  return fetch(URL)
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map(artist => {
      return {
        articulo: artist.mbid,
        categoria: artist.name,
        marca: artist.image[3]['#text'],
        sn: 200,
        responsable: 140
      }
    }))
}

export { getData }
