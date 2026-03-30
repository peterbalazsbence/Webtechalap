// http://127.0.0.1:5500/index.html?animal=dog

const params = new URLSearchParams(window.location.search);
const animal = params.get('animal');

if (!animal) {
    alert('Hiba: Az állat azonosítója nem lett megadva.');
    throw Error();
}

if (!Object.keys(ANIMAL_INFO).includes(animal)) {
    alert('Hiba: Hibás azonosító.');
    throw Error();
}

const info = ANIMAL_INFO[animal];

const nameElem = document.getElementById('name');
nameElem.textContent = info.name;

const descElem = document.querySelector('#description');
descElem.innerHTML = info.descriptionHTML;

// <img src="...." />
const imgElem = document.createElement('img');
imgElem.setAttribute('src', info.imageUrl);

descElem.prepend(imgElem);

const funFact = info.funFacts.shift();
const funFactLi = document.createElement('li');
funFactLi.textContent = funFact;
funFactLi.classList.add('fun-fact');

const funFactsUl = document.querySelector('#fun-facts');
funFactsUl.append(funFactLi);

const funFactBtn = document.querySelector('#new-fun-fact-btn');
funFactBtn.addEventListener('click', () => {
    const funFact = info.funFacts.shift();
    const funFactLi = document.createElement('li');
    funFactLi.textContent = funFact;
    funFactLi.classList.add('fun-fact');

    funFactsUl.append(funFactLi);

    if (info.funFacts.length === 0) {
        funFactBtn.remove();
    }
});