document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "[+] Initializing Cypher-Monarch's Arsenal...",
    "[+] Loading OS configs...",
    "[+] Mounting /dev/hdd_300GB",
    "[+] Loading Hyprland config",
    "[+] Establishing VPN handler...",
    "[+] Injecting scripts into bashrc...",
    "[✓] All systems online.",
    "Launching GUI interface..."
  ];

  const terminalIntro = document.getElementById("terminal-lines");
  const terminalDiv = document.getElementById("neofetch-output");
  let lineIndex = 0, charIndex = 0;
  const typingSpeed = 1;
  const cursor = document.createElement("span");
  cursor.textContent = "█";
  terminalIntro.appendChild(cursor);

  function typeChar() {
    if (lineIndex < lines.length) {
      const line = lines[lineIndex];
      if (charIndex < line.length) {
        terminalIntro.insertBefore(document.createTextNode(line[charIndex]), cursor);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        terminalIntro.insertBefore(document.createTextNode("\n"), cursor);
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, typingSpeed);
      }
    } else {
      setTimeout(() => {
        document.getElementById("terminal-intro").classList.add("fade-out");
        document.body.style.overflow = "auto";

        terminalDiv.style.display = "block";
        terminalDiv.innerHTML = "";
        addNewPrompt();
      }, 1000);
    }
  }

  typeChar();

  const asciiArt = String.raw`
 _____             _                     ___  ___                           _     
/  __ \           | |                    |  \/  |                          | |    
| /  \/_   _ _ __ | |__   ___ _ __ ______| .  . | ___  _ __   __ _ _ __ ___| |__  
| |   | | | | '_ \| '_ \ / _ \ '__|______| |\/| |/ _ \| '_ \ / _' | '__/ __| '_ \ 
| \__/\ |_| | |_) | | | |  __/ |         | |  | | (_) | | | | (_| | | | (__| | | |
 \____/\__, | .__/|_| |_|\___|_|         \_|  |_/\___/|_| |_|\__,_|_|  \___|_| |_|
        __/ | |                                                                   
       |___/|_|                                                                   

OS      : Arch Linux (Hyprland, external HDD)
WM      : Hyprland 🔪
Kernel  : 6.xx.x-arch1-1
Uptime  : 6h 43m
CPU     : Intel i7-1255U (10C/12T)
GPU     : Intel UHD Graphics (tweaked to hell)
RAM     : 16GB DDR4 @ 3200MHz
Shell   : bash + kitty
Editor  : Code-Oss and Neovim
Mood    : Chaotic Good
`;

  const commands = {
    neofetch: () => asciiArt,
    help: () => "Available commands:\n- neofetch\n- help\n- clear\n- whoami\n- sudo\n- ls\n- sudo rm -rf /",
    whoami: () => "Not the GOAT Cypher-Monarch fs",
    ls: () => "Nothing here lol",
    sudo: () => "💀 Permission denied: you ain't root",
    "sudo rm -rf /": () => "😈 Initiating global self-destruction... just kidding lol. Arsenal's too powerful to delete.",
    clear: () => ""
  };

  function addNewPrompt() {
    const promptLine = document.createElement("div");
    promptLine.className = "terminal-line";

    const promptLabel = document.createElement("span");
    promptLabel.className = "prompt";
    promptLabel.textContent = "[cypher@arsenal ~]$";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.spellcheck = false;

    promptLine.appendChild(promptLabel);
    promptLine.appendChild(input);
    terminalDiv.appendChild(promptLine);

    input.focus();
    terminalDiv.scrollTop = terminalDiv.scrollHeight;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        input.disabled = true;
        runCommand(cmd);
      }
    });
  }

  function runCommand(cmd) {
    if (!terminalDiv) return;

    if (cmd === "clear") {
      terminalDiv.innerHTML = "";
      addNewPrompt();
      return;
    }

    const output = document.createElement("pre");
    output.textContent = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}`;
    terminalDiv.appendChild(output);

    addNewPrompt();
    terminalDiv.scrollTop = terminalDiv.scrollHeight;
    document.getElementById("terminal-hint").style.display = "none";
  }
});
