(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Timestamps show the visitor's local time, as if they just read the thread
  var now = new Date();
  var time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  document.querySelectorAll(".js-time").forEach(function (el) { el.textContent = time; });
  document.querySelectorAll(".js-year").forEach(function (el) { el.textContent = now.getFullYear(); });

  // Suggested replies in the message thread
  var thread = document.getElementById("thread");
  var replies = document.getElementById("replies");

  var answers = {
    work: {
      question: "What have you built?",
      answer: 'Six projects so far, from a Django habit tracker to an iOS rent splitter. <a href="#work">See projects</a>'
    },
    skills: {
      question: "What's your stack?",
      answer: 'Mostly Python and JavaScript: Django, React and Node, with PostgreSQL or MongoDB underneath. <a href="#skills">Full toolkit</a>'
    },
    contact: {
      question: "How do I reach you?",
      answer: 'Send me a message below and it lands in my inbox. LinkedIn works too. <a href="#contact">Write to me</a>'
    }
  };

  function scrollThread() {
    thread.scrollTop = thread.scrollHeight;
  }

  function addBubble(side, html) {
    var bubble = document.createElement("p");
    bubble.className = "bubble " + side + " tail new-group";
    bubble.innerHTML = html;
    thread.appendChild(bubble);
    scrollThread();
  }

  function setChipsDisabled(disabled) {
    replies.querySelectorAll(".chip").forEach(function (chip) { chip.disabled = disabled; });
  }

  replies.addEventListener("click", function (event) {
    var chip = event.target.closest(".chip");
    if (!chip || chip.disabled) return;

    var item = answers[chip.dataset.reply];
    chip.remove();
    setChipsDisabled(true);

    var receipt = document.getElementById("receipt");
    if (receipt) receipt.remove();
    addBubble("in", item.question);

    var typing = document.createElement("div");
    typing.className = "typing";
    typing.setAttribute("aria-label", "Ajay is typing");
    typing.innerHTML = "<i></i><i></i><i></i>";

    setTimeout(function () {
      thread.appendChild(typing);
      scrollThread();
    }, reduceMotion ? 0 : 350);

    setTimeout(function () {
      typing.remove();
      addBubble("out", item.answer);

      var delivered = document.createElement("p");
      delivered.className = "receipt";
      delivered.id = "receipt";
      delivered.innerHTML = "<b>Delivered</b>";
      thread.appendChild(delivered);
      scrollThread();

      setChipsDisabled(false);
      if (!replies.querySelector(".chip")) replies.hidden = true;
    }, reduceMotion ? 150 : 1300);
  });

  // Contact form: submit to Formspree without leaving the page.
  // Without JavaScript the form still posts normally.
  var form = document.getElementById("contact-form");
  var status = document.getElementById("cf-status");
  var submit = document.getElementById("cf-submit");

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = "status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submit.disabled = true;
    setStatus("Sending…");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          setStatus("Message sent. Thanks for reaching out.", "ok");
          return;
        }
        return response.json().then(function (data) {
          var detail = data && data.errors && data.errors.length
            ? data.errors.map(function (e) { return e.message; }).join(", ")
            : "Something went wrong";
          setStatus(detail + ". Please try again or reach me on LinkedIn.", "error");
        });
      })
      .catch(function () {
        setStatus("Couldn't send. Check your connection and try again, or reach me on LinkedIn.", "error");
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
})();
