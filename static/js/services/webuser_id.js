
export const WebId = (() => {
    const storageKey = 'ua_web_id';

    const get = () => {
        const now = new Date().toISOString();
        let userData = localStorage.getItem(storageKey);
        if (userData) {
            userData = JSON.parse(userData);
            userData.lastRequest = now;
            localStorage.setItem(storageKey, JSON.stringify(userData));
            return userData;
        } else {
            const url = new URL(window.location.href);
            const newUserData = {
                id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
                firstRequest: now,
                lastRequest: now,
                hosname: url.hostname,
                pathname: url.pathname
            };
            localStorage.setItem(storageKey, JSON.stringify(newUserData));
            return newUserData;
        }
    };

    const clear = () => {
        localStorage.removeItem(storageKey);
        console.log('User ID rimosso dal localStorage');
    };

    // API pubblica
    return {
        get,
        clear
    };
})();

/*
import { webId } from './webId.js';

// Utilizzo del metodo get
const userData = webId.get();
console.log(userData);

// Utilizzo del metodo clear
webId.clear();
*/
/*
export const myModule = (() => {
    // Variabili private
    const privateVar = 'valore privato';

    // Funzioni private
    const privateFunction = () => {
        console.log(privateVar);
    };

    // Metodi pubblici
    const publicMethod1 = () => {
        privateFunction();
    };

    const publicMethod2 = () => {
        console.log('Metodo pubblico 2');
    };

    // API pubblica
    return {
        publicMethod1,
        publicMethod2
    };
})();
*/