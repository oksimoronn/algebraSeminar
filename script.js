const listOfNames = [
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

function getRandomName() {
  let randNumber = Math.random().toString().slice(-1);

  return listOfNames[randNumber];
}

function getRandomColor() {
  let hexColor = Math.random().toString(16).slice(-6);
  let randColor = "#" + hexColor;

  return randColor;
}

function init() {
  const CLIENT_ID = "wAHFjVc0vWlFPALd";

  function createMsg(nam, id, txt, col) {
    const colorOfMesege = col;

    let membersId = id;

    const mainWindow = document.querySelector(".msgWindow");
    mainWindow.style.display = "flex";

    const msgContainer = document.createElement("div");
    msgContainer.className = `msgTxt ${membersId}`;
    mainWindow.appendChild(msgContainer);

    const msgSender = document.createElement("h3");
    msgSender.innerText = nam;
    msgSender.style.color = colorOfMesege;
    msgContainer.appendChild(msgSender);

    const msgText = document.createElement("p");
    msgText.innerText = `: ${txt}`;
    msgText.style.color = colorOfMesege;
    msgContainer.appendChild(msgText);

    /*const brk = document.createElement("br");
    ep.appendChild(brk);

    let msgall = document.querySelectorAll(".msg");
    const t = msgall.length;*/
  }

  const drone = new ScaleDrone(CLIENT_ID, {
    data: {
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

  const messegeForm = document.querySelector(".msgForm");
  const inputForm = document.querySelector(".message-form__input");
  messegeForm.addEventListener("submit", () => {
    const msgTextValue = inputForm.value;

    const checkIput = msgTextValue.trim();

    if (checkIput == "") {
      inputForm.value = "";
      return;
    } else {
      inputForm.value = "";

      drone.publish({
        room: "observable-room",
        message: msgTextValue,
      });
    }

    //const element = document.querySelectorAll(.)
  });
}
init();
