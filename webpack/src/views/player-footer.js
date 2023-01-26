const TEMPLATE = `
    <footer class="footer fixed-bottom bg-info text-white py-2">
      <div class="container">
        <audio controls data-vid="audio">
        </audio>
      </div>
    </footer>
`;

function PlayerFooter(props) {
    this.props = props;
    this.state = {
        current: null
    };

    this.$view = $(TEMPLATE);
    this.$audio = this.$view.find('[data-vid=audio]');

    this.update(this.props);
}

PlayerFooter.prototype.update = function(props) {
    this.props = props;

    if( this.state.current !== this.props.audioSrc ) {
        this.state.current = this.props.audioSrc;
        this.$audio.empty();

        if( this.props.audioSrc ) {
            this.$audio.append(`<source src="${this.props.audioSrc}">`);
        }
    }
}

export default PlayerFooter;
