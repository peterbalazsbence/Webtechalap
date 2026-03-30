const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

if (!userId) {
    alert('Hiba: Nem lett megadva felhasználó!');
    throw Error();
}

const profileDiv = document.getElementById('user-profile');

// GitHub Get User API
fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('A felhasználó nem található');
        }
        return response.json();
    })
    .then(user => {
        const img = document.createElement('img');
        img.src = user.avatar_url;
        img.alt = user.login;
        img.classList.add('profile-avatar');
        profileDiv.append(img);

        // az adatok
        const fields = [
            { label: 'Név', value: user.name },
            { label: 'Blog', value: user.blog },
            { label: 'Hely', value: user.location },
            { label: 'Bio', value: user.bio },
            { label: 'Publikus repók', value: user.public_repos },
            { label: 'Követők', value: user.followers }
        ];

        fields.forEach(field => {
            // null vagy üres string kiszűrés
            if (field.value === null || field.value === '') return;

            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = field.label + ': ';
            p.append(strong);
            p.append(String(field.value));
            profileDiv.append(p);
        });
    })
    .catch(error => {
        profileDiv.textContent = 'Hiba: ' + error.message;
    });