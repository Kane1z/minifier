// Função para comprimir usando sequência compactada
function compressSequence(array) {
    const compressed = [];
    let count = 1;

    for (let i = 1; i <= array.length; i++) {
        if (array[i] === array[i - 1]) {
            count++;
        } else {
            if (count >= 3) {
                compressed.push(`[${array[i - 1]}],x(${count})`);
            } else {
                compressed.push(...array.slice(i - count, i));
            }
            count = 1;
        }
    }
    return compressed;
}

function compressFile() {
    if (!fileContent) {
        alert("Por favor, carregue um arquivo primeiro.");
        return;
    }

    try {
        const json = JSON.parse(fileContent);
        const compressedData = compressSequence(json.data.flat(2));
        const compressedString = JSON.stringify(compressedData);
        document.getElementById('output').value = compressedString;

        // Disponibiliza o botão de download
        document.getElementById('downloadButton').style.display = 'inline-block';
        document.getElementById('downloadButton').onclick = () => {
            downloadFile(compressedString, 'compressed.json');
        };
    } catch (error) {
        console.error("Erro ao comprimir o arquivo:", error);
        alert("Erro ao comprimir o arquivo.");
    }
}
