
const getClientIp = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) return 'xxx.xxx.xxx.xxx';
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Errore nel recuperare l\'IP:', error);
        return 'err.xxx.xxx.xxx';
    }
}
export const sendLog = async (clientId, payload = {}) => {
    const host = window.location.hostname;
    if (host === '127.0.0.1' || host === 'localhost') {
        console.log('Registrazione disattivata in ambiente locale');
        return true;
    }
    const firebaseDbUrl = 'https://simple-moniotr-default-rtdb.europe-west1.firebasedatabase.app/visite.json';
    const clientIp = await getClientIp();
    const dataDaInviare = {
        clientId: clientId,
        timestamp: new Date().toISOString(),
        ip: clientIp,
        userAgent: navigator.userAgent,
        ...payload // Aggiunge eventuali dati extra passati nel payload
    };
    try {
        const response = await fetch(firebaseDbUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataDaInviare)
        });

        return response.ok;
    } catch (error) {
        console.error('Errore durante l\'invio del log:', error);
        return false;
    }
}

