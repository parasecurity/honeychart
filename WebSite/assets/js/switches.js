// Enable/disable text field according to the switches for Dionaea
function dionaeaSwitches(text) {
  switch (text) {
    case "HTTP":
      var textBox = document.getElementById("dio-http-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "HTTPS":
      var textBox = document.getElementById("dio-https-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "SMB":
      var textBox = document.getElementById("dio-smb-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "epmap":
      var textBox = document.getElementById("dio-epmap-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "FTP":
      var textBox = document.getElementById("dio-ftp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "TFTP":
      var textBox = document.getElementById("dio-tftp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "PPTP":
      var textBox = document.getElementById("dio-pptp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "MQTT":
      var textBox = document.getElementById("dio-mqtt-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "UPnP":
      var textBox = document.getElementById("dio-upnp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "MySQL":
      var textBox = document.getElementById("dio-mysql-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "MSSQL":
      var textBox = document.getElementById("dio-mssql-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "SIP-TCP":
      var textBox = document.getElementById("dio-sip-tcp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "SIP-UDP":
      var textBox = document.getElementById("dio-sip-udp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "SIP-TLS":
      var textBox = document.getElementById("dio-sip-tls-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "Memcache":
      var textBox = document.getElementById("dio-memcache-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
  }
}

// Enable/disable text field according to the switches for Conpot
function conpotSwitches(text) {
  switch (text) {
    case "HTTP":
      var textBox = document.getElementById("conpot-http-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "FTP":
      var textBox = document.getElementById("conpot-ftp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "TFTP":
      var textBox = document.getElementById("conpot-tftp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "Modbus":
      var textBox = document.getElementById("conpot-modbus-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "SNMP":
      var textBox = document.getElementById("conpot-snmp-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "S7comm":
      var textBox = document.getElementById("conpot-s7comm-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "BACnet":
      var textBox = document.getElementById("conpot-bacnet-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "IPMI":
      var textBox = document.getElementById("conpot-ipmi-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "enip":
      var textBox = document.getElementById("conpot-enip-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
  }
}

// Enable/disable text field according to the switches for Cowrie
function cowrieSwitches(text) {
  switch (text) {
    case "SSH":
      var textBox = document.getElementById("cowrie-ssh-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
    case "Telnet":
      var textBox = document.getElementById("cowrie-telnet-port");
      if (textBox.getAttribute("disabled") == "disabled") {
        textBox.removeAttribute("disabled");
      } else {
        textBox.setAttribute("disabled", "disabled");
      }
      break;
  }
}
