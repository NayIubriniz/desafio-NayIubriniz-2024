class RecintosZoo{
        constructor(){
            this.recintos = [
                {id: 1, total: 10, espacoLivre: 5},
                {id: 2, total: 5, espacoLivre: 3},
                {id: 3, total: 7, espacoLivre: 2},
                {id: 4, total: 8, espacoLivre: 5},
            ];
        }

        analisaRecintos(animais, quantidade){
            const animaisValidos = ['MACACO', 'CROCODILO'];
            if(!animaisValidos.includes(animal)){
                return {erro: 'Animal inválido', recintosViaveis: null};
            }

            if(quantidade <= 0){
                return {erro: 'Quantidade inválida', recintosViaveis: null};
            }

            let recintosViaveis = this.recintos.filter(recinto => recinto.espacoLivre >= quantidade);

            if(recintosViaveis.length === 0) {
                return {erro: 'Não há recinto viável', recintosViaveis: null}
            }

            recintosViaveis.sort((a,b) => b.espacoLivre - a.espacoLivre);

            recintosViaveis = recintosViaveis.map(recinto =>
                `Recinto ${recinto.id} (espaço Livre: ${recinto.espacoLivre} total: ${recinto.total})`
            );
        }

}

export {RecintosZoo};