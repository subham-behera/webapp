document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const goButton = document.getElementById('go-button');
    const playersContainer = document.getElementById('players');

    // Function to fetch player details
    const fetchPlayers = async () => {
        try {
            const response = await fetch('http://20.230.64.59:3000/players'); // Replace with actual API URL
            if (!response.ok) throw new Error('Network response was not ok');
            const players = await response.json();
            displayPlayers(players);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    // Function to display player details
    const displayPlayers = (players) => {
        playersContainer.innerHTML = '';
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');
            playerDiv.innerHTML = `
                <h2>${player.name}</h2>
                <p>Position: ${player.position}</p>
                <p>Club: ${player.club}</p>
                <p>Nationality: ${player.nationality}</p>
            `;
            playersContainer.appendChild(playerDiv);
        });
    };

    // Function to filter players based on search input
    const filterPlayers = async () => {
        const searchTerm = searchInput.value.toLowerCase();
        try {
            const response = await fetch('http://20.230.64.59:3000/players'); // Replace with actual API URL
            if (!response.ok) throw new Error('Network response was not ok');
            const players = await response.json();
            const filteredPlayers = players.filter(player =>
                player.name.toLowerCase().includes(searchTerm)
            );
            displayPlayers(filteredPlayers);
        } catch (error) {
            console.error('Error filtering players:', error);
        }
    };

    // Event listener for "Go" button
    goButton.addEventListener('click', filterPlayers);

    // Initial fetch of player details
    fetchPlayers();
});
