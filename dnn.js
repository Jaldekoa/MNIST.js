class Layer {
    constructor() {
        this.input = null;
        this.output = null;
    };

    forward(input) { };
    backwards(outputGradient, learningRate) { };
};

class Dense extends Layer {
    constructor(inputSize, outputSize) {
        this.weights = nj.random([outputSize, inputSize]);
        this.bias = nj.random([outputSize, 1]);
    };

    forward(input) {
        this.input = input;
        return nj.dot(this.weights, this.input).add(this.bias);
    };

    backwards(outputGradient, learningRate) {
        const weightsGradient = nj.dot(outputGradient, this.input.T);
        const inputGradient = nj.dot(this.weights.T, outputGradient);

        this.weights = this.weights.substract(learningRate * weightsGradient);
        this.bias = this.bias.substract(learningRate * outputGradient);
        return inputGradient;
    };
};

class NeuralNetwork {
    constructor(layers) {
        this.layers = layers;
    }

    train() { };
    predict() { };
};