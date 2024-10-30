import Peer from "peerjs";

const peer = new Peer("master", {
		host: "localhost",
		port: 9000,
		path: "/partyBig_agh",
	});;

let count = 0;

peer.on("connection", (conn) => {
    count++;
    document.getElementById("monitor").innerText+=`user nr.${count} connected\n`;
    conn.on("open", async () => {
    });
});
