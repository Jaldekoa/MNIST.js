const { NeuralNetwork, DenseLayer, ActivationLayer, ActivationFunctions } = require('../neural.js');
var nj = require('numjs');
var fs = require('node:fs');

const rawData = fs.readFileSync('./data/mnist_train.json', 'utf-8');
const trainingData = JSON.parse(rawData);

const net = new NeuralNetwork([
    new DenseLayer(784, 128),
    new ActivationLayer(ActivationFunctions.relu, ActivationFunctions.reluPrime),
    new DenseLayer(128, 10),
    new ActivationLayer(ActivationFunctions.softmax, ActivationFunctions.softmaxPrime)
]);

function prepareData(mnistItem) {
    const input = nj.array(mnistItem.data).divide(255).reshape([784, 1])
    const target = nj.zeros([10, 1]);

    target.set(mnistItem.label, 0, 1);
    return { input, target };
};

async function trainModel(network, trainingData, epochs, learningRate) {
    for (let e = 0; e < epochs; e++) {
        let epochLoss = 0;

        console.log(`Iniciando época ${e}`)
        trainingData.forEach(item => {
            const { input, target } = prepareData(item);

            let output = network.predict(input);
            let error = nj.power(target.subtract(output), 2).sum();

            epochLoss += error;
            network.train(input, target, learningRate);
        });

        console.log(`Epoch ${e + 1} finished. Average Loss: ${epochLoss / trainingData.length}`);
    };
};

(async () => {
    try {
        await trainModel(net, trainingData, 10, 0.05);
        const modelData = net.getWeights();
        fs.writeFileSync('./data/modelo_pesos.json', JSON.stringify(modelData));
        console.log("¡Modelo guardado!");
    } catch (err) {
        console.error("Error durante el entrenamiento:", err);
    }
})();