import SearchForm from './search-form';
import SearchResults from './search-results';
import PlayerFooter from './player-footer';
import MusicService from '../services/music';

const TEMPLATE = '<div></div>';

function App(props) {
    this.props = props;
    this.state = {
        tracks: [],
        audio: null
    };
    
    this.$searchForm = new SearchForm({
        onSearch: this.handleSearch.bind(this)
    });

    this.$searchResults = new SearchResults({
        results: this.state.tracks,
        onSelect: this.handleSelect.bind(this)
    });

    this.$playerFooter = new PlayerFooter({
        audioSrc: this.state.audio
    });

    this.$view = $(TEMPLATE);
    this.$view.append(this.$searchForm.$view);
    this.$view.append(this.$searchResults.$view);
    this.$view.append(this.$playerFooter.$view);

    this.update(this.props);
}

App.prototype.update = function(props) {
    this.props = props;

    this.$searchForm.update({
        onSearch: this.handleSearch.bind(this)
    });

    this.$searchResults.update({
        results: this.state.tracks,
        onSelect: this.handleSelect.bind(this)
    });

    this.$playerFooter.update({
        audioSrc: this.state.audio
    });
};

App.prototype.handleSearch = async function(query) {
    let results = await MusicService.searchTracks(query);

    this.state.tracks = results;
    this.update(this.props);
};

App.prototype.handleSelect = function(track) {
    this.state.audio = track.preview;
    this.update(this.props);
};

export default App;
