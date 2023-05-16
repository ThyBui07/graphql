console.log('router.js loaded');
const urlRoutes = {
    '/graphql/': {
        template: "<home-page></home-page>"
    },
    '/login': {
        template: "<log-in></log-in>"
    },
};

// window.addEventListener('popstate', () => {
//     console.log('popstate event')
//     const 
// });
const urlRoute = (path) => {
    console.log(path)
    urlLocationHolder()
};

const urlLocationHolder = async () => {
    var location = window.location.pathname;
    console.log(location)

    var jwt = localStorage.getItem('jwt');

    if (jwt == null && location == '/graphql/') {
        location = '/login';
    };

    const route = urlRoutes[location];
    const htmml = route.template;
    document.getElementById('main').innerHTML = htmml;
};

window.route = urlRoute;
urlLocationHolder();