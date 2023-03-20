function init() {
  const CLIENT_ID = "wAHFjVc0vWlFPALd";

  function getRandomName() {
    const liname = [
      "Zvonimir",
      "Ana",
      "Nataša",
      "Ivan",
      "Ivona",
      "Jana",
      "Martina",
      "Melita",
      "Luka",
      "Ivana",
      "Marica",
    ];
    let ranmb = Math.random().toString().slice(-1);

    return liname[ranmb];
  }

  function getRandomColor() {
    let nmcolor = Math.random().toString(16).slice(-6);
    let rndcolor = "#" + nmcolor;

    return rndcolor;
  }

  function createMsg(nam, id, txt, col) {
    const cl = col;

    let membersId = id;

    const ep = document.querySelector(".msgWindow");
    ep.style.display = "flex";

    const x = document.createElement("div");
    x.className = `msgTxt ${membersId}`;
    //x.innerText = nam;
    ep.appendChild(x);

    const ts = document.createElement("h3");
    ts.innerText = nam;
    ts.style.color = cl;
    x.appendChild(ts);

    const tx = document.createElement("p");
    tx.innerText = `: ${txt}`;
    tx.style.color = cl;
    x.appendChild(tx);

    const brk = document.createElement("br");
    ep.appendChild(brk);

    let msgall = document.querySelectorAll(".msg");
    const t = msgall.length;

    return t, msgall;
  }

  const drone = new ScaleDrone(CLIENT_ID, {
    data: {
      // Will be sent out as clientData via events
      name: getRandomName(),
      color: getRandomColor(),
    },
  });

  drone.on("open", () => {
    console.log("Successfully connected to Scaledrone");

    const room = drone.subscribe("observable-room");

    room.on("open", () => {
      console.log("Successfully joined room");
    });

    //

    room.on("data", (text, member) => {
      const cl = member.clientData.color;

      let membersId = member.id;

      const prname = member.clientData.name;

      const innerTxt = text;

      createMsg(prname, membersId, innerTxt, cl);
    });
  });

  drone.on("close", () => {
    window.location.replace("./homePage.html");
  });

  const close = document.querySelector(".closeFrm");
  close.addEventListener("submit", (e) => {
    e.preventDefault();
    drone.close();
  });

  const er = document.querySelector(".msgForm");
  const inp = document.querySelector(".message-form__input");
  er.addEventListener("submit", () => {
    const value = inp.value;
    if (value === "") {
      return;
    }

    inp.value = "";

    drone.publish({
      room: "observable-room",
      message: value,
    });
  });
}
init();
