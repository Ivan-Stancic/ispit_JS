'use strict';
const input = document.getElementById('input');
const song = document.getElementById('song');

const clearField = () => {
    song.innerHTML = '';
}

const handleSearch = () => {
    const search = input.value.trim();

    if(search.lengih < 3) {
        return;
    }

    const url = `https://itunes.apple.com/search?term=${search}&entity=song`;

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
        clearField();
        if (songList.length > 0) {
            const responseObject = JSON.parse(request.response);
            const songs = responseObject.results;

            for (let i = 0; i < songList.length; i++) {
                const songName = responseObject.results[i].trackName;
                const songList = document.createElement('li');
                songList.innerText = songName;
                song.appendChild(songList);
            }
        } else {
            clearField();
            song.innerText = `${song} nije nađen`;
        }
        input.value = '';
    };
    request.send();
};

input.addEventListener('input', handleSearch);