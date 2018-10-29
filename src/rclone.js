const rclone_url = "http://127.0.0.1:5572/";

// Do an RPC to rclone - input should be an object
//
// This returns a promise which will return an object
export function rpc(method, input) {
    var url = rclone_url + method;
    return fetch(url, {
        method: "POST",
        // mode: "same-origin",
        // credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
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
