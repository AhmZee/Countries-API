const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags';
        const cardsPerPage = 15;
        let currentPage = 1;
        let countriesData = [];

        async function fetchCountries() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                countriesData = data;
                displayCountryCards(currentPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function displayCountryCards(page, data = countriesData) {
            const countryCards = document.getElementById('country-cards');
            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            const pageData = data.slice(startIndex, endIndex);

            countryCards.innerHTML = '';

            pageData.forEach(country => {
                const card = document.createElement('div');
                card.className = 'country-card';

                const flag = document.createElement('img');
                flag.className = 'country-flag';
                flag.src = country.flags.png;
                flag.alt = `${country.name.common} Flag`;

                const name = document.createElement('h2');
                name.innerHTML = `<p class="name">Capital:<span> ${country.name.common}<span></p>`;

                const capital = document.createElement('p');
                capital.innerHTML = `<p class="capital">Capital:<span> ${country.capital}<span></p>`;

                card.appendChild(name);
                card.appendChild(capital);
                card.appendChild(flag);
                countryCards.appendChild(card);
            });

            displayPagination();
        }

        function displayPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(countriesData.length / cardsPerPage);
            pagination.innerHTML = '';


            // Add "Previous" button
            const previousButton = document.createElement('button');
            previousButton.className = 'prev-button';
            previousButton.textContent = 'Prev';
            previousButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayCountryCards(currentPage);
                }
            });
            pagination.appendChild(previousButton);

            // Add page number buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayCountryCards(currentPage);
                });
                pagination.appendChild(pageButton);

                if (currentPage === i) {
                    pageButton.className = 'page-highlight';
                }
            }

            // Add "Next" button
            const nextButton = document.createElement('button');
            nextButton.className = 'next-button';
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayCountryCards(currentPage);
                }
            });
            pagination.appendChild(nextButton);
        }


        // Filter search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredData = countriesData.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm)
            );
            displayCountryCards(1, filteredData);
        });

        fetchCountries();