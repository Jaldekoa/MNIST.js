# MNIST.js: Vanilla JS Deep Neural Network
**MNIST.js** es una implementación desde cero de una Red Neuronal Profunda (DNN) desarrollada en **JavaScript vanilla**. El proyecto permite entrenar un modelo con el dataset **MNIST** para reconocer y predecir dígitos escritos a mano por el usuario a través de una interfaz interactiva en un `<canvas>`.

## Características principales
- **Arquitectura DNN:** Implementación manual de capas densas y backpropagation.
- **Cálculo Científico:** Uso de **NumJs** para operaciones matriciales eficientes.
- **Interfaz Interactiva:** Canvas de 280x280 píxeles optimizado para la entrada del usuario.
- **Zero Frameworks:** Sin TensorFlow.js ni PyTorch. Solo lógica pura y manipulación de DOM.

## Instalación y Configuración

Sigue estos pasos para configurar el entorno y preparar los datos en tu máquina local.

### 1. Clonar el repositorio
Primero, descarga el proyecto y accede al directorio:

```bash
git clone git@github.com:Jaldekoa/MNIST.js.git
cd MNIST.js
```

### 2. Descarga de datos

El proyecto utiliza el dataset de [Kaggle](https://www.kaggle.com/datasets/oddrationale/mnist-in-csv). Debes descargar los archivos y colocarlos en la carpeta `./data/`.

**Vía Terminal (Recomendado):**

```bash
curl -L -o ./data/mnist-in-csv.zip https://www.kaggle.com/api/v1/datasets/download/oddrationale/mnist-in-csv
```

### 3. Descompresión de archivos

Una vez descargado, extrae el contenido. Los archivos `mnist_train.csv` y `mnist_test.csv` deben quedar directamente dentro de `./data/`.

- **En  GNU/Linux:**
```bash
unzip ./data/mnist-in-csv.zip -d ./data && rm ./data/mnist-in-csv.zip
```

- **En Windows (PowerShell):**
```bash
tar -xf ./data/mnist-in-csv.zip -C ./data && rm ./data/mnist-in-csv.zip
```

## Procesamiento de datos

Para que los datos sean fácilmente consumibles por una aplicación en JavaScript, convertimos los archivos CSV a formato JSON.

Ejecuta el script de conversión con el siguiente comandos:
```bash
npm run convert
```
