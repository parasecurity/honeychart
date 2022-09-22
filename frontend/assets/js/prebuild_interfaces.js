var profile;
var selected_interface = null;
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

// Reset data
function resetData() {
  selected_interface = null;
  data = {
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
}

// Sets value on dropdown menu
function change_interfaces_text(text) {
  document.getElementById("interfaces-button").textContent = text;
}

// Enable Windows interface
function Windows() {
  resetData();
  var interfaceName = "Windows";
  fetchProfile("../assets/json/windowsProfile.json");
  document.getElementById("extras").classList.remove("d-none");
  change_interfaces_text(interfaceName);
  selected_interface = "windows";
}

// Enable Linux interface
function Linux() {
  // var interfaceName = "Linux";
  // change_interfaces_text(interfaceName);
  // selected_interface = "Linux";
  console.log("Linux selected");
}

// Fetch profile from json file
async function fetchProfile(path) {
  let response = await fetch(path);
  let data = await response.json();
  profile = data;
}

// Confirm options
function confirmation() {
  var err = document.getElementById("error-msg");
  var node = document.getElementById("nodeport").checked;
  var lb = document.getElementById("loadbalancer").checked;
  var replicas = document.getElementById("replicas").value;

  // Set sevice after validation
  if (node) {
    data.service.type = "Nodeport";
    data.service.lbIp = null;
  } else if (lb) {
    var ip = document.getElementById("loadbalancer-ip").value;
    if (!validateIp(ip, "err-div", "error-msg")) {
      return;
    }
    data.service.type = "LoadBalancer";
    data.service.lbIp = ip;
  } else {
    document.getElementById("err-div").classList.remove("d-none");
    err.innerHTML = "You must choose service type (Nodeport/LoadBalancer)";
    return;
  }

  // Set replicas after validation
  if (!validateReplicas(replicas, "err-div", "error-msg")) {
    return;
  } else {
    data.replicaCount = replicas;
  }

  document.getElementById("err-div").classList.add("d-none");
  document.getElementById("extras").classList.add("d-none");

  if (selected_interface != null) {
    data.name = profile.name;
    data.honeypots = profile.honeypots;
    generate_info(profile, profile.infoServiceText);
    console.log(data);
  }
}

// Generate profile info
function generate_info(profile, info_text) {
  document.getElementById("info-boxes").classList.remove("d-none");
  var name = document.getElementById("inter-i-name");
  var service = document.getElementById("inter-i-service");
  var services = document.getElementById("inter-i-services");
  var replicas = document.getElementById("inter-i-replicas");
  var path = document.getElementById("inter-i-hostpath");
  name.innerHTML = "Name: " + profile.name;
  if (data.service.type == "Nodeport") {
    service.innerHTML = "Service: " + data.service.type;
  } else if (data.service.lbIp != null) {
    service.innerHTML =
      "Service: " + data.service.type + " IP: " + data.service.lbIp;
  }
  replicas.innerHTML = "Replicas: " + data.replicaCount;
  path.innerHTML = "Path: " + document.getElementById("hostpath").value;
  services.innerHTML = info_text;
}

url="http://139.91.71.18:8081/prebuild_interface_endpoint"


function callback(response){
    //console.log(typeof response)
    a = document.createElement('a');
    a.href = window.URL.createObjectURL(response);
    // Give filename you wish to download
    a.download = data.name+".zip";
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    //window.open(url+"/fdd.zip",'_blank'    );
}

// Send chart to server
function send_chart() {
  console.log(data);
  sendXmlPostRequest(url, data, callback);
}
