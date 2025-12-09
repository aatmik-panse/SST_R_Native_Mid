import axios from 'axios';

const API_KEY = process.env.API_KEY;


const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: city,
                sortBy: 'publishedAt',
                apiKey: API_KEY,
                language: 'en',
            },
        });
        return response.data.articles;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 429)) {
            console.log('ℹ️ API Key invalid or limit reached. Switching to Mock Data for demonstration.');
        } else {
            console.error('Error fetching news:', error.message);
        }
        // Fallback Mock Data if API fails (common with free keys on localhost)
        return [
            {
                title: `Mock News: Major Event in ${city}`,
                description: 'This is a mock article because the API key might be missing or limited.',
                url: 'https://google.com',
                urlToImage: 'https://via.placeholder.com/300',
                publishedAt: new Date().toISOString(),
                source: { name: 'Newsee' }
            },
            {
                title: `Local Updates for ${city}`,
                description: 'More updates happening around the city today. Stay tuned.',
                url: 'https://expo.dev',
                urlToImage: 'https://via.placeholder.com/300',
                publishedAt: new Date().toISOString(),
                source: { name: 'Newsee' }
            }
        ];
    }
};
