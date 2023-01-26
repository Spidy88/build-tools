const TEMPLATE = `
    <form data-vid="searchForm">
        <div class="input-group">
            <input id="searchInput" data-vid="searchInput" type="text" class="form-control" autocomplete="off" placeholder="Search..." />
            <div class="input-group-append">
                <button data-vid="searchBtn" class="btn btn-primary" type="submit" disabled>Search</button>
            </div>
        </div>
    </form>
`;

function SearchForm(parent, props) {
    this.props = props;
    this.state = {
        searchText: '',
        isSearching: false
    };

    this.$view = $(TEMPLATE);
    this.$searchForm = this.$view.find('[data-vid=searchForm]');
    this.$searchInput = this.$view.find('[data-vid=searchInput]');
    this.$searchBtn = this.$view.find('[data-vid=searchBtn]');

    this.$searchInput.on('input', this.handleInputChange.bind(this));
    this.$searchForm.on('submit', this.handleSubmit.bind(this));
    this.$searchBtn.on('click', this.handleSubmit.bind(this));

    this.update(this.props);
}

SearchForm.prototype.update = function(props) {
    this.props = props;

    const { isSearching, searchText } = this.state;

    !isSearching && searchText.length
            ? this.$searchBtn.removeAttr('disabled')
            : this.$searchBtn.attr('disabled', true);
};

SearchForm.prototype.handleInputChange = function(e) {
    this.state.searchText = e.target.value.trim();
    this.update(this.props);
};

SearchForm.prototype.handleSubmit = async function(e) {
    const { onSearch } = this.props;

    e.preventDefault();

    this.state.isSearching = true;
    this.update(this.props);

    try {
        let result = onSearch(this.state.searchText);
        await Promise.resolve(result);
    }
    finally {
        this.state.isSearching = false;
        this.update(this.props);
    }
}

export default SearchForm;
