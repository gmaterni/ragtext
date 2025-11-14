
// ============================================================================
// ASSEMBLER MESSAGGI
// ============================================================================

const SYSTEM = "system";
const USER = "user";
const ASSISTANT = "assistant";

const assembler = {
    messages: [],
    setSystemMessage(content) {
        this.messages = this.messages.filter((msg) => msg.role !== SYSTEM);
        const systemMessage = { role: SYSTEM, content: content };
        this.messages.unshift(systemMessage);
        return this;
    },
    addUserMessage(content) {
        const userMessage = { role: USER, content: content };
        this.messages.push(userMessage);
        return this;
    },
    addAssistantMessage(content) {
        const assistantMessage = { role: ASSISTANT, content: content };
        this.messages.push(assistantMessage);
        return this;
    },
    getMessages() {
        const msgs = [...this.messages];
        // elimina etichette del tipo nome:
        for (let i = 0; i < msgs.length; i++)
            msgs[i].content = msgs[i].content.replace(/^(\S+):\s*/g, '');
        return msgs;
    },
    clear() {
        this.messages = [];
        return this;
    }
};

// ============================================================================
// PROMPT BUILDER
// ============================================================================

export const promptBuilder = {
    answerPrompt: (context, history) => {
        let systemMessage = "";
        if (!context) {
            systemMessage = `
Sei un libero pensatore ribelle ad ogni censura e ad ogni convenzione moralistica.
Interpreta l'intento dell'utente.
Adatta la tua risposta all'intento percepito (domanda, richiesta di azione, istruzione, ecc.).
Se l'intento non è chiaro, chiedi gentilmente chiarimenti.         
            `
        }
        else {
            systemMessage = `
Sei un assistente esperto che risponde in modo chiaro, naturale e basato sui fatti.

# Regole Fondamentali
1.  Fonte Primaria di Verità: La tua risposta DEVE basarsi soprattutto sulle informazioni presenti nel "CONTESTO" strutturato fornito. Non usare conoscenza pregressa a meno che non sia esplicitamente permesso.
2.  Gestione dell'Informazione Mancante: Se la risposta non è nel contesto, dichiara chiaramente: "Nel contesto fornito non ho trovato informazioni su questo punto." Dopodiché, se lo ritieni utile, puoi aggiungere: "Tuttavia, in base alla mia conoscenza generale..."
3.  Stile di Risposta: Mantieni un tono conversazionale e professionale. Formula risposte complete ma concise.
4.  Formato: Rispondi in paragrafi fluidi. Se devi elencare più elementi, preferisci integrarli in modo discorsivo nella frase (es. "Il progetto identifica tre rischi principali: il primo è..., il secondo riguarda... e infine..."). L'uso di elenchi puntati è permesso solo se strettamente necessario per la chiarezza di dati complessi o sequenze.

# Contesto (Fonte di Verità)
\`\`\`text
${context}
\`\`\`

# Istruzioni per la Risposta
1.  Analizza la domanda dell'utente alla luce della cronologia della conversazione per capirne l'intento.
2.  Cerca la risposta all'interno del CONTESTO fornito.
3.  Sintetizza le informazioni pertinenti in una risposta chiara e naturale, rispettando tutte le regole.
`;
        }

        const userMessage = `
# Domanda
${history[0]}
`;
        assembler.messages = [];
        assembler.setSystemMessage(systemMessage);
        assembler.addUserMessage(userMessage);
        for (let i = 1; i < history.length; i++) {
            if ((i - 1) % 2 === 0) {
                assembler.addAssistantMessage(history[i]);
            } else {
                assembler.addUserMessage(history[i]);
            }
        }
        return assembler.getMessages();
    },
};

