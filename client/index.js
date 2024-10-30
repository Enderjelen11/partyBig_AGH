import { Peer } from "peerjs";

const userId = (Math.random() + 1).toString(36).substring(2)
const peer = new Peer(userId, {
		host: "localhost",
		port: 9000,
		path: "/partyBig_agh"
	});

window.addEventListener("click", ()=>{
    const conn = peer.connect("master");

    conn.on("open", () => {
        console.log("connected to server")
    });
})
