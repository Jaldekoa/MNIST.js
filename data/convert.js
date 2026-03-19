import { open, writeFile } from 'node:fs/promises';
import path from 'node:path';

const filepath = path.join('.', 'data');

async function transformCSV(filename) {
    const results = [];
    let isFirstLine = true;

    try {
        const inputPath = path.join(filepath, filename + '.csv');
        const file = await open(inputPath);

        for await (const line of file.readLines()) {
            if (isFirstLine) {
                isFirstLine = false;
                continue;
            };

            if (!line.trim()) continue;

            const [label, ...pixels] = line.split(',');
            results.push({
                label: Number(label),
                data: pixels.map(Number)
            });
        };

        await file.close();
        const outputPath = path.join(filepath, filename + '.json');
        await writeFile(outputPath, JSON.stringify(results, null, 2));
        console.log(`✅ JSON file ${filename + '.json'} created successfully!`)

    } catch (error) {
        console.error(`❌ Error processing the file ${filename + '.csv'}: ${error.message}`)
    };
};

transformCSV('mnist_test');
transformCSV('mnist_train');