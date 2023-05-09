class logIn extends HTMLElement {
  constructor() {
    super();
  }

  async logIn(event) {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers.append('Content-Type', 'application/json');
    try {
        const response = await fetch('https://01.gritlab.ax/api/auth/signin', {
            method: 'POST',
            headers: headers,
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('jwt', data);
            location.reload();
        } else {
            throw new Error('HTTP status code: ' + response.status);
        }
    }
    catch (error) {
        console.log(error);
    }
  }
    connectedCallback() {
        this.render();
        this.addEventListener('submit', this.logIn);
    };
    disconnectedCallback() {};

    render() {
        this.innerHTML = `
        <form class="form-signin">
      <img class="mb-4" src="./favicon_io/favicon-32x32.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
    </form>
        `
    }

}

customElements.define('log-in', logIn);