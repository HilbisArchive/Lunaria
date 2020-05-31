/*
    Kanna, a small and light terminal shell for Windows.
    Copyright (C) 2020 Terminalfreaks
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const os = require("os")
const { colorMap } = require("./colorMap.json")
const Path = require("./Path.js")

class KannaUtils {
  static getPrompt() {
    const vals = {
      "%username%": os.userInfo().username,
      "%hostname%": os.hostname(),
      "%cwd%": Path.handle(process.cwd()),
      "%cwf%": Path.handle(process.cwd()).split("\\")[Path.handle(process.cwd()).split("\\").length - 1],
      ...colorMap
    }
    let str = this.config().prompt
    for(let key in vals) {
        str = str.replace(new RegExp(key, "g"), vals[key])
    }
    return str
  }

  static displayMOTD() {
    let motd = this.config().motd
    if(!motd || motd === "") return;
    const vals = {
      "%username%": os.userInfo().username,
      "%hostname%": os.hostname(),
      "%cwd%": Path.handle(process.cwd()),
      "%cwf%": Path.handle(process.cwd()).split("\\")[Path.handle(process.cwd()).split("\\").length - 1],
      "%ver%": require("../package.json").version,
      ...colorMap
    }
    for(let key in vals) {
        motd = motd.replace(new RegExp(key, "g"), vals[key])
    }
    return console.log(motd + colorMap["{reset}"])
  }

  static config() {
  	if(require("fs").existsSync(`${os.userInfo().homedir}\\.kannashell\\config.json`)) {
  		return JSON.parse(require("fs").readFileSync(`${os.userInfo().homedir}\\.kannashell\\config.json`))
  	} else {
  		return false;
  	}
  }
}

module.exports = KannaUtils;