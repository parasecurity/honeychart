function openLink(urlQuery) {
  if (urlQuery == "http") {
    window
      .open("https://www.speedguide.net/port.php?port=80", "_blank")
      .focus();
  } else if (urlQuery == "https") {
    window
      .open("https://www.speedguide.net/port.php?port=443", "_blank")
      .focus();
  } else if (urlQuery == "smb") {
    window
      .open("https://www.speedguide.net/port.php?port=445", "_blank")
      .focus();
  } else if (urlQuery == "epmap") {
    window
      .open("https://www.speedguide.net/port.php?port=135", "_blank")
      .focus();
  } else if (urlQuery == "ftp") {
    window
      .open("https://www.speedguide.net/port.php?port=21", "_blank")
      .focus();
  } else if (urlQuery == "tftp") {
    window
      .open("https://www.speedguide.net/port.php?port=69", "_blank")
      .focus();
  } else if (urlQuery == "pptp") {
    window
      .open("https://www.speedguide.net/port.php?port=1723", "_blank")
      .focus();
  } else if (urlQuery == "mqtt") {
    window
      .open("https://www.speedguide.net/port.php?port=1883", "_blank")
      .focus();
  } else if (urlQuery == "upnp") {
    window
      .open("https://www.speedguide.net/port.php?port=1900", "_blank")
      .focus();
  } else if (urlQuery == "mysql") {
    window
      .open("https://www.speedguide.net/port.php?port=3306", "_blank")
      .focus();
  } else if (urlQuery == "mssql") {
    window
      .open("https://www.speedguide.net/port.php?port=1433", "_blank")
      .focus();
  } else if (urlQuery == "siptcp") {
    window
      .open("https://www.speedguide.net/port.php?port=5060", "_blank")
      .focus();
  } else if (urlQuery == "sipudp") {
    window
      .open("https://www.speedguide.net/port.php?port=5060", "_blank")
      .focus();
  } else if (urlQuery == "siptls") {
    window
      .open("https://www.speedguide.net/port.php?port=5061", "_blank")
      .focus();
  } else if (urlQuery == "memcache") {
    window
      .open("https://www.speedguide.net/port.php?port=11211", "_blank")
      .focus();
  } else if (urlQuery == "modbus") {
    window
      .open("https://www.speedguide.net/port.php?port=502", "_blank")
      .focus();
  } else if (urlQuery == "snmp") {
    window
      .open("https://www.speedguide.net/port.php?port=161", "_blank")
      .focus();
  } else if (urlQuery == "s7comm") {
    window
      .open("https://www.speedguide.net/port.php?port=102", "_blank")
      .focus();
  } else if (urlQuery == "bacnet") {
    window
      .open("https://www.speedguide.net/port.php?port=47808", "_blank")
      .focus();
  } else if (urlQuery == "ipmi") {
    window
      .open("https://www.speedguide.net/port.php?port=623", "_blank")
      .focus();
  } else if (urlQuery == "enip") {
    window
      .open("https://www.speedguide.net/port.php?port=44818", "_blank")
      .focus();
  } else if (urlQuery == "ssh") {
    window
      .open("https://www.speedguide.net/port.php?port=22", "_blank")
      .focus();
  } else if (urlQuery == "telnet") {
    window
      .open("https://www.speedguide.net/port.php?port=23", "_blank")
      .focus();
  } else if (urlQuery == "nodeport") {
    window
      .open(
        "https://kubernetes.io/docs/concepts/services-networking/service/",
        "_blank"
      )
      .focus();
  }
}
