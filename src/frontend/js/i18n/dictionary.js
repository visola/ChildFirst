import root from './strings/root'
import ptBR from './strings/ptBR'

const strings = {
  ptBR
}

class Dictionary {
  constructor() {
    let code = navigator.language;

    let split = code.split("-");
    let country = (split[1] || "").toUpperCase();
    let language = (split[0] || "").toLowerCase();

    this.full = strings[language+country] || {};
    this.lang = strings[language] || {};
  }

  get(code) {
    return this.full[code] || this.lang[code] || root[code];
  }
}

export default new Dictionary()
