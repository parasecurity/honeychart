function sendXmlPostRequest(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url, true);

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.responseType = 'blob';

  //  console.log("lalla");
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(request.response);
    }
  };
  request.send(JSON.stringify(data));
}
