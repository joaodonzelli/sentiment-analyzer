# 🧠 Sistema de Análise de Sentimentos - Projeto Integrador

Sistema web inteligente para classificação automática de sentimentos em textos em português, desenvolvido como Projeto Integrador da disciplina de Inteligência Artificial.

## 🎯 Objetivo

Aplicar conceitos de **Processamento de Linguagem Natural (PLN)** e **Machine Learning** para criar uma ferramenta que identifica automaticamente se um texto expressa sentimento positivo, negativo ou neutro.

## 🚀 Demonstração

**[Ver Demo ao Vivo](https://seu-usuario.github.io/sentiment-analyzer)**

![Screenshot do Sistema](docs/screenshot.png)

## 📋 Funcionalidades

- ✅ Análise de sentimentos em tempo real
- 📊 Visualização de probabilidades por classe
- 📈 Histórico das últimas análises
- 🎨 Interface moderna e responsiva
- 🇧🇷 Otimizado para português brasileiro

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para UI
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones SVG

### Inteligência Artificial
- **Algoritmo Base:** Naive Bayes Multinomial
- **Técnicas de PLN:**
  - Tokenização
  - Remoção de stopwords
  - Bag of Words (BoW)
  - TF-IDF (Term Frequency-Inverse Document Frequency)
  - Detecção de negação

### Treinamento do Modelo
- **Weka** - Software para mineração de dados
- **Dataset:** 40 avaliações de apps de delivery categorizadas manualmente
- **Métricas obtidas:** 82.5% de acurácia com SMO

## 📂 Estrutura do Projeto

```
sentiment-analyzer/
│
├── src/
│   ├── App.jsx                 # Componente principal do sistema
│   ├── index.html              # HTML base
│   └── styles.css              # Estilos customizados
│
├── data/
│   ├── dataset_avaliacoes.arff # Dataset usado no treinamento
│   └── trained_model/          # Modelo exportado do Weka
│
├── docs/
│   ├── IA_no_Projeto.md        # Documentação dos conceitos de IA
│   ├── relatorio_weka.pdf      # Relatório do treinamento
│   └── screenshots/            # Capturas de tela
│
├── README.md                   # Este arquivo
├── package.json                # Dependências do projeto
└── LICENSE                     # Licença MIT
```

## 🔧 Como Executar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sentiment-analyzer.git
cd sentiment-analyzer
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## 🤖 Como Funciona a IA

### 1. Pré-processamento
O texto passa por várias etapas antes da classificação:

```javascript
// Exemplo de tokenização
"Adorei o produto!" → ["adorei", "produto"]
```

- **Tokenização:** Separação em palavras
- **Normalização:** Conversão para minúsculas
- **Remoção de stopwords:** Elimina palavras comuns (o, a, de, para)
- **Limpeza:** Remove pontuação

### 2. Extração de Features
Utilizamos **Bag of Words** com pesos baseados em frequência:

```javascript
positiveWords = ['bom', 'ótimo', 'excelente', ...]
negativeWords = ['péssimo', 'ruim', 'horrível', ...]
```

Cada palavra encontrada aumenta o score da respectiva classe.

### 3. Classificação (Naive Bayes)
O algoritmo calcula probabilidades para cada sentimento:

```
P(positivo|texto) = score_positivo / (score_positivo + score_negativo + score_neutro)
```

A classe com maior probabilidade é escolhida.

### 4. Detecção de Negação
Um diferencial do sistema é identificar negações:

```javascript
"não gostei" → aumenta score negativo
"nunca mais uso" → aumenta score negativo
```

## 📊 Treinamento do Modelo

### Dataset
- **Fonte:** Avaliações do Reclame Aqui sobre apps de delivery
- **Tamanho:** 40 instâncias
- **Classes:** Positivo (32.5%), Negativo (32.5%), Neutro (35%)

### Processo no Weka
1. Carregamento do arquivo ARFF
2. Aplicação do filtro `StringToWordVector`:
   - TF-IDF habilitado
   - Stopwords em português
   - MinTermFreq: 2
3. Treinamento com validação cruzada (10-fold)

### Resultados

| Algoritmo      | Acurácia | Precision | Recall | F-Measure |
|----------------|----------|-----------|--------|-----------|
| Naive Bayes    | 75.00%   | 0.742     | 0.750  | 0.745     |
| **SMO (SVM)**  | **82.50%** | **0.828** | **0.825** | **0.824** |
| Random Forest  | 77.50%   | 0.771     | 0.775  | 0.772     |

**SMO foi o melhor classificador** devido à sua capacidade de lidar com alta dimensionalidade.

## 🎓 Conceitos de IA Aplicados

Este projeto demonstra na prática:

1. **Aprendizado Supervisionado**
   - Treinamento com dados rotulados
   - Validação cruzada para evitar overfitting

2. **Processamento de Linguagem Natural**
   - Tokenização e normalização
   - TF-IDF para ponderação de termos
   - Tratamento de stopwords

3. **Classificação Multiclasse**
   - 3 categorias simultâneas
   - Cálculo de probabilidades por classe

4. **Feature Engineering**
   - Seleção manual de palavras-chave
   - Detecção de padrões linguísticos (negação)

5. **Avaliação de Modelos**
   - Métricas: acurácia, precision, recall, F-measure
   - Matriz de confusão
   - Comparação de algoritmos

## 📖 Documentação Completa

Para entender em detalhes como a IA foi incorporada ao projeto, leia:

📄 **[Conceitos de IA no Projeto Integrador](docs/IA_no_Projeto.md)**

Este documento explica:
- Fundamentos teóricos dos algoritmos
- Decisões de implementação
- Relação com o conteúdo da disciplina
- Limitações e melhorias futuras

## 🔍 Limitações Conhecidas

- Dataset pequeno (40 instâncias)
- Sem stemming/lematização
- Não captura contexto complexo
- Baseado em palavras-chave fixas
- Não usa embeddings ou deep learning

## 🚀 Melhorias Futuras

- [ ] Integrar modelo treinado em Python (scikit-learn)
- [ ] Implementar stemming em português
- [ ] Usar n-gramas (bigramas, trigramas)
- [ ] Adicionar análise de emojis
- [ ] Criar API REST para integração
- [ ] Expandir dataset para 500+ instâncias
- [ ] Testar BERT em português (BERTimbau)

## 👨‍💻 Autor

**João Antônio Donzelli Cavalcante**  
Disciplina: Inteligência Artificial - 2025

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu.email@exemplo.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

**#InteligenciaArtificial #MachineLearning #PLN #ProjetoIntegrador**
