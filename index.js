import { Peer } from "peerjs";

function randomString(len){
    let res = "";
    for(let i=0; i<len; i++){
        let charCode = 48 + Math.floor(Math.random()*74);
        res += String.fromCharCode(charCode);
    }
    return res
}

const userId = randomString(10)
const peer = new Peer(userId);
