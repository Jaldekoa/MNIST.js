var nj = require('numjs');

class ActivationFunctions {
    static relu(x) { return nj.leakyRelu(x, 0) };
    static reluPrime(x) {
        // 1. Creamos un nuevo NdArray de ceros con la misma forma [128, 1]
        let mask = nj.zeros(x.shape);

        // 2. Obtenemos las referencias a los datos puros (TypedArrays)
        const xData = x.selection.data;
        const maskData = mask.selection.data;

        // 3. Operamos directamente sobre los buffers (muy rápido)
        for (let i = 0; i < xData.length; i++) {
            maskData[i] = xData[i] > 0 ? 1 : 0;
        }

        // 4. ¡IMPORTANTE! Retornamos el objeto NdArray completo, no el buffer
        return mask;
    };

    static softmax(x) { return nj.softmax(x) };
    static softmaxPrime(x) { return nj.ones(x.shape) };
};

class DenseLayer {
    constructor(inputSize, outputSize) {
        this.input = null;
        this.output = null;

        this.weights = nj.random([outputSize, inputSize]).multiply(Math.sqrt(2 / inputSize));
        this.bias = nj.zeros([outputSize, 1]);
    };

    forward(input) {
        this.input = input;
        return nj.dot(this.weights, this.input).add(this.bias);
    };

    backward(outputGradient, learningRate) {
        const weightsGradient = nj.dot(outputGradient, this.input.T);
        const inputGradient = nj.dot(this.weights.T, outputGradient);

        this.weights = this.weights.subtract(weightsGradient.multiply(learningRate));
        this.bias = this.bias.subtract(outputGradient.multiply(learningRate));
        return inputGradient;
    };
};

class ActivationLayer {
    constructor(activation, activationPrime) {
        this.activation = activation;
        this.activationPrime = activationPrime;
    };

    forward(input) {
        this.input = input;
        return this.activation(this.input);
    };

    backward(outputGradient, learningRate) {
        return outputGradient.multiply(this.activationPrime(this.input));
    };
};

class NeuralNetwork {
    constructor(layers) {
        this.layers = layers;
    }

    load(jsonData) {
        let denseLayerIndex = 0;
        this.layers.forEach(layer => {
            if (layer instanceof DenseLayer) {
                const savedLayer = jsonData[denseLayerIndex];
                layer.weights = nj.array(savedLayer.weights);
                layer.bias = nj.array(savedLayer.bias);
                denseLayerIndex++;
            };
        });
        console.log("Pesos cargados correctamente.");
    };

    getWeights() {
        return this.layers
            .filter(l => l instanceof DenseLayer)
            .map(l => ({ weights: l.weights.tolist(), bias: l.bias.tolist() }));
    }

    train(input, target, learningRate) {
        let output = this.predict(input);
        let gradient = output.subtract(target);

        for (let i = this.layers.length - 1; i >= 0; i--) {
            gradient = this.layers[i].backward(gradient, learningRate)
        };
    };

    predict(input) {
        let output = input;
        for (let layer of this.layers) { output = layer.forward(output) };
        return output;
    };
};

module.exports = { DenseLayer, ActivationLayer, NeuralNetwork, ActivationFunctions };