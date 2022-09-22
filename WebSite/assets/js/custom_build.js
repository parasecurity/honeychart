var dionaeaSettings;
var conpotSettings;
var cowrieSettings;
var first = 1; //functions as a flag for the first addition
var node = -1; //functions as a flag for the service (nodeport or load balancer)
var ip = ""; //stores the load balancer IP

// Regular expressions for validity checks
// var nameCheck = new RegExp("^([a-zA-Z0-9-]{3,20}$)");
// var portNumbers = new RegExp("^([0-9]{1,5}$)");
// var ipCheck = new RegExp(
//   "^(([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)\\.){3}([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)$"
// );
// var replicaCheck = new RegExp("^([1-9]|[1-9][0-9]|100)$");

// Stores chart info
var data = {
  name: "",
  service: {
    type: "",
    lbIp: null,
  },
  replicaCount: 0,
  honeypots: {
    names: [],
    dionaea: {
      volumes: [],
      services: [],
      containerports: [],
      protocols: [],
    },
    conpot: {
      volumes: [],
      services: [],
      containerports: [],
      protocols: [],
    },
    cowrie: {
      volumes: [],
      services: [],
      containerports: [],
      protocols: [],
    },
  },
};

// Changes the text of the dropdown menu to the selected honeypot
function change_honeypot_menu_text(text) {
  document.getElementById("custom-hp-menu").textContent = text;
}

// Shows the Dionaea settings
function dionaea() {
  var dioName = document.getElementById("dio-name-field");
  var dioReplica = document.getElementById("dio-repl-field");
  var dioService = document.getElementById("dio-node-lb");

  // Disables the service selection when Dionaea isn't the first addition
  if (first == 0) {
    dioService.classList.add("d-none");
    dioName.classList.add("d-none");
    dioReplica.classList.add("d-none");
  }

  change_honeypot_menu_text("Dionaea");
  conpotSettings.classList.add("d-none");
  cowrieSettings.classList.add("d-none");
  dionaeaSettings.classList.remove("d-none");
}

// Shows the Conpot settings
function conpot() {
  var conName = document.getElementById("conpot-name-field");
  var conReplica = document.getElementById("conpot-repl-field");
  var conService = document.getElementById("conpot-node-lb");

  // Disables the service selection when Conpot isn't the first addition
  if (first == 0) {
    conName.classList.add("d-none");
    conReplica.classList.add("d-none");
    conService.classList.add("d-none");
  }

  change_honeypot_menu_text("Conpot");
  dionaeaSettings.classList.add("d-none");
  cowrieSettings.classList.add("d-none");
  conpotSettings.classList.remove("d-none");
}

// Shows the Cowrie settings
function cowrie() {
  var cowName = document.getElementById("cowrie-name-field");
  var cowReplica = document.getElementById("cowrie-repl-field");
  var cowService = document.getElementById("cowrie-node-lb");

  // Disables the service selection when Cowrie isn't the first addition
  if (first == 0) {
    cowName.classList.add("d-none");
    cowReplica.classList.add("d-none");
    cowService.classList.add("d-none");
  }

  change_honeypot_menu_text("Cowrie");
  dionaeaSettings.classList.add("d-none");
  conpotSettings.classList.add("d-none");
  cowrieSettings.classList.remove("d-none");
}

function init() {
  // Bootstrap tooltip trigger
  const tooltips = document.querySelectorAll(".tt");
  tooltips.forEach((t) => {
    new bootstrap.Tooltip(t);
  });

  // Initialize the settings elements
  dionaeaSettings = document.getElementById("dionaea_settings");
  conpotSettings = document.getElementById("conpot_settings");
  cowrieSettings = document.getElementById("cowrie_settings");
}

function addDionaea() {
  // Resetting arrays in case of errors
  data.honeypots.dionaea.services = [];
  data.honeypots.dionaea.containerports = [];
  data.honeypots.dionaea.protocols = [];

  // Check switches (true/false)
  var http = document.getElementById("dio-http-switch").checked;
  var https = document.getElementById("dio-https-switch").checked;
  var smb = document.getElementById("dio-smb-switch").checked;
  var epmap = document.getElementById("dio-epmap-switch").checked;
  var ftp = document.getElementById("dio-ftp-switch").checked;
  var tftp = document.getElementById("dio-tftp-switch").checked;
  var pptp = document.getElementById("dio-pptp-switch").checked;
  var mqtt = document.getElementById("dio-mqtt-switch").checked;
  var upnp = document.getElementById("dio-upnp-switch").checked;
  var mysql = document.getElementById("dio-mysql-switch").checked;
  var mssql = document.getElementById("dio-mssql-switch").checked;
  var sipTCP = document.getElementById("dio-sip-tcp-switch").checked;
  var sipUDP = document.getElementById("dio-sip-udp-switch").checked;
  var sipTLS = document.getElementById("dio-sip-tls-switch").checked;
  var memcache = document.getElementById("dio-memcache-switch").checked;

  let portCount = 0;
  var err = document.getElementById("dio-error-msg");

  // Register selected services and corresponding ports
  if (http) {
    var port = document.getElementById("dio-http-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ http: port });
    data.honeypots.dionaea.containerports.push(80);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (https) {
    var port = document.getElementById("dio-https-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ https: port });
    data.honeypots.dionaea.containerports.push(443);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (smb) {
    var port = document.getElementById("dio-smb-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ smb: port });
    data.honeypots.dionaea.containerports.push(445);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (epmap) {
    var port = document.getElementById("dio-epmap-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ epmap: port });
    data.honeypots.dionaea.containerports.push(135);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (ftp) {
    var port = document.getElementById("dio-ftp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ ftp: port });
    data.honeypots.dionaea.containerports.push(21);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (tftp) {
    var port = document.getElementById("dio-tftp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ tftp: port });
    data.honeypots.dionaea.containerports.push(69);
    data.honeypots.dionaea.protocols.push("UDP");
    portCount++;
  }
  if (pptp) {
    var port = document.getElementById("dio-pptp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ pptp: port });
    data.honeypots.dionaea.containerports.push(1723);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (mqtt) {
    var port = document.getElementById("dio-mqtt-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ mqtt: port });
    data.honeypots.dionaea.containerports.push(1883);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (upnp) {
    var port = document.getElementById("dio-upnp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ upnp: port });
    data.honeypots.dionaea.containerports.push(1900);
    data.honeypots.dionaea.protocols.push("UDP");
    portCount++;
  }
  if (mysql) {
    var port = document.getElementById("dio-mysql-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ mysql: port });
    data.honeypots.dionaea.containerports.push(3306);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (mssql) {
    var port = document.getElementById("dio-mssql-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ mssql: port });
    data.honeypots.dionaea.containerports.push(1433);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (sipTCP) {
    var port = document.getElementById("dio-sip-tcp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ siptcp: port });
    data.honeypots.dionaea.containerports.push(5060);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (sipUDP) {
    var port = document.getElementById("dio-sip-udp-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ sipudp: port });
    data.honeypots.dionaea.containerports.push(5060);
    data.honeypots.dionaea.protocols.push("UDP");
    portCount++;
  }
  if (sipTLS) {
    var port = document.getElementById("dio-sip-tls-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ siptls: port });
    data.honeypots.dionaea.containerports.push(5061);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }
  if (memcache) {
    var port = document.getElementById("dio-memcache-port").value;
    if (!validatePortNumber(port, "dio-err-div", "dio-error-msg")) {
      return;
    }
    data.honeypots.dionaea.services.push({ memcache: port });
    data.honeypots.dionaea.containerports.push(11211);
    data.honeypots.dionaea.protocols.push("TCP");
    portCount++;
  }

  // Set the chart name and service (Nodeport/LB)
  if (first == 1) {
    var chartNameForm = document.getElementById("dio-name").value;
    var replicaForm = document.getElementById("dio-replicas").value;

    // Validate chart name and replica number
    if (!validateName(chartNameForm, "dio-err-div", "dio-error-msg")) {
      return;
    }
    if (!validateReplicas(replicaForm, "dio-err-div", "dio-error-msg")) {
      return;
    }
    // Error message in case no service is selected
    if (portCount == 0) {
      document.getElementById("dio-err-div").classList.remove("d-none");
      err.innerHTML = "Please select at least one service";
      return;
    }

    data.name = chartNameForm;
    data.replicaCount = replicaForm;
    if (document.getElementById("dio-nodeport-check").checked) {
      // When nodeport is selected
      node = 1;
      data.service.type = "Nodeport";
      data.service.lbIp = null;
    } else if (document.getElementById("dio-lb-check").checked) {
      // When LoadBalancer is selected
      var ipForm = document.getElementById("dio-ip-field").value;
      // Validate IP address
      if (!validateIp(ipForm, "dio-err-div", "dio-error-msg")) {
        return;
      }
      node = 0;
      data.service.type = "LoadBalancer";
      data.service.lbIp = ipForm;
      ip = data.service.lbIp;
    } else {
      // In case no service is selected
      document.getElementById("dio-err-div").classList.remove("d-none");
      err.innerHTML = "You must choose service type (Nodeport/LoadBalancer)";
      return;
    }
    chartInfo();
    first = 0;
    document.getElementById("create-chart").classList.remove("d-none");
  }

  // Error message in case no service is selected
  if (portCount == 0) {
    document.getElementById("dio-err-div").classList.remove("d-none");
    err.innerHTML = "Please select at least one service";
    return;
  }

  data.honeypots.names.push("dionaea");
  volumes = document.getElementById("dio-log-dir").value;
  if (volumes !== "") {
    data.honeypots.dionaea.volumes[0] = volumes;
  }

  dionaeaSettings.classList.add("d-none");
  change_honeypot_menu_text("Honeypots");
  document.getElementById("dio-drop-menu").classList.add("disabled");
  generateInfo("dionaea");
  console.log(data);
}

function addConpot() {
  // Resetting arrays in case of errors
  data.honeypots.conpot.services = [];
  data.honeypots.conpot.containerports = [];
  data.honeypots.conpot.protocols = [];

  // Check switches (true/false)
  var http = document.getElementById("conpot-http-switch").checked;
  var ftp = document.getElementById("conpot-ftp-switch").checked;
  var tftp = document.getElementById("conpot-tftp-switch").checked;
  var modbus = document.getElementById("conpot-modbus-switch").checked;
  var snmp = document.getElementById("conpot-snmp-switch").checked;
  var s7comm = document.getElementById("conpot-s7comm-switch").checked;
  var bacnet = document.getElementById("conpot-bacnet-switch").checked;
  var ipmi = document.getElementById("conpot-ipmi-switch").checked;
  var enip = document.getElementById("conpot-enip-switch").checked;

  let portCount = 0;
  var err = document.getElementById("conpot-error-msg");

  // Register selected services and corresponding ports
  if (http) {
    var port = document.getElementById("conpot-http-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ http: port });
    data.honeypots.conpot.containerports.push(80);
    data.honeypots.conpot.protocols.push("TCP");
    portCount++;
  }
  if (ftp) {
    var port = document.getElementById("conpot-ftp-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ ftp: port });
    data.honeypots.conpot.containerports.push(2121);
    data.honeypots.conpot.protocols.push("TCP");
    portCount++;
  }
  if (tftp) {
    var port = document.getElementById("conpot-tftp-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ tftp: port });
    data.honeypots.conpot.containerports.push(6969);
    data.honeypots.conpot.protocols.push("UDP");
    portCount++;
  }
  if (modbus) {
    var port = document.getElementById("conpot-modbus-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ modbus: port });
    data.honeypots.conpot.containerports.push(5020);
    data.honeypots.conpot.protocols.push("TCP");
    portCount++;
  }
  if (snmp) {
    var port = document.getElementById("conpot-snmp-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ snmp: port });
    data.honeypots.conpot.containerports.push(16100);
    data.honeypots.conpot.protocols.push("UDP");
    portCount++;
  }
  if (s7comm) {
    var port = document.getElementById("conpot-s7comm-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ s7comm: port });
    data.honeypots.conpot.containerports.push(10201);
    data.honeypots.conpot.protocols.push("TCP");
    portCount++;
  }
  if (bacnet) {
    var port = document.getElementById("conpot-bacnet-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ bacnet: port });
    data.honeypots.conpot.containerports.push(47808);
    data.honeypots.conpot.protocols.push("UDP");
    portCount++;
  }
  if (ipmi) {
    var port = document.getElementById("conpot-ipmi-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ ipmi: port });
    data.honeypots.conpot.containerports.push(6230);
    data.honeypots.conpot.protocols.push("UDP");
    portCount++;
  }
  if (enip) {
    var port = document.getElementById("conpot-enip-port").value;
    if (!validatePortNumber(port, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    data.honeypots.conpot.services.push({ enip: port });
    data.honeypots.conpot.containerports.push(44818);
    data.honeypots.conpot.protocols.push("TCP");
    portCount++;
  }

  // Set the chart service (Nodeport/LB)
  if (first == 1) {
    var chartNameForm = document.getElementById("conpot-name").value;
    var replicaForm = document.getElementById("conpot-replicas").value;

    // Validate chart name and replica number
    if (!validateName(chartNameForm, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    if (!validateReplicas(replicaForm, "conpot-err-div", "conpot-error-msg")) {
      return;
    }
    // Error message in case no service is selected
    if (portCount == 0) {
      document.getElementById("conpot-err-div").classList.remove("d-none");
      err.innerHTML = "Please select at least one service";
      return;
    }

    if (portCount == 0) {
      document.getElementById("conpot-err-div").classList.remove("d-none");
      err.innerHTML = "Please select at least one service";
      return;
    }

    data.name = chartNameForm;
    data.replicaCount = replicaForm;
    if (document.getElementById("conpot-nodeport-check").checked) {
      // When nodeport is selected
      node = 1;
      data.service.type = "Nodeport";
      data.service.lbIp = null;
    } else if (document.getElementById("conpot-lb-check").checked) {
      // When LoadBalancer is selected
      var ipForm = document.getElementById("conpot-ip-field").value;
      // Validate IP address
      if (!validateIp(ipForm, "conpot-err-div", "conpot-error-msg")) {
        return;
      }
      node = 0;
      data.service.type = "LoadBalancer";
      data.service.lbIp = ipForm;
      ip = data.service.lbIp;
    } else {
      // In case no service is selected
      document.getElementById("conpot-err-div").classList.remove("d-none");
      err.innerHTML = "You must choose service type (Nodeport/LoadBalancer)";
      return;
    }

    chartInfo();
    first = 0;
    document.getElementById("create-chart").classList.remove("d-none");
  }

  if (portCount == 0) {
    document.getElementById("conpot-err-div").classList.remove("d-none");
    err.innerHTML = "Please select at least one service";
    return;
  }

  data.honeypots.names.push("conpot");
  volumes = document.getElementById("conpot-log-dir").value;
  if (volumes !== "") {
    data.honeypots.conpot.volumes[0] = volumes;
  }

  conpotSettings.classList.add("d-none");
  change_honeypot_menu_text("Honeypots");
  document.getElementById("conpot-drop-menu").classList.add("disabled");
  generateInfo("conpot");
  console.log(data);
}

function addCowrie() {
  // Resetting arrays in case of errors
  data.honeypots.cowrie.services = [];
  data.honeypots.cowrie.containerports = [];
  data.honeypots.cowrie.protocols = [];

  // Check switches (true/false)
  var ssh = document.getElementById("cowrie-ssh-switch").checked;
  var telnet = document.getElementById("cowrie-telnet-switch").checked;

  let portCount = 0;
  var err = document.getElementById("cowrie-error-msg");

  // Register selected services and corresponding ports
  if (ssh) {
    var port = document.getElementById("cowrie-ssh-port").value;
    if (!validatePortNumber(port, "cowrie-err-div", "cowrie-error-msg")) {
      return;
    }
    data.honeypots.cowrie.services.push({ ssh: port });
    data.honeypots.cowrie.containerports.push(2222);
    data.honeypots.cowrie.protocols.push("TCP");
    portCount++;
  }
  if (telnet) {
    var port = document.getElementById("cowrie-telnet-port").value;
    if (!validatePortNumber(port, "cowrie-err-div", "cowrie-error-msg")) {
      return;
    }
    data.honeypots.cowrie.services.push({ telnet: port });
    data.honeypots.cowrie.containerports.push(2223);
    data.honeypots.cowrie.protocols.push("TCP");
    portCount++;
  }

  // Set the chart service (Nodeport/LB)
  if (first == 1) {
    var chartNameForm = document.getElementById("cowrie-name").value;
    var replicaForm = document.getElementById("cowrie-replicas").value;

    // Error message in case no service is selected
    if (portCount == 0) {
      document.getElementById("cowrie-err-div").classList.remove("d-none");
      err.innerHTML = "Please select at least one service";
      return;
    }

    // Validate chart name and replica number
    if (!validateName(chartNameForm, "cowrie-err-div", "cowrie-error-msg")) {
      return;
    }
    if (!validateReplicas(replicaForm, "cowrie-err-div", "cowrie-error-msg")) {
      return;
    }

    data.name = chartNameForm;
    data.replicaCount = replicaForm;
    if (document.getElementById("cowrie-nodeport-check").checked) {
      // When nodeport is selected
      node = 1;
      data.service.type = "Nodeport";
      data.service.lbIp = null;
    } else if (document.getElementById("cowrie-lb-check").checked) {
      // When LoadBalancer is selected
      var ipForm = document.getElementById("cowrie-ip-field").value;
      // Validate IP address
      if (!validateIp(ipForm, "cowrie-err-div", "cowrie-error-msg")) {
        return;
      }
      node = 0;
      data.service.type = "LoadBalancer";
      data.service.lbIp = ipForm;
      ip = data.service.lbIp;
    } else {
      // In case no service is selected
      document.getElementById("cowrie-err-div").classList.remove("d-none");
      err.innerHTML = "You must choose service type (Nodeport/LoadBalancer)";
      return;
    }

    chartInfo();
    first = 0;
    document.getElementById("create-chart").classList.remove("d-none");
  }

  if (portCount == 0) {
    document.getElementById("cowrie-err-div").classList.remove("d-none");
    err.innerHTML = "Please select at least one service";
    return;
  }

  data.honeypots.names.push("cowrie");
  volumes = document.getElementById("cowrie-log-dir").value;
  if (volumes !== "") {
    data.honeypots.cowrie.volumes[0] = volumes;
  }

  cowrieSettings.classList.add("d-none");
  change_honeypot_menu_text("Honeypots");
  document.getElementById("cowrie-drop-menu").classList.add("disabled");
  generateInfo("cowrie");
  console.log(data);
}

// Generates the chart information when the first honeypot is selected
function chartInfo() {
  var name = document.getElementById("chart-name");
  var service = document.getElementById("chart-service");
  var replicas = document.getElementById("chart-replicas");
  name.innerHTML = "Name: " + data.name;
  if (node == 1) {
    service.innerHTML = "Service: " + data.service.type;
  } else {
    service.innerHTML =
      "Service: " + data.service.type + " IP: " + data.service.lbIp;
  }
  replicas.innerHTML = "Replicas: " + data.replicaCount;
  document.getElementById("info-chart").classList.remove("d-none");
}

// Generates information for each honeypot that is being created
function generateInfo(hp) {
  if (hp == "dionaea") {
    var services = document.getElementById("dio-i-services");
    var path = document.getElementById("dio-i-hostpath");
    var obj1 = data.honeypots.dionaea.services;

    var text1 = "Services:" + "\n";
    for (const x in obj1) {
      text1 += Object.keys(obj1[x]) + " Port: " + Object.values(obj1[x]) + "\n";
    }
    services.innerHTML = text1;
    path.innerHTML = "Path: " + data.honeypots.dionaea.volumes[0];
    document.getElementById("dio-info").classList.remove("d-none");
  } else if (hp == "conpot") {
    var services = document.getElementById("conpot-i-services");
    var path = document.getElementById("conpot-i-hostpath");
    var obj2 = data.honeypots.conpot.services;

    var text2 = "Services:" + "\n";
    for (const y in obj2) {
      text2 += Object.keys(obj2[y]) + " Port: " + Object.values(obj2[y]) + "\n";
    }
    services.innerHTML = text2;
    path.innerHTML = "Path: " + data.honeypots.conpot.volumes[0];
    document.getElementById("conpot-info").classList.remove("d-none");
  } else if (hp == "cowrie") {
    var services = document.getElementById("cowrie-i-services");
    var path = document.getElementById("cowrie-i-hostpath");
    var obj3 = data.honeypots.cowrie.services;

    var text3 = "Services:" + "\n";
    for (const z in obj3) {
      text3 += Object.keys(obj3[z]) + " Port: " + Object.values(obj3[z]) + "\n";
    }
    services.innerHTML = text3;
    path.innerHTML = "Path: " + data.honeypots.cowrie.volumes[0];
    document.getElementById("cowrie-info").classList.remove("d-none");
  }
}

//url="https://webhook.site/930450c6-96b8-429d-85cd-89f068bc3f4a"
var url = "http://localhost:8081/custom_build_endpoint";
//var url = "http://139.91.71.18:8081/custom_build_endpoint"


function callback(response) {
  //console.log(typeof response)
  a = document.createElement('a');
  a.href = window.URL.createObjectURL(response);
  // Give filename you wish to download
  a.download = data.name + ".zip";
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  //window.open(url+"/fdd.zip",'_blank'    );
}

function send_chart() {
  console.log(data);
  sendXmlPostRequest(url, data, callback);
  /*$.post(url,   // url
       { myData: 'This is my data.' }, // data to be submit
       function(data, status, jqXHR) {// success callback
                $('p').append('status: ' + status + ', data: ' + data);
        })*/
}
