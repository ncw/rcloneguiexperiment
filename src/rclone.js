// Class for accessing rclone
class Rclone {
  constructor() {
    this.url = window.location.href;
    // If using the react test server use the default rc URL
    if (window.location.host === "localhost:3000") {
      this.url = "http://127.0.0.1:5572/";
      console.log("React dev server detected - using the default rc URL:", this.url);
    }
    this.headers = {
      "Content-Type": "application/json"
    };
  }
  // Do an RPC to rclone - input should be an object
  //
  // This returns a promise which will return an object
  rpc(method, input) {
    var url = this.url + method;
    return fetch(url, {
      method: "POST",
      // mode: "same-origin",
      // credentials: "same-origin",
      headers: this.headers,
      body: JSON.stringify(input)
    }).then(response => {
      var ok = response.ok;
      return response.json().then(result => {
        if (!ok) {
          console.log("FAILED" + result);
          return Promise.reject(result);
        }
        return result;
      });
    }, error => {
      console.error('Rclone RPC error: ' + error);
      return Promise.reject({
        error: String(error),
      });
    });
  }
}    

export var rclone = new Rclone();
