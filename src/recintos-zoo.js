class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: 3 }, // 3 macacos
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: 0 }, // vazio
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: 1 }, // 1 gazela
            { numero: 4, bioma: 'rio', tamanho: 8, animais: 0 }, // vazio
            { numero: 5, bioma: 'savana', tamanho: 9, animais: 1 }, // 1 leão
        ];

        this.animaisValidos = {
            LEAO: { tamanho: 3, bioma: ['savana'] },
            LEOPARDO: { tamanho: 2, bioma: ['savana'] },
            CROCODILO: { tamanho: 3, bioma: ['rio'] },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: ['savana'] },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animaisValidos[especie]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animaisValidos[especie];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomaApropriado = animalInfo.bioma.some(b => recinto.bioma.includes(b));
            const espacoOcupado = (recinto.animais * this.animaisValidos[this.getAnimalTypeByCount(recinto.animais)]?.tamanho || 0);
            const espacoSuficiente = (recinto.tamanho - espacoOcupado) >= (quantidade * animalInfo.tamanho);

            let regrasRespeitadas = true;

            // Verificação das regras de alocação de animais
            if (['LEAO', 'LEOPARDO'].includes(especie)) {
                if (recinto.animais > 0) {
                    regrasRespeitadas = false; // Não pode ter outro animal
                }
            } else if (especie === 'MACACO') {
                if (recinto.animais > 0) {
                    regrasRespeitadas = false; // Não pode ter outro macaco se já houver
                }
            } else if (especie === 'CROCODILO') {
                if (recinto.animais > 0) {
                    regrasRespeitadas = false; // Não pode ter outro animal
                }
            } else if (especie === 'HIPOPOTAMO') {
                if (!recinto.bioma.includes('savana e rio') && recinto.animais > 0) {
                    regrasRespeitadas = false; // Verifica se o bioma é adequado
                }
            }

            // Verifica se todas as condições foram atendidas
            if (biomaApropriado && espacoSuficiente && regrasRespeitadas) {
                const espacoLivre = recinto.tamanho - espacoOcupado - (quantidade * animalInfo.tamanho);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }
        return { recintosViaveis };
    }

    getAnimalTypeByCount(count) {
        const animalMap = {
            0: 'MACACO',
            1: 'GAZELA',
            2: 'LEAO',
            3: 'CROCODILO',
            4: 'HIPOPOTAMO',
        };
        return animalMap[count] || null;
    }
}

export { RecintosZoo as RecintosZoo };
