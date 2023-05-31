// script.js
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded event listener");
    const mainDiv = document.getElementById("main");
    const chart = document.getElementById("pie-chart");
    // get session ID from cookie
    const jwt = localStorage.getItem("jwt");
    
    // if there is no session ID, load the <log-in> custom element
    if (jwt == undefined) {
    chart.style.display = "none";
      const logInElement = document.createElement("log-in");
      mainDiv.appendChild(logInElement);
    } else {
      const homePageElement = document.createElement("home-page");
      mainDiv.appendChild(homePageElement);
      if (localStorage.getItem("skills") != undefined) {
        chart.style.display = "none";
        const technicalSkills = getTechnicalSkills(JSON.parse(localStorage.getItem("skills")))
      const data = [
        {
          values: [],
          labels: [],
          type: 'pie',
        },
      ];
      technicalSkills.forEach((item) => {
        data[0].values.push(item.amount);
        data[0].labels.push(item.skill);
      });
      
      console.log(data);
      
      var layout = {
        title: 'Technical Skills',
        height: 400,
        width: 500
      };
      let img_jpg = document.getElementById('jpg-export');
      console.log(img_jpg);
      Plotly.newPlot('pie-chart', data, layout, { staticPlot: true }).then(
        function(gd)
         {
          Plotly.toImage(gd,{height:400,width:500})
             .then(
                 function(url)
             {
                 img_jpg.src = url;
             }
             )
        });
      }
    }
  });


function getTechnicalSkills(data) {
    const skills = [];
    data.forEach((skill) => {
      if (skill.type.startsWith("skill_")) {
        const existingSkill = skills.find(
          (s) => s.skill === skill.type.slice(6)
        );
        if (existingSkill) {
          existingSkill.amount += skill.amount;
        } else {
          skills.push({
            skill: skill.type.slice(6),
            amount: skill.amount,
          });
        }
      }
    });
    // Arrays to store the separated skills
    const technicalSkills = [];
    // Separate the skills into respective arrays
    skills.forEach(skill => {
      if (
        skill.skill === "prog" ||
        skill.skill === "tcp" ||
        skill.skill === "algo" ||
        skill.skill === "game" ||
        skill.skill === "back-end" ||
        skill.skill === "front-end" ||
        skill.skill === "sys-admin"
      ) {
        technicalSkills.push(skill);
      }
    });
    console.log("Technical Skills:", technicalSkills);
    return technicalSkills;

}