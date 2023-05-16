const urlRoutes = {
  "/graphql/": {
    template: "<home-page></home-page>",
  },
  "/login": {
    template: "<log-in></log-in>",
  },
};

const urlRoute = (path) => {
  urlLocationHolder();
};

const urlLocationHolder = async () => {
  let location = window.location.pathname;

  const jwt = localStorage.getItem("jwt");

  if (jwt == null && location == "/graphql/") {
    location = "/login";
  }

  const route = urlRoutes[location];
  const html = route.template;
  document.getElementById("main").innerHTML = html;
};

window.route = urlRoute;
urlLocationHolder();
