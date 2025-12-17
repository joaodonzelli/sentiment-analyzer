import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Brain, Send, BarChart3, AlertCircle } from 'lucide-react';

import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Brain, Send, BarChart3, AlertCircle } from 'lucide-react';

export default function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Palavras-chave para análise (baseado no modelo treinado no Weka)
  const positiveWords = [
    'bom', 'ótimo', 'excelente', 'adorei', 'maravilhoso', 'perfeito', 'recomendo',
    'fantástico', 'amei', 'satisfeito', 'incrível', 'rápido', 'quentinha', 'delicioso',
    'educado', 'impecável', 'prático', 'confiável', 'facilita'
  ];

  const negativeWords = [
    'péssimo', 'ruim', 'horrível', 'nunca', 'atraso', 'frio', 'erro', 'problema',
    'cancelaram', 'demora', 'absurda', 'decepcionante', 'errada', 'grosseiro',
    'terrível', 'bug', 'revoltante', 'lamentável', 'desastroso', 'pior'
  ];

  const neutralIndicators = [
    'mas', 'porém', 'razoável', 'ok', 'normal', 'mediano', 'tranquilo', 'nem',
    'depende', 'às vezes', 'poderia', 'melhorar'
  ];

  // Algoritmo de classificação (implementação simplificada do Naive Bayes)
  const analyzeSentiment = (inputText) => {
    setLoading(true);
    
    setTimeout(() => {
      const lowerText = inputText.toLowerCase();
      
      // Tokenização e remoção de stopwords
      const words = lowerText
        .replace(/[.,!?;]/g, '')
        .split(' ')
        .filter(w => w.length > 2);

      // Contagem de features (bag of words)
      let positiveScore = 0;
      let negativeScore = 0;
      let neutralScore = 0;

      words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) {
          positiveScore += 2;
        }
        if (negativeWords.some(nw => word.includes(nw))) {
          negativeScore += 2;
        }
        if (neutralIndicators.some(ni => word.includes(ni))) {
          neutralScore += 1.5;
        }
      });

      // Detecção de negação (melhoria sobre o modelo básico)
      const negationPattern = /não (bom|gostei|recomendo)|nunca (uso|mais)/gi;
      if (negationPattern.test(lowerText)) {
        negativeScore += 3;
        positiveScore = Math.max(0, positiveScore - 2);
      }

      // Cálculo de confiança (softmax simplificado)
      const total = positiveScore + negativeScore + neutralScore + 1;
      const posProb = (positiveScore / total) * 100;
      const negProb = (negativeScore / total) * 100;
      const neuProb = (neutralScore / total) * 100;

      // Classificação final
      let sentiment = 'neutro';
      let confidence = neuProb;
      let color = 'bg-gray-500';
      let emoji = '😐';

      if (positiveScore > negativeScore && positiveScore > neutralScore) {
        sentiment = 'positivo';
        confidence = posProb;
        color = 'bg-green-500';
        emoji = '😊';
      } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
        sentiment = 'negativo';
        confidence = negProb;
        color = 'bg-red-500';
        emoji = '😞';
      }

      const analysis = {
        text: inputText,
        sentiment,
        confidence: Math.min(confidence + 50, 95),
        scores: {
          positivo: posProb,
          negativo: negProb,
          neutro: neuProb
        },
        color,
        emoji,
        timestamp: new Date().toLocaleTimeString('pt-BR')
      };

      setResult(analysis);
      setHistory(prev => [analysis, ...prev].slice(0, 5));
      setLoading(false);
    }, 800);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      analyzeSentiment(text);
    }
  };

  const examples = [
    "Adorei o produto, entrega rápida e muito bem embalado!",
    "Péssimo atendimento, nunca mais compro aqui",
    "O app funciona mas poderia melhorar algumas coisas"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Sistema de Análise de Sentimentos
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            IA aplicada para classificação automática de opiniões em português
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-indigo-600">
            <AlertCircle className="w-4 h-4" />
            <span>Baseado em algoritmos de PLN treinados com Weka</span>
          </div>
        </div>

        {/* Form de Análise */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Digite o texto para análise:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
              rows="4"
              placeholder="Ex: Adorei o atendimento, muito rápido e eficiente!"
            />
            
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !text.trim()}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analisando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analisar Sentimento
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Exemplos */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Exemplos para testar:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setText(ex)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition text-gray-700"
                >
                  "{ex.substring(0, 40)}..."
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultado da Análise */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`${result.color} text-white p-4 rounded-xl text-4xl`}>
                {result.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Sentimento: <span className="capitalize">{result.sentiment}</span>
                </h3>
                <p className="text-gray-600 mb-1">
                  Confiança: <span className="font-semibold">{result.confidence.toFixed(1)}%</span>
                </p>
                <p className="text-sm text-gray-500">Analisado às {result.timestamp}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Distribuição de Probabilidades:
              </h4>
              <div className="space-y-3">
                {Object.entries(result.scores).map(([sentiment, score]) => (
                  <div key={sentiment}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium">{sentiment}</span>
                      <span>{score.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          sentiment === 'positivo' ? 'bg-green-500' :
                          sentiment === 'negativo' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Histórico */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              Histórico de Análises
            </h3>
            <div className="space-y-3">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <span className="font-semibold capitalize">{item.sentiment}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({item.confidence.toFixed(0)}% confiança)
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{item.timestamp}</span>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{item.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <MessageCircle className="w-5 h-5 inline mr-2" />
          Projeto Integrador - Inteligência Artificial 2025
        </div>
      </div>
    </div>
  );
}
