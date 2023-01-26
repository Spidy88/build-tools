const BASE_URL = 'http://127.0.0.1:8888';

const MusicService = {
    searchTracks: (query) => {
        let url = new URL('', BASE_URL);
        let params = new URLSearchParams();
        params.append('query', query);
        url.search = params.toString();

        return fetch(url.toString())
            .then(response => response.json())
            .then(data => data.results);
    }
};

export default MusicService;
