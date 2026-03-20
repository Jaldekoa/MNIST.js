class NeuralLayer {
    constructor(nCon, nNeur, actFn) {
        this.actFn = actFn;
        this.b = nj.random([1, nNeur]);
        this.w = nj.random([nNeur, nCon]);
    };

    sigmoid(x) {
        return nj.sigmoid(x);
    };

    dSigmoid(x) {
        const one = nj.ones(x.shape[0]);
        return x.multiply(one.substract(x));
    };

    relu(x) {
        return nj.leakyRelu(x, 0);
    };

    dRelu(x) {
        return nj.leakyRelu(x, 0).divide(x);
    }
};

export { NeuralLayer };