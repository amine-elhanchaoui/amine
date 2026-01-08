// Sample data for anime and manga
const animeData = [
    {
        title: "Attack on Titan",
        image: "https://source.unsplash.com/random/300x400/?anime",
        genres: "Action, Drama, Fantasy",
        rating: 9.0
    },
    {
        title: "Demon Slayer",
        image: "https://source.unsplash.com/random/300x400/?anime",
        genres: "Action, Fantasy, Supernatural",
        rating: 8.8
    },
    {
        title: "My Hero Academia",
        image: "https://source.unsplash.com/random/300x400/?anime",
        genres: "Action, Comedy, Superhero",
        rating: 8.5
    },
    {
        title: "Jujutsu Kaisen",
        image: "https://source.unsplash.com/random/300x400/?anime",
        genres: "Action, Fantasy, Supernatural",
        rating: 8.9
    }
];

const mangaData = [
    {
        title: "One Piece",
        image: "https://source.unsplash.com/random/200x300/?manga",
        genres: "Action, Adventure, Comedy",
        rating: 9.5
    },
    {
        title: "Berserk",
        image: "https://source.unsplash.com/random/200x300/?manga",
        genres: "Action, Fantasy, Horror",
        rating: 9.3
    },
    {
        title: "Vagabond",
        image: "https://source.unsplash.com/random/200x300/?manga",
        genres: "Action, Historical, Drama",
        rating: 9.2
    },
    {
        title: "Vinland Saga",
        image: "https://source.unsplash.com/random/200x300/?manga",
        genres: "Action, Historical, Drama",
        rating: 9.1
    }
];

// Function to create anime cards
function createAnimeCard(anime) {
    return `
        <div class="anime-card animate-fade-in">
            <div class="anime-image">
                <img src="${anime.image}" alt="${anime.title}">
                <div class="overlay">
                    <button class="play-btn"><i class="fas fa-play"></i></button>
                </div>
            </div>
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>${anime.genres}</p>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${anime.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to create manga cards
function createMangaCard(manga) {
    return `
        <div class="manga-card animate-fade-in">
            <div class="manga-image">
                <img src="${manga.image}" alt="${manga.title}">
                <div class="overlay">
                    <button class="read-btn"><i class="fas fa-book-open"></i></button>
                </div>
            </div>
            <div class="manga-info">
                <h3>${manga.title}</h3>
                <p>${manga.genres}</p>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${manga.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to populate anime grid
function populateAnimeGrid() {
    const animeGrid = document.querySelector('.anime-grid');
    animeGrid.innerHTML = animeData.map(createAnimeCard).join('');
}

// Function to populate manga grid
function populateMangaGrid() {
    const mangaGrid = document.querySelector('.manga-grid');
    mangaGrid.innerHTML = mangaData.map(createMangaCard).join('');
}

// Function to handle search
function handleSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredAnime = animeData.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) ||
        anime.genres.toLowerCase().includes(searchTerm)
    );

    const filteredManga = mangaData.filter(manga => 
        manga.title.toLowerCase().includes(searchTerm) ||
        manga.genres.toLowerCase().includes(searchTerm)
    );

    const animeGrid = document.querySelector('.anime-grid');
    const mangaGrid = document.querySelector('.manga-grid');

    animeGrid.innerHTML = filteredAnime.map(createAnimeCard).join('');
    mangaGrid.innerHTML = filteredManga.map(createMangaCard).join('');
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.anime-card, .manga-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fade-in');
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate grids
    populateAnimeGrid();
    populateMangaGrid();

    // Add search functionality
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', handleSearch);

    // Add scroll animation
    window.addEventListener('scroll', handleScrollAnimations);

    // Add GSAP animations
    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.section-title', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Add hover animations
    const cards = document.querySelectorAll('.anime-card, .manga-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}); 