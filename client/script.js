// If a fetch error occurs, log it to the console and show it in the UI.
var handleFetchResult = function (result) {
  if (!result.ok) {
    return result.json().then(function (json) {
      if (json.error && json.error.message) {
        throw new Error(result.url + ' ' + result.status + ' ' + json.error.message);
      }
    }).catch(function (err) {
      showErrorMessage(err);
      throw err;
    });
  }
  return result.json();
};

// Create a Checkout Session with the selected plan ID
var createCheckoutSession = function (priceId) {
  return fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      priceId: priceId
    })
  }).then(handleFetchResult);
};

var updateSubscription = function (priceId) {
  return fetch("/update-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subId: document.getElementById("subId").value,
      id: 'sub_IibIuSQFOWxOnb',
      priceId: priceId
    })
  }).then(handleFetchResult);
};

var deleteSubscription = function (subId) {
  return fetch("/delete-subscription", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subId: subId,
    })
  }).then(handleFetchResult);
};

// Handle any errors returned from Checkout
var handleResult = function (result) {
  if (result.error) {
    showErrorMessage(result.error.message);
  }
};

var showErrorMessage = function (message) {
  var errorEl = document.getElementById("error-message")
  errorEl.textContent = message;
  errorEl.style.display = "block";
};

/* Get your Stripe publishable key to initialize Stripe.js */
fetch("/setup")
  .then(handleFetchResult)
  .then(function (json) {
    var publishableKey = json.publishableKey;
    var basicPriceId = json.basicPrice;
    var mediumPriceId = json.mediumPrice;
    var proPriceId = json.proPrice;

    var stripe = Stripe(publishableKey);
    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("basic-plan-btn")
      .addEventListener("click", function (evt) {
        createCheckoutSession(basicPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          location.href = "/guest-view.html";
        });
      });

    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("medium-plan-btn")
      .addEventListener("click", function (evt) {
        createCheckoutSession(mediumPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          location.href = "/login-register.html";
        });
      });

    document
      .getElementById("pro-plan-btn")
      .addEventListener("click", function (evt) {
        createCheckoutSession(proPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    document
      .getElementById("edit-sub-daily")
      .addEventListener("click", function (evt) {
        updateSubscription(basicPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    document
      .getElementById("edit-sub-weekly")
      .addEventListener("click", function (evt) {
        updateSubscription(mediumPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    document
      .getElementById("edit-sub-monthly")
      .addEventListener("click", function (evt) {
        updateSubscription(proPriceId).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    document
      .getElementById("cancel-sub")
      .addEventListener("click", function (evt) {
        deleteSubscription(document.getElementById("cancelsub").value).then(function (data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

  });
