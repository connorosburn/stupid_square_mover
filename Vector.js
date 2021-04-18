class Vector {
    #underlying;
    constructor() {
        this.#underlying = Array.from(arguments);
    }

    x() {
        return this.#underlying[0];
    }

    y() {
        return this.#underlying[1];
    }

    add(vec) {
        const newValues = this.#underlying.map((element, i) => {
            return element + vec.#underlying[i];
        });
        return new Vector(...newValues);
    }
}

export default Vector;