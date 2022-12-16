
class AbstractView {

    #props
    #onDestroy = () => {};

    constructor(props) {
        this.#props = props;
    }
}