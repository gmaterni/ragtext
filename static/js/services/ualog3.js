/** @format */
"use strict";

import { UaWindowAdm } from "./uawindow.js";

const log = document.getElementById("id_log");

const callShow = () => {
  if (!log) return;
  if (log.classList.contains("active")) return;
  log.classList.add("active");
};

const callHide = () => {
  if (!log) return;
  if (!log.classList.contains("active")) return;
  log.classList.remove("active");
};

export const UaLog = {
  active: false,
  wind: null,
  x: null,
  y: null,
  z: null,
  max_length: 2000,
  msg_id: "ualogmsg_",
  new() {
    if (this.wind == null) {
      this.wind = UaWindowAdm.create("ualog_id");
      this.wind.drag();
    }
    const h = `
    <button type="button" class="clear">Clear</button>
    <button type="button" class="close">Close</button>
    <pre id="ualogmsg_"></pre>`;
    this.wind.setHtml(h);
    document.getElementById("ualog_id").addEventListener("click", (e) => {
      if (e.target.classList.contains("clear")) {
        this.cls();
      } else if (e.target.classList.contains("close")) {
        this.close();
      }
    });
    if (!!this.x) this.wind.vw_vh().setXY(this.x, this.y, -1);
    else this.wind.setCenter(-1);
    if (!!this.z) this.wind.setZ(this.z);
    return this;
  },
  setXY(x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  setZ(z) {
    this.z = z;
    return this;
  },
  prn_(...args) {
    let s = args.join("\n");
    let e = document.getElementById(this.msg_id);
    let h = e.textContent + s + "\n";
    e.textContent = h;
  },
  print(...args) {
    if (this.wind == null) return;
    if (!this.active) return;
    this.prn_(...args);
  },
  log(...args) {
    if (this.wind == null) return;
    this.prn_(...args);
  },
  log_show(...args) {
    if (this.wind == null) return;
    if (!this.active) this.toggle();
    this.prn_(...args);
  },
  cls() {
    if (this.wind == null) return;
    document.getElementById(this.msg_id).innerHTML = "";
    return this;
  },
  close() {
    if (this.wind == null) return;
    this.wind.hide();
    this.active = false;
    callHide();
  },
  toggle() {
    if (this.wind == null) return;
    if (!this.active) {
      this.active = true;
      this.wind.show();
      callShow();
    } else {
      this.active = false;
      this.wind.hide();
      callHide();
    }
  },
};
