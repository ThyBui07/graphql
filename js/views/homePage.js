class homePage extends HTMLElement {
  constructor() {
    super();
    console.log("super run first");
    this.loadUserData();
  }

  async loadUserData() {
    const jwt = localStorage.getItem("jwt");
    const decodedJwt = this.decodeJwt(jwt);
    const response = await this.getQuery(decodedJwt.sub, jwt);
    console.log("this is res", response);

    this.render(response.data);
  }

  async getQuery(id, jwt) {
    const query = `
    query {
        user(where: {id: {_eq: ${id}}}) {
          login
          firstName
          lastName
          auditRatio
          totalUp
          totalDown
        }
        audits: transaction(order_by: {createdAt: asc}, where: {type: {_regex: "up|down"}}) {
          type
          amount
          path
          createdAt
        }
          xp: transaction(order_by: {createdAt: asc}, where: {
          type: {_eq: "xp"}
            eventId: {_eq: 20}
        }) {
                createdAt
            amount
                path
          }
          xpJS: transaction(order_by: {createdAt: asc}, where: {
          type: {_eq: "xp"}
            eventId: {_eq: 37}
        }) {
                createdAt
            amount
                path
          }
          xpGo: transaction(order_by: {createdAt: asc}, where: {
          type: {_eq: "xp"}
            eventId: {_eq: 2}
        }) {
                createdAt
            amount
                path
          }
        xpTotal : transaction_aggregate(
        where: {
          userId: {_eq: ${id}}
          type: {_eq: "xp"}
          eventId: {_eq: 20}
        }
      ) {aggregate {sum {amount}}}
        xpJsTotal : transaction_aggregate(
        where: {
          userId: {_eq: ${id}}
          type: {_eq: "xp"}
          eventId: {_eq: 37}
        }
      ) {aggregate {sum {amount}}}
        xpGoTotal : transaction_aggregate(
        where: {
          userId: {_eq: ${id}}
          type: {_eq: "xp"}
          eventId: {_eq: 2}
        }
      ) {aggregate {sum {amount}}}
      }`;
    const response = await fetch(
      "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();
    return data;
  }
  catch(error) {
    console.log(error);
    throw new Error("Failed to fetch data from GraphQL API");
  }

  decodeJwt(jwt) {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    const result = JSON.parse(decoded);
    return result;
  }

  totalXPAmount(xps) {
    let xp_total = 0;
    for (let i = 0; i < xps.length; i++) {
      xp_total += xps[i].amount;
    }
    return xp_total;
  }
  connectedCallback() {
    // console.log("connectedCallback run second");
    // this.render();
  }
  disconnectedCallback() {}

  render(data) {
    this.innerHTML = `
    <div class="container">
        <div class="py-5 text-center">
        <img class="mb-4" src="./favicon_io/android-chrome-512x512.png" alt="" width="72" height="72">
        <h2>Welcome, ${data.user[0].firstName} ${data.user[0].lastName}!</h2>
        </div>

        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-7 p-lg-5 mx-auto my-1">
                <h1 class="display-5 font-weight-normal">Basic Information</h1>
                <p class="lead font-weight-normal">Username: ${
                  data.user[0].login
                }</p>
                <p class="lead font-weight-normal">Audit Ratio: ${
                  data.user[0].auditRatio
                }</p>
                <p class="lead font-weight-normal">Total XP: ${Math.round(
                  data.xpTotal.aggregate.sum.amount / 1000
                )} kB</p>
            </div>
        </div>

        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
            <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div class="my-3 py-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                    <svg width="400" height="150">
                        <rect x="50" y="25" width="220" height="50" fill="#0074D9"/>
                        <text x="10" y="45" fill="#FFFFFF" font-size="14">Done</text>
                        <text x="285" y="45" fill="#FFFFFF" font-size="14">552 kB</text>
                        <rect x="50" y="75" width="220" height="10" fill="#353A35"/>
                        <rect x="50" y="85" width="300" height="50" fill="#FF4136"/>
                        <text x="-10" y="95" fill="#FFFFFF" font-size="14">Received</text>
                        <text x="355" y="95" fill="#FFFFFF" font-size="14">764 kB</text>
                        </svg>
                </div>
            </div>
            <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div class="my-3 p-3">
                <h2 class="display-5">Another headline</h2>
                <p class="lead">And an even wittier subheading.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
        </div>

        

  </div>
        `;
  }
}

customElements.define("home-page", homePage);
