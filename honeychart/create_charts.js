/* @Authors: George Kokolakis (gkokol@ics.forth.gr), Irodotos Karatsoris (ikaratsoris@gmail.com) 


*/

const yaml = require("js-yaml");
const fs = require("fs");
const { exec } = require("child_process");
const { count } = require("console");
const { mainModule } = require("process");
const { json } = require("express");

let CHART_NAME;
let generic_values;
let generic_deployment;
let generic_service;
function __init__() {
  valid = 0;
  counter = 0;
  volumes_specified = false;
  init_deployments();
  init_services();
  init_values();
  generic_values = {
    honeypots: {},
    serviceAccount: {
      create: true,
      annotations: {},
      name: "",
    },
    podAnnotations: {},
    podSecurityContext: {},
    securityContext: {},
    service: {
      type: "",
      extTrafficPolicy: "Local",
    },
    volumes: {},
    replicaCount: 1,
    ingress: {
      enabled: false,
      className: "",
      annotations: {},
      hosts: {
        "- host": "chart-example.local",
        "  paths": {
          "  - path": "/",
          "    pathType": "ImplementationSpecific",
        },
      },
      tls: [],
    },
    resources: {},
    autoscaling: {
      enabled: false,
      minReplicas: 1,
      maxReplicas: 100,
      targetCPUUtilizationPercentage: 80,
    },
    nodeSelector: {},
    tolerations: [],
    affinity: {},
    //??
    imagePullSecrets: [],
    nameOverride: "",
    fullnameOverride: "",
  };

  generic_service = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: '{{ include "' + CHART_NAME + '.fullname" .  }}',
      labels: '{{- include "' + CHART_NAME + '.labels" . | nindent 4 }}',
    },
    spec: {
      type: "{{ .Values.service.type }}",
      externalTrafficPolicy: "{{ .Values.service.extTrafficPolicy }}",
      ports: {},
      selector:
        '{{- include "' + CHART_NAME + '.selectorLabels" . | nindent 4 }}',
    },
  };

  generic_deployment = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: '{{ include "' + CHART_NAME + '.fullname" . }}',
      labels: '{{- include "' + CHART_NAME + '.labels" . | nindent 4 }}',
    },
    spec: {
      "{{- if not .Values.autoscaling.enabled }}": "aa",
      replicas: "{{ .Values.replicaCount }}",
      "{{- end }}": "aa",
      selector: {
        matchLabels:
          '{{- include "' + CHART_NAME + '.selectorLabels" . | nindent 6 }}',
      },
      template: {
        metadata: {
          "{{- with .Values.podAnnotations }}": "aa",
          annotations: "{{- toYaml . | nindent 8 }}",
          "{{- end }}": "aa",
          labels:
            '{{- include "' + CHART_NAME + '.selectorLabels" . | nindent 8 }}',
        },
        spec: {
          "{{- with .Values.imagePullSecrets }}": "aa",
          imagePullSecrets: "{{- toYaml . | nindent 8 }}",
          "{{- end }}": "aa",
          serviceAccountName:
            '{{ include "' + CHART_NAME + '.serviceAccountName" . }}',
          securityContext:
            "{{- toYaml .Values.podSecurityContext | nindent 8 }}",
          containers: {},
          "{{- with .Values.nodeSelector }}": "aa",
          nodeSelector: "{{- toYaml . | nindent 8 }}",
          "{{- end  }}": "aa",
          "{{- with .Values.affinity }}": "aa",
          affinity: "{{- toYaml . | nindent 8 }}",
          "{{- end   }}": "aa",
          "{{- with .Values.tolerations }}": "aa",
          tolerations: "{{- toYaml . | nindent 8 }}",
          "{{- end    }}": "aa",
        },
      },
    },
  };
}

let dionaea_values;
let cowrie_values;
let conpot_values;
function init_values() {
  //values yaml
  dionaea_values = {
    dionaea: {
      image: {
        repository: "ghcr.io/kokol16/dionaea", // "dionaea_dionaea" latest  "ghcr.io/kokol16/dionaea" v1
        tag: "v1",
        pullPolicy: "IfNotPresent",
      },
    },
  };
  cowrie_values = {
    cowrie: {
      image: {
        repository: "cowrie_cowrie",
        tag: "latest",
        pullPolicy: "IfNotPresent",
      },
    },
  };

  conpot_values = {
    conpot: {
      image: {
        repository: "ghcr.io/kokol16/conpot", //"ghcr.io/kokol16/conpot" "honeynet/conpot"
        tag: "v2",
        pullPolicy: "IfNotPresent",
      },
    },
  };
}
let dionaea_service;
let cowrie_service;
let conpot_service;
function init_services() {
  dionaea_service = {
    ports: {},
  };
  cowrie_service = {
    ports: {},
  };

  conpot_service = {
    ports: {},
  };
}

LF = "\n";
str = "\n";

function generate_end() {
  return "{ { - end } }" + counter++;
}
let dionaea_deployment;
let cowrie_deployment;
let conpot_deployment;
function init_deployments() {
  dionaea_deployment = {
    containers: {
      "- name": " dionaea ",
      "  securityContext": "{{- toYaml .Values.securityContext | nindent 12 }}",
      "  image":
        '"{{ .Values.honeypots.dionaea.image.repository }}:{{ .Values.honeypots.dionaea.image.tag | default .Chart.AppVersion }}"',
      "  imagePullPolicy": "{{ .Values.honeypots.dionaea.image.pullPolicy }}",
      "  ports": {},

      "  resources": "{{- toYaml .Values.resources | nindent 12 }}",
    },
  };
  cowrie_deployment = {
    containers: {
      "- name3": " cowrie",
      "  securityContext3":
        "{{- toYaml .Values.securityContext | nindent 12 }}",
      "  image3":
        '"{{ .Values.honeypots.cowrie.image.repository }}:{{ .Values.honeypots.cowrie.image.tag | default .Chart.AppVersion }}"',
      "  imagePullPolicy3": "{{ .Values.honeypots.cowrie.image.pullPolicy }}",
      "  ports3": {},
      "  resources3": "{{- toYaml .Values.resources | nindent 12 }}",
    },
  };

  conpot_deployment = {
    containers: {
      "- name2": " conpot ",
      "  securityContext2":
        "{{- toYaml .Values.securityContext | nindent 12 }}",
      "  image2":
        '"{{ .Values.honeypots.conpot.image.repository }}:{{ .Values.honeypots.conpot.image.tag | default .Chart.AppVersion }}"',
      "  imagePullPolicy2": "{{ .Values.honeypots.conpot.image.pullPolicy }}",
      "  ports2": {},
      "  resources2": "{{- toYaml .Values.resources | nindent 12 }}",
    },
  };
}

function is_service_type_load_balancer(input) {
  return input.service.type.includes("LoadBalancer");
}

function create_dionaea_deployment_file(input) {
  var array = input.honeypots.dionaea.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();
    dionaea_deployment.containers["  ports"]["  - protocol" + counter] =
      "{{ .Values.honeypots.dionaea.ports.protocol" + key + "}}";
    dionaea_deployment.containers["  ports"]["    containerPort" + counter] =
      "{{ .Values.honeypots.dionaea.ports.containerPort" + key + "}}";
    dionaea_deployment.containers["  ports"]["    name" + counter] =
      " {{ .Values.honeypots.dionaea.ports.name" + key + " }}";
    ++counter;
  }
}
function create_cowrie_deployment_file(input) {
  var array = input.honeypots.cowrie.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();
    cowrie_deployment.containers["  ports3"]["  - protocol" + counter] =
      "{{ .Values.honeypots.cowrie.ports.protocol" + key + "}}";
    cowrie_deployment.containers["  ports3"]["    containerPort" + counter] =
      "{{ .Values.honeypots.cowrie.ports.containerPort" + key + "}}";
    cowrie_deployment.containers["  ports3"]["    name" + counter] =
      " {{ .Values.honeypots.cowrie.ports.name" + key + " }}";
    ++counter;
  }
}

function create_conpot_deployment_file(input) {
  var array = input.honeypots.conpot.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();

    conpot_deployment.containers["  ports2"]["  - protocol" + counter] =
      "{{ .Values.honeypots.conpot.ports.protocol" + key + "}}";
    conpot_deployment.containers["  ports2"]["    containerPort" + counter] =
      "{{ .Values.honeypots.conpot.ports.containerPort" + key + "}}";
    conpot_deployment.containers["  ports2"]["    name" + counter] =
      " {{ .Values.honeypots.conpot.ports.name" + key + " }}";
    ++counter;
  }
}

function create_dionaea_service_file(input) {
  var array = input.honeypots.dionaea.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();
    dionaea_service.ports["- port" + counter] =
      "{{ .Values.honeypots.dionaea.ports.port" + key + " }}";
    dionaea_service.ports["  targetPort" + counter] =
      "{{ .Values.honeypots.dionaea.ports.containerPort" + key + " }}";
    dionaea_service.ports["  protocol" + counter] =
      "{{ .Values.honeypots.dionaea.ports.protocol" + key + "}}";
    dionaea_service.ports["  name" + counter] =
      "{{ .Values.honeypots.dionaea.ports.name" + key + " }}";
    ++counter;
  }
}

function create_cowrie_service_file(input) {
  var array = input.honeypots.cowrie.services;
  console.log(array.length);
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();
    cowrie_service.ports["- port" + counter] =
      "{{ .Values.honeypots.cowrie.ports.port" + key + " }}";
    cowrie_service.ports["  targetPort" + counter] =
      "{{ .Values.honeypots.cowrie.ports.containerPort" + key + " }}";
    cowrie_service.ports["  protocol" + counter] =
      "{{ .Values.honeypots.cowrie.ports.protocol" + key + "}}";
    cowrie_service.ports["  name" + counter] =
      "{{ .Values.honeypots.cowrie.ports.name" + key + " }}";
    ++counter;
  }
}

function create_conpot_service_file(input) {
  var array = input.honeypots.conpot.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();
    conpot_service.ports["- port" + counter] =
      "{{ .Values.honeypots.conpot.ports.port" + key + " }}";
    conpot_service.ports["  targetPort" + counter] =
      "{{ .Values.honeypots.conpot.ports.containerPort" + key + " }}";
    conpot_service.ports["  protocol" + counter] =
      "{{ .Values.honeypots.conpot.ports.protocol" + key + "}}";
    conpot_service.ports["  name" + counter] =
      "{{ .Values.honeypots.conpot.ports.name" + key + " }}";
    ++counter;
  }
}

function return_value_from_json_object_inside_array(array, key) {
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    if (obj.hasOwnProperty(key)) return obj[key];
  }
}
function add_ports_dionaea(input) {
  ports_dionea = {};
  var array = input.honeypots.dionaea.services;

  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();

    ports_dionea["name" + key] = key;
    ports_dionea["protocol" + key] = input.honeypots.dionaea.protocols[i];
    ports_dionea["port" + key] = value;
    ports_dionea["containerPort" + key] =
      input.honeypots.dionaea.containerports[i];
  }

  return ports_dionea;
}
function add_ports_cowrie(input) {
  ports_cowrie = {};
  var array = input.honeypots.cowrie.services;

  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();

    ports_cowrie["name" + key] = key;
    ports_cowrie["protocol" + key] = input.honeypots.cowrie.protocols[i];
    ports_cowrie["port" + key] = value;
    ports_cowrie["containerPort" + key] =
      input.honeypots.cowrie.containerports[i];
  }

  return ports_cowrie;
}

function add_ports_conpot(input) {
  ports_conpot = {};
  var array = input.honeypots.conpot.services;
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    key = Object.keys(obj).toString();
    value = Object.values(obj).toString();

    ports_conpot["name" + key] = key;
    ports_conpot["protocol" + key] = input.honeypots.conpot.protocols[i];
    ports_conpot["port" + key] = value;
    ports_conpot["containerPort" + key] =
      input.honeypots.conpot.containerports[i];
  }

  return ports_conpot;
}

function write_json_to_yaml_file(filename, json_object) {
  let yamlStr = yaml.dump(json_object);
  yamlStr = create_same_names(yamlStr);
  yamlStr = eliminate_useless_characters(yamlStr);

  fs.writeFileSync(filename, yamlStr, "utf8");
}
/* because json object doesnt allow  same keys , i put a number front of each duplicate key 
    and i delete this number before the file is ready
    example: we have many ports like
    before function:
    port: 22
    port1: 23
    after function:
    port: 22
    port: 23
*/
function create_same_names(yamlStr) {
  //gia ton irodoto na balei regular expressions
  if (counter < 3) counter = 3;
  for (j = 0; j <= counter; ++j) {
    for (i = 0; i <= counter; ++i) {
      yamlStr = yamlStr.split("port" + i).join("port");
      yamlStr = yamlStr.split("name" + i).join("name");
      yamlStr = yamlStr.split("targetPort" + i).join("targetPort");
      yamlStr = yamlStr.split("containerPort" + i).join("containerPort");
      yamlStr = yamlStr.split("protocol" + i).join("protocol");
      yamlStr = yamlStr.split("securityContext" + i).join("securityContext");
      yamlStr = yamlStr.split("image" + i).join("image");
      yamlStr = yamlStr.split("imagePullPolicy" + i).join("imagePullPolicy");
      yamlStr = yamlStr.split("ports" + i).join("ports");
      yamlStr = yamlStr.split("volumeMounts" + i).join("volumeMounts");
      yamlStr = yamlStr.split("resources" + i).join("resources");

      yamlStr = yamlStr.split("hostPath" + i).join("hostPath");
    }
  }

  return yamlStr;
}

function eliminate_useless_characters(yamlStr) {
  yamlStr = yamlStr.split("'").join("");
  yamlStr = yamlStr.split(": aa").join("");
  //be carefull with this
  yamlStr = yamlStr.split(">-\n").join("");

  return yamlStr;
}

volumes_specified = false;
function fill_volumes(input) {
  if (has_conpot(input) && has_specified_volumes_for_conpot(input)) {
    if (!volumes_specified) generic_deployment.spec.template.spec.volumes = {};
    volumes_specified = true;
    fill_volumes_conpot(input);
  }
  if (has_dionaea(input) && has_specified_volumes_for_dionaea(input)) {
    if (!volumes_specified) generic_deployment.spec.template.spec.volumes = {};

    volumes_specified = true;

    fill_volumes_dionaea(input);
  }
  if (has_cowrie(input) && has_specified_volumes_for_cowrie(input)) {
    if (!volumes_specified) generic_deployment.spec.template.spec.volumes = {};

    volumes_specified = true;
    fill_volumes_cowrie(input);
  }
}

function fill_volumes_dionaea(input) {
  dionaea_deployment.containers["  volumeMounts"] = {
    "  - mountPath": "{{ .Values.volumes.dionaeamountPath }}",
    "    name": "dioanea-data",
  };

  dionaea_deployment["volumes"] = {
    "- name": "dioanea-data",
    "  hostPath": {
      "  path": "{{ .Values.volumes.dionaeahostPath }}",
    },
  };
  generic_values.volumes["dionaeamountPath"] = "/json-logs";
  generic_values.volumes["dionaeahostPath"] =
    input.honeypots.dionaea.volumes[0];
  //console.log(generic_deployment.spec.template.spec.volumes)
  Object.assign(
    generic_deployment.spec.template.spec.volumes,
    dionaea_deployment["volumes"]
  );
}
function fill_volumes_cowrie(input) {
  cowrie_deployment.containers["  volumeMounts3"] = {
    "  - mountPath": "{{ .Values.volumes.cowriemountPath }}",
    "    name": "cowrie-data",
  };

  cowrie_deployment["volumes"] = {
    "- name3": "cowrie-data",
    "  hostPath3": {
      "  path": "{{ .Values.volumes.cowriehostPath }}",
    },
  };
  generic_values.volumes["cowriemountPath"] =
    "/cowrie/cowrie-git/var/log/cowrie";
  generic_values.volumes["cowriehostPath"] = input.honeypots.cowrie.volumes[0];
  Object.assign(
    generic_deployment.spec.template.spec.volumes,
    cowrie_deployment["volumes"]
  );
}

function fill_volumes_conpot(input) {
  conpot_deployment.containers["  volumeMounts2"] = {
    "  - mountPath": "{{ .Values.volumes.conpotmountPath }}",
    "    name": "conpot-data",
  };

  conpot_deployment["volumes"] = {
    "- name2": "conpot-data",
    "  hostPath2": {
      "  path": "{{ .Values.volumes.conpothostPath }}",
    },
  };
  generic_values.volumes["conpotmountPath"] = "/conpot-json-logs";
  generic_values.volumes["conpothostPath"] = input.honeypots.conpot.volumes[0];
  Object.assign(
    generic_deployment.spec.template.spec.volumes,
    conpot_deployment["volumes"]
  );
}
function create_dionaea_chart(honeypot) {
  //======== create values yaml file==================
  generic_values.honeypots["dionaea"] = {};
  generic_values.honeypots["dionaea"]["ports"] = {};
  generic_values.replicaCount = honeypot.replicaCount;
  //dionaea_values.dionaea.replicaCount = honeypot.honeypots.dionaea.replicaCount
  Object.assign(generic_values.honeypots["dionaea"], dionaea_values.dionaea);
  ports_obj = add_ports_dionaea(honeypot);
  Object.assign(generic_values.honeypots["dionaea"]["ports"], ports_obj);
  //Object.assign(generic_values["volumes"], honeypot.volumes)
  //==================================================

  //======== create service yaml file==================
  create_dionaea_service_file(honeypot);
  Object.assign(generic_service.spec.ports, dionaea_service.ports);

  //==================================================

  //======== create deployment yaml file==================

  create_dionaea_deployment_file(honeypot);

  Object.assign(
    generic_deployment.spec.template.spec.containers,
    dionaea_deployment.containers
  );
  //append(generic_deployment.spec.template.spec.containers, dionaea_deployment.containers)

  //Object.assign(generic_deployment.spec.template.spec.volumes, dionaea_deployment.volumes)

  //==================================================
}

function create_cowrie_chart(honeypot) {
  //======== create values yaml file==================
  generic_values.honeypots["cowrie"] = {};
  generic_values.honeypots["cowrie"]["ports"] = {};
  generic_values.replicaCount = honeypot.replicaCount;
  //cowrie_values.cowrie.replicaCount = honeypot.honeypots.cowrie.replicaCount
  Object.assign(generic_values.honeypots["cowrie"], cowrie_values.cowrie);
  ports_obj = add_ports_cowrie(honeypot);
  Object.assign(generic_values.honeypots["cowrie"]["ports"], ports_obj);
  //==================================================

  //======== create service yaml file==================
  create_cowrie_service_file(honeypot);
  Object.assign(generic_service.spec.ports, cowrie_service.ports);
  //==================================================

  //======== create deployment yaml file==================
  create_cowrie_deployment_file(honeypot);
  Object.assign(
    generic_deployment.spec.template.spec.containers,
    cowrie_deployment.containers
  );
  console.log(generic_deployment.spec.template.spec.containers);
  //Object.assign(generic_deployment.spec.template.spec.volumes, cowrie_deployment.volumes)
  //==================================================
}

function create_conpot_chart(honeypot) {
  //======== create values yaml file==================
  generic_values.honeypots["conpot"] = {};
  generic_values.honeypots["conpot"]["ports"] = {};
  generic_values.replicaCount = honeypot.replicaCount;
  //conpot_values.conpot.replicaCount = honeypot.honeypots.conpot.replicaCount
  Object.assign(generic_values.honeypots["conpot"], conpot_values.conpot);
  ports_obj = add_ports_conpot(honeypot);
  Object.assign(generic_values.honeypots["conpot"]["ports"], ports_obj);
  //==================================================

  //======== create service yaml file==================
  create_conpot_service_file(honeypot);
  Object.assign(generic_service.spec.ports, conpot_service.ports);
  //==================================================

  //======== create deployment yaml file==================
  create_conpot_deployment_file(honeypot);
  Object.assign(
    generic_deployment.spec.template.spec.containers,
    conpot_deployment.containers
  );
  //Object.assign(generic_deployment.spec.template.spec.volumes, conpot_deployment.volumes)
  //==================================================
}

function execute_shell_command(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
        resolve("error");
      } else {
        // the *entire* stdout and stderr (buffered)
        //console.log(`stderr: ${stderr}`);
        resolve("good");
      }
    });
  });
}
let counter;

function has_dionaea(input) {
  return input.honeypots.names.includes("dionaea");
}
function has_conpot(input) {
  return input.honeypots.names.includes("conpot");
}
function has_cowrie(input) {
  return input.honeypots.names.includes("cowrie");
}
function create_chart(honeypot) {
  fill_volumes(honeypot);

  if (has_dionaea(honeypot)) {
    create_dionaea_chart(honeypot);
    valid = 1;
  }

  if (has_conpot(honeypot)) {
    valid = 1;
    create_conpot_chart(honeypot);
  }
  if (has_cowrie(honeypot)) {
    valid = 1;
    create_cowrie_chart(honeypot);
  }
  if (!valid) {
    throw new Error("invalid honeypot name");
    return valid;
  }

  if (is_service_type_load_balancer(honeypot)) {
    generic_values.service.type = "LoadBalancer";
    generic_values.service["lbIP"] = honeypot.service.lbIp;
    generic_service.spec["loadBalancerIP"] = "{{ .Values.service.lbIP }}";
  } else {
    generic_values.service.type = "NodePort";
  }

  write_json_to_yaml_file("values.yaml", generic_values);
  write_json_to_yaml_file("service.yaml", generic_service);
  write_json_to_yaml_file("deployment.yaml", generic_deployment);

  return valid;
}
function has_specified_volumes_for_cowrie(input) {
  return input.honeypots.cowrie.volumes.length > 0;
}

function has_specified_volumes_for_conpot(input) {
  return input.honeypots.conpot.volumes.length > 0;
}
function has_specified_volumes_for_dionaea(input) {
  return input.honeypots.dionaea.volumes.length > 0;
}

/*
input =
{
    name: 'charty',
    service: { type: 'LoadBalancer', lbIp: '132.132.312.21' },
    honeypots:
    {
        names: ['conpot', 'cowrie', 'dionaea'],
        dionaea: { replicaCount: 4, volumes: ["lala"], services: [{ http: 20 }, { https: 300 }], containerports: [20, 30, 40], protocols: ["TCP", "UDP"] },
        conpot: { replicaCount: 2, volumes: ["logeruni"], services: [{ s7comm: 310 }, { snmp: 161 }], containerports: [108, 665], protocols: ["TCP", "TCP"] },
        cowrie: { replicaCount: 5, volumes: ["rogu"], services: [{ ssh: 22 }, { telnet: 23 }], containerports: [2200, 2300], protocols: ["UDP", "UDP"] }
    }
}*/

function isValidName(chart_name) {
  /* One uppercase character , one lowercase character , one symbol , 8-20 charactes */
  var re = new RegExp("^([a-zA-Z0-9-]{3,20}$)");
  if (re.test(chart_name)) {
    return true;
  } else {
    return false;
  }
}
async function make_chart(input, res) {
  console.log("%j", input);
  if (!isValidName(input.name)) {
    res.send("invalid chart name");
    return;
  }
  CHART_NAME = input.name;
  __init__();
  if (create_chart(input)) {
    result = await execute_shell_command(" helm create " + CHART_NAME);
    result = await execute_shell_command(" mv values.yaml " + CHART_NAME);
    result = await execute_shell_command(
      " mv deployment.yaml " + CHART_NAME + "/templates"
    );
    result = await execute_shell_command(
      " mv service.yaml " + CHART_NAME + "/templates"
    );
    result = await execute_shell_command(" chmod -R 770 " + CHART_NAME);
    dir = "charts_DB"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    result = await execute_shell_command("zip -r "+CHART_NAME+".zip " + CHART_NAME)
    result = await execute_shell_command("mv "+CHART_NAME+".zip "+" charts_DB")
    result = await execute_shell_command("rm -rf "+CHART_NAME)
    //res.download("charts_DB/"+CHART_NAME+".zip")
    res.download("charts_DB/"+CHART_NAME+".zip")
    return 1;
  }
  return 0;
}
module.exports.make_chart = make_chart;
