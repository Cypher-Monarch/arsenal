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

  const terminal = document.getElementById("terminal-lines");
  let lineIndex = 0;
  let charIndex = 0;
  let typingSpeed = 500 / 10; // ~120 WPM -> 500 chars/min = ~8.3 cps
  let cursor = document.createElement("span");
  cursor.textContent = "█";
  terminal.appendChild(cursor);

  function typeChar() {
    if (lineIndex < lines.length) {
      const line = lines[lineIndex];
      if (charIndex < line.length) {
        terminal.insertBefore(document.createTextNode(line[charIndex]), cursor);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        terminal.insertBefore(document.createTextNode("\n"), cursor);
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, typingSpeed);
      }
    } else {
      // Done typing, fade out the screen
      setTimeout(() => {
        document.getElementById("terminal-intro").classList.add("fade-out");
        document.body.style.overflow = "auto";
      }, 1000);
    }
  }

  typeChar();
});
