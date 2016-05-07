import xss from "xss-filters";

let ui = {
  renderPosts(posts) {
    let elements = posts.map( (post) => {
      // ES2015 Object destructuring
      let { title, last_reply} = post;
      return articleTemplate(title, last_reply);
    });

    let target = document.querySelector(".messages");
    target.innerHTML = elements.join("");
  },
  renderUsers(activeUsers) {
    let elements = activeUsers.map( (user) => {
      // ES2015 Object destructuring
      let { name, avatar} = user;
      return userTemplate(name, avatar);
    });

    let target = document.querySelector(".sidebar-content");
    target.innerHTML = elements.join("");
  }
}

function articleTemplate(title, last_reply) {
  // Protect datas with XSS Filters lib
  let safeTitle = xss.inHTMLData(title);
  let safeReply = xss.inHTMLData(last_reply);


  // String interpolation
  let template = `
    <article class="post">
      <h2 class="post-title">
        ${safeTitle}
      </h2>
      <p class="post-meta">
        ${safeReply}
      </p>
    </article>`;

  return template;
}

function userTemplate(name, avatar) {
  // Protect datas with XSS Filters lib
  let safeName = xss.inHTMLData(name);
  let safeAvatar = xss.inHTMLData(avatar);

  let template = `
    <div class="active-avatar">
      <img width="100px" src="assets/images/${safeAvatar}" alt="Avatar">
      <h5 class="post-author">${safeName}</h5>
    </div>`;

  return template;
}
  

export default ui;