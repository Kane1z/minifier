// Função para descomprimir
function decompressSequence(compressed) {
    const decompressed = [];

    compressed.forEach(item => {
        if (typeof item === 'string' && item.includes(',x(')) {
            const [value, count] = item.match(/\[(.+?)\],x\((\d+)\)/).slice(1);
            decompressed.push(...Array(Number(count)).fill(value));
        } else {
            decompressed.push(item);
        }
    });

    return decompressed;
}

function decompressFile() {
    if (!fileContent) {
        alert("Por favor, carregue um arquivo primeiro.");
        return;
    }

    try {
        const compressedData = JSON.parse(fileContent);
        const decompressedData = decompressSequence(compressedData);
        const decompressedString = JSON.stringify(decompressedData);
        document.getElementById('output').value = decompressedString;

        // Disponibiliza o botão de download
        document.getElementById('downloadButton').style.display = 'inline-block';
        document.getElementById('downloadButton').onclick = () => {
            downloadFile(decompressedString, 'decompressed.json');
        };
    } catch (error) {
        console.error("Erro ao descomprimir o arquivo:", error);
        alert("Erro ao descomprimir o arquivo.");
    }
}
