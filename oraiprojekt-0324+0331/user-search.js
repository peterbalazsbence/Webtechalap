const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();

    // üres mező ell
    if (query === '') {
        alert('Kérlek adj meg egy felhasználónevet!');
        return;
    }

    // előző találatok törlése
    resultsList.innerHTML = '';

    // GitHub Search Users API hívás
    fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba történt a kérés során');
            }
            return response.json();
        })
        .then(data => {
            if (data.items.length === 0) {
                resultsList.innerHTML = '<li>Nincs találat.</li>';
                return;
            }

            // találatok megjelenítése
            data.items.forEach(user => {
                const li = document.createElement('li');
                li.classList.add('user-card');

                const img = document.createElement('img');
                img.src = user.avatar_url;
                img.alt = user.login;
                img.classList.add('avatar');

                // link a profil oldalra
                const name = document.createElement('a');
                name.textContent = user.login;
                name.href = `user.html?id=${user.login}`;

                li.append(img);
                li.append(name);
                resultsList.append(li);
            });
        })
        .catch(error => {
            alert('Hiba: ' + error.message);
        });
});

// enterrel is kereses
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});