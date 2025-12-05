const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

//if not exsist in localStorage get empty array else
//get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('songs')) || [];

//User Click the Add Button
form.addEventListener('submit', (e) => {
    //Dont submit the for to the server yetlet me handle it here
    e.preventDefault();

    //Read Forms Data
    const id = document.getElementById('songId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = document.getElementById('rating').value; 

    if(id) {
        // --- UPDATE MODE---

        const index = songs.findIndex(s => s.id == id);

        songs[index].title = title;
        songs[index].url = url;
        songs[index].rating = rating;

        //Reset button to Add Mode
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Song';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');

        document.getElementById('songId').value = '';
    }

    else{
        //TODO VALIDATE FIELDS
        //create JSON OBJ Based on URL title
        const song = {
            id: Date.now(),  // Unique ID
            title: title,
            url: url,
            rating: rating,
            dateAdded: Date.now()
        };

        songs.push(song);
    }

    saveAndRender();
    //TO DO SAVE  AND RERENDER 

    form.reset();
});



function saveAndRender() {

    localStorage.setItem('songs', JSON.stringify(songs));
    
    //TODO RELOAD UI
    renderSongs();

}

function renderSongs() {
    list.innerHTML = ''; // Clear current list

    songs.forEach(song => {
        // Create table row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.rating || "-"}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}

// Edit Song Function
function editSong(id) {
    const song = songs.find(s => s.id === id);

    document.getElementById('songId').value = song.id;
    document.getElementById('title').value = song.title;
    document.getElementById('url').value = song.url;
    document.getElementById('rating').value = song.rating;

    // Change button to Update
    submitBtn.innerHTML = '<i class="fas-save"></i> Update Song';
    submitBtn.classList.remove('btn-success');
    submitBtn.classList.add('btn-primary');
}


function deleteSong(id) {
    if(confirm('Are you sure you want to delete this song?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

// load songs on page load
renderSongs();