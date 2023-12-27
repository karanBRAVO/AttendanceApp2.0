export const InvitationTemplate = (
  orgName,
  senderName,
  senderEmail,
  joinLink
) => {
  return `
  <div>
  <div
    style="
      background-color: black;
      padding: 5px;
      margin: 1px;
      border-radius: 5px;
      border: 2px solid bisque;
      font-family: monospace;
      display: flex;
      align-items: center;
      flex-direction: column;
      max-width: 600px;
    "
  >
    <h1
      style="
        color: bisque;
        font-size: 1.5em;
        font-weight: 900;
        padding: 1px;
        margin: 1px;
      "
    >
      ${orgName}
    </h1>
    <h4 style="padding: 1px; margin: 1px; color: green">
      Invites you to Register.
    </h4>
    <hr style="width: 100%; height: 1px; background-color: white" />
    <p
      style="
        font-size: 1em;
        font-weight: 400;
        color: whitesmoke;
        max-width: 500px;
      "
    >
      This mail is sent to you because you have joined the ${orgName}. You are invited to register to the attendance app. Now
      attendance will be marked using the tech solution provided by Karan
      Yadav. You can register only upto 24 hours of this mail. Make sure you
      use the same email while filling the form and choose a strong password.
    </p>
    <div style="padding: 1px; margin: 1px; color: white">
      <h3 style="padding: 1px; margin: 1px; color: aqua">Sender's Details</h3>
      <p style="padding: 1px; margin: 1px; margin-left: 10px">
        Name: <span style="color: blue">${senderName}</span>
      </p>
      <p style="padding: 1px; margin: 1px; margin-left: 10px">
        Email: <span style="color: blue">${senderEmail}</span>
      </p>
    </div>
    <button
      style="
        padding: 6px 4px;
        margin: 5px;
        border-radius: 3px;
        border: 2px solid skyblue;
        background-color: skyblue;
        color: navy;
      "
    >
      <a
        href="${joinLink}"
        style="
          color: navy;
          font-weight: 700;
          font-size: 1em;
          font-family: sans-serif;
          text-transform: uppercase;
          text-decoration: none;
        "
        >Register Now</a
      >
    </button>
  </div>
</div>
    `;
};
