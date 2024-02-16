// Regular expressions for validity checks
var nameCheck = new RegExp("^([a-zA-Z0-9-]{3,20}$)");
var portNumbers = new RegExp("^([0-9]{1,5}$)");
var ipCheck = new RegExp(
  "^(([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)\\.){3}([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)$"
);
var replicaCheck = new RegExp("^([1-9]|[1-9][0-9]|100)$");

// Check for valid chart name
function validateName(text, div, mes) {
  var err = document.getElementById(mes);
  if (!nameCheck.test(text)) {
    document.getElementById(div).classList.remove("d-none");
    err.innerHTML =
      "Chart name must contain only 3 to 20 letters, numbers or '-' ";
    return false;
  } else {
    return true;
  }
}

// Check for valid replica number
function validateReplicas(num, div, mes) {
  var err = document.getElementById(mes);
  if (!replicaCheck.test(num)) {
    document.getElementById(div).classList.remove("d-none");
    err.innerHTML = "The number of replicas can be from 1 to 100";
    return false;
  } else {
    return true;
  }
}

// Check for valid IP address ranges
function validateManyIpRanges(num, div, mes){
  const num_ranges = num.split(',')
  for (let j=0; j < num_ranges.length; j++){
    if(!validateIpRange(num_ranges[j].trim(), div, mes)){
      return false;
    }
  }
  return true
}

// Check for valid IP address range
function validateIpRange(num, div, mes) {
  const num_range = num.split('-');
  for (let i=0; i < num_range.length; i++){
    if(!validateIp(num_range[i].trim(), div, mes)){
      return false;
    }
  }
  return true;
}

// Check for valid IP address
function validateIp(num, div, mes) {
  var err = document.getElementById(mes);
  if (!ipCheck.test(num)) {
    document.getElementById(div).classList.remove("d-none");
    err.innerHTML = "False IP Address";
    return false;
  } else {
    return true;
  }
}

// Check for valid port number
function validatePortNumber(num, div, mes) {
  var err = document.getElementById(mes);
  if (!portNumbers.test(num)) {
    document.getElementById(div).classList.remove("d-none");
    err.innerHTML = "Invalid port number";
    return false;
  } else {
    return true;
  }
}
