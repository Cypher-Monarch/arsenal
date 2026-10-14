/* ===== Arsenal boot sequence, navigation, and simulated terminal ===== */
document.addEventListener("DOMContentLoaded", () => {
  const boot = document.getElementById("terminal-intro");
  const bootText = document.getElementById("terminal-lines");
  const bootLines = [
    "[•] Mounting Arsenal configuration...",
    "[•] Detecting Arch Linux / Hyprland...",
    "[•] Connecting the moving parts...",
    "[•] Loading services and questionable automation...",
    "[✓] System online.",
    "[→] Welcome to the Arsenal."
  ];

  document.body.classList.add("booting");

  const finishBoot = () => {
    if (!boot) return;
    boot.classList.add("is-done");
    document.body.classList.remove("booting");
    window.setTimeout(() => boot.remove(), 650);
  };

  if (!boot || !bootText || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishBoot();
  } else {
    let line = 0;
    let char = 0;
    let output = "";
    const typeNext = () => {
      if (line >= bootLines.length) {
        window.setTimeout(finishBoot, 350);
        return;
      }
      const current = bootLines[line];
      output += current.charAt(char);
      bootText.textContent = output + "▌";
      char += 1;
      if (char >= current.length) {
        output += "\n";
        line += 1;
        char = 0;
      }
      window.setTimeout(typeNext, 13);
    };
    typeNext();
    window.setTimeout(finishBoot, 5000);
  }

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      navLinks.classList.toggle("is-open", open);
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      }
    });
  }

  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("neofetch-output");
  const terminalHint = document.getElementById("terminal-hint");

  const neofetch = String.raw`________
\_____  \   ____ ___.__.___  ___
 /   |   \ /    <   |  |\  \/  /
/    |    \   |  \___  | >    <
\_______  /___|  / ____|/__/\_ \
        \/     \/\/           \/

OS       Arch Linux (btw)
WM       Hyprland
CPU      Intel Core i7-1255U
GPU      Intel UHD Graphics
RAM      16 GB DDR4
SHELL    Zsh + Kitty
EDITOR   Neovim / Code-OSS
STATUS   codeable`;

  const commandHelp = `Available commands:
  help       show this command list
  neofetch   display system specs
  fastfetch  same machine, faster attitude
  whoami     identify the operator
  hostname   show this machine's name
  uname      kernel / operating system info
  pwd        print the current directory
  ls         list files in the Arsenal
  tree       show the project layout
  cat        read a known file
  date       show today's date
  uptime     report fictional uptime
  echo       print a message
  history    show commands from this session
  clear      clear the terminal
  exit       close the pretend session

This is a simulated shell. Nothing is executed on the host.`;
  const files = {
    'README.md': 'ARSENAL / CY­PHER-MONARCH\nA personal systems index. Built with curiosity and too many scripts.',
    'about.txt': 'Operator: Cypher-Monarch\nInterests: Linux, self-hosting, automation, interfaces, hardware.',
    'stack.txt': 'Arch Linux · Hyprland · systemd · Kitty · Zsh · Neovim',
    'todo.txt': '1. Automate the boring bits.\n2. Improve the setup.\n3. Somehow create three new projects.'
  };
  const history = [];
  const commands = {
    help: commandHelp,
    neofetch,
    fastfetch: neofetch,
    whoami: 'cypher-monarch\nSystems enthusiast. Interface enjoyer. Serial automator.',
    hostname: 'arsenal',
    uname: 'Linux arsenal 6.x-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\n(simulated output)',
    pwd: '/home/cypher/arsenal',
    ls: 'README.md  about.txt  stack.txt  todo.txt  projects/  configs/  scripts/  services/',
    tree: '.\n├── README.md\n├── about.txt\n├── stack.txt\n├── todo.txt\n├── configs/\n├── projects/\n├── scripts/\n└── services/',
    date: () => new Date().toString(),
    uptime: 'up 999 days, 23 hours, 59 mins\nload average: curiosity, tinkering, one-more-fix',
    history: () => history.map((item, index) => ` ${index + 1}  ${item}`).join('\n') || 'No commands yet.',
    clear: '', cls: '',
    exit: 'Session remains open. You live here now.',
    'sudo': 'Permission denied: nice try, operator.',
    'sudo rm -rf /': 'Request denied. The Arsenal has plot armour.'
  };

  if (terminalForm && terminalInput && terminalOutput) {
    terminalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const raw = terminalInput.value.trim();
      if (!raw) return;
      const [command, ...args] = raw.split(/\s+/);
      const name = command.toLowerCase();
      history.push(raw);
      const previous = terminalOutput.textContent.trim();
      let result;
      if (name === "echo") result = args.join(" ");
      else if (name === "cat") {
        const filename = args[0];
        result = filename && Object.prototype.hasOwnProperty.call(files, filename)
          ? files[filename]
          : `cat: ${filename || ""}: file not found\nTry: README.md, about.txt, stack.txt, todo.txt`;
      } else if (name === "man") result = args[0] ? `No manual entry for ${args[0]}. Try 'help'.` : "What manual page do you want?";
      else if (Object.prototype.hasOwnProperty.call(commands, name)) {
        result = typeof commands[name] === "function" ? commands[name]() : commands[name];
      } else {
        result = `Command not found: ${name}\nType "help" for available commands.`;
      }
      terminalOutput.textContent = name === "clear" || name === "cls"
        ? ""
        : `${previous ? previous + "\n\n" : ""}[cypher@arsenal ~]$ ${raw}\n${result}`;
      terminalInput.value = "";
      if (terminalHint) terminalHint.style.display = "none";
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
  }

  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector(".footer p");
  if (footerText) footerText.textContent = `Built with curiosity, obsession, and way too many scripts. · ${currentYear}`;
});
