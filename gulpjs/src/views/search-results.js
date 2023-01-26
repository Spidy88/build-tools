import Track from './track';

const TEMPLATE = `
    <div class="my-4">
        <div class="row" data-vid="search-results"></div>
        <div data-vid="no-results"></div>
    </div>
`;

function SearchResults(props) {
    this.props = props;
    this.state = {
        $tracks: []
    };

    this.$view = $(TEMPLATE);
    this.$searchResults = this.$view.find('[data-vid=search-results]');
    this.$noResults = this.$view.find('[data-vid=no-results]');

    this.update(this.props);
}

SearchResults.prototype.update = function(props) {
    this.props = props;

    let { results, onSelect } = this.props;

    if( results.length ) {
        this.$searchResults.show();
        this.$noResults.hide();
    }
    else {
        this.$searchResults.hide();
        this.$noResults.show();
    }

    let sameTracks = results.length === this.state.$tracks.length;
    console.log('same tracks: ', sameTracks);
    for(let i = 0; sameTracks && i < results.length; i++) {
        if( results[i].id !== this.state.$tracks[i]?.id ) {
            sameTracks = false;
            break;
        }
    }

    if( !sameTracks ) {
        this.$searchResults.empty();
        this.state.$tracks.length = 0;
    }

    for(let i = 0; i < results.length; i++) {
        let result = results[i];
        let artists = result.artists.map((artist) => artist.name);
        let track = {
            id: result.id,
            artwork: result.album.images?.[0]?.url,
            title: name,
            description: `by ${artists.join(', ')}`,
            preview: result.preview_url,
            onClick: onSelect
        };

        if( !sameTracks ) {
            let $track = new Track(track);
            $track.id = track.id;
            this.state.$tracks[i] = $track;
            this.$searchResults.append($track.$view);
        }
        else {
            this.state.$tracks[i].update(track);
        }
    }
};

export default SearchResults;
