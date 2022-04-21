function onResponse(response){
    return response.json();
}

function onClick(){
  fetch('https://www.whenisthenextmcufilm.com/api?date=' + date).then(onResponse).then(onJson);
}

function onJson(json){
    console.log(json);
    const movie = document.querySelector('#movie');
    movie.innerHTML = '';

    const prossimamente = document.createElement('h2');
    prossimamente.textContent = "Prossimamente al cinema...";
    movie.appendChild(prossimamente);

    const film = document.createElement('div');

    const title = json.title;
    
    const extended_title = document.createElement('h3');

    if(title === undefined){
        extended_title.textContent = "Fine film programmati";
        film.appendChild(extended_title);
        movie.appendChild(film);
        return;
    }
    
    const days = json.days_until;
    extended_title.textContent = title + " in " + days + " giorni!";

    const img = document.createElement('img');
    img.src = json.poster_url;
    
    const bottone = document.createElement('button');
    bottone.textContent = 'Cosa viene dopo?';
    bottone.addEventListener('click', onClick);

    film.appendChild(extended_title);
    film.appendChild(img);
    film.appendChild(bottone);

    movie.appendChild(film);

    date = json.release_date;
}

let date;

fetch('https://www.whenisthenextmcufilm.com/api').then(onResponse).then(onJson);


//Spotify

var client_id = '9eb16d4874b949d9ae0b162c73a5f258';
var client_secret = 'ffa616d449504efc9bcd7986403f35b8';
const search = ["Captain America", "Thor", "Iron Man", "Hulk", "Black Widow", "Dr Strange", "Iron Man", "Hawkeye", "Spider Man", "Scarlet Witch", "Legend of Zelda", "Assassin's Creed", "Super Mario", "God of War", "Uncharted", "Lara Croft", "Metal Gear Solid", "Sonic", "The Witcher 3", "Big Bang Theory", "Casa de Papel", "Mr Robot", "Breaking Bad", "Game of Thrones", "Vikings", "Lucifer", "Peaky Blinders", "Don Matteo"];

function onSpotifyJson(json){
  console.log(json);
  const spotify = document.querySelector('#spotify');
  const song_div = document.createElement('div');
  const random_song = Math.floor(Math.random() * json.tracks.items.length);
  const song = json.tracks.items[random_song];

  const img = document.createElement('img');
  img.classList.add('thumbnail');
  img.src = song.album.images[0].url

  const song_name = document.createElement('span');
  song_name.textContent = song.name;

  const song_link = document.createElement('a');
  song_link.classList.add('link');
  song_link.href = song.uri;

  const play_button = document.createElement('img');
  play_button.classList.add('play');
  play_button.src = "./images/play_spotify.png"

  song_link.appendChild(play_button);

  song_div.appendChild(img);
  song_div.appendChild(song_name);
  song_div.appendChild(song_link);
  spotify.appendChild(song_div);
}

function onTokenJson(json){
  console.log(json); //Token

  const spotify = document.querySelector('#spotify');
  spotify.innerHTML = '';

  const musica = document.createElement('h2');
  musica.textContent = "Esplora le colonne sonore dei tuoi film/giochi preferiti";
  spotify.appendChild(musica);

  for(let i=0; i<5; i++){
    const random = Math.floor(Math.random() * 0.5 * search.length);
    console.log(search[random]);

    fetch("https://api.spotify.com/v1/search?type=track&q=" + search[random],
    {
      headers:
      {
        'Authorization': 'Bearer ' + json.access_token
      }
    }
    ).then(onResponse).then(onSpotifyJson);
  }
  
}

fetch('https://accounts.spotify.com/api/token', 
{
  method: "post",
  body: 'grant_type=client_credentials',
  headers:
  {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}
).then(onResponse).then(onTokenJson);