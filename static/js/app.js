/** @format */
"use strict";

import { UaLog } from "./services/ualog3.js";
import { bindEventListener, showHtmlThread, wnds, Commands, TextInput, TextOutput, getTheme } from "./app_ui.js";
import { AppMgr } from "./app_mgr.js";
import { sendLog } from "./services/logger.js"
import "./services/uadialog.js";

const VERSIONE = " 0.1.2";

const release = () => {
  document.querySelector(".release").innerHTML = VERSIONE;
};


async function openApp() {
  try {
    wnds.init();
    Commands.init();
    UaLog.setXY(40, 6).setZ(111).new();
    // UaLog.log_show("");
    AppMgr.initApp();
    TextInput.init();
    TextOutput.init();
    bindEventListener();
    document.querySelector(".menu-btn").checked = false;
    release();
    await showHtmlThread();
    getTheme();
    const ok = await sendLog("ragtext-git");
    const url = window.location.href;
    console.info("url:", url);


    if (!ok)
      console.error("registrazione fallita");
  } catch (error) {
    console.error("Si è verificato un errore durante l'inizializzazione dell'app:", error);
  }
}
window.addEventListener("load", openApp);