// script.js
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded event listener");
    const mainDiv = document.getElementById("main");
    // get session ID from cookie
    var sessionID = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith("session-name"));
    if (sessionID != undefined) {
      sessionID = sessionID.split("=", 2)[1];
    }
    // if there is no session ID, load the <log-in> custom element
    if (sessionID == undefined) {
    const chart = document.getElementById("chart");
    chart.style.display = "none";
      const logInElement = document.createElement("log-in");
      mainDiv.appendChild(logInElement);
    } else {
      const homePageElement = document.createElement("home-page");
      mainDiv.appendChild(homePageElement);
    }
  });