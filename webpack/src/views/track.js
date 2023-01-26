const TEMPLATE = `
    <div class="col-lg-3 col-md-4 col-sm-2">
        <a href="#">
            <div class="card mx-1 my-3" data-vid="card">
                <img class="card-img-top" data-vid="artwork">
                <div class="card-body">
                    <h5 class="card-title" data-vid="title"></h5>
                    <p class="card-text text-truncate" data-vid="description"></p>
                </div>
            </div>
        </a>
    </div>
`;

function Track(props) {
    this.props = props;

    this.$view = $(TEMPLATE);
    this.$card = this.$view.find('[data-vid=card]');
    this.$artwork = this.$view.find('[data-vid=artwork]');
    this.$title = this.$view.find('[data-vid=title]');
    this.$description = this.$view.find('[data-vid=description]');

    this.$card.on('click', this.handleClick.bind(this));

    this.update(this.props);
}

Track.prototype.update = function(props) {
    this.props = props;

    const { artwork, title, description } = this.props;

    this.$artwork.attr('src', artwork);
    this.$title.text(title);
    this.$description.text(description);
};

Track.prototype.handleClick = function(e) {
    e.preventDefault();

    const { onClick } = this.props;
console.log('props: ', this.props);
    onClick(this.props);
}

export default Track;
