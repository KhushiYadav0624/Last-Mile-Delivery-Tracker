const sendMail = async (to, subject, text) => {
  console.log("\n===============================");
  console.log("📧 EMAIL NOTIFICATION");
  console.log("===============================");
  console.log("To      :", to);
  console.log("Subject :", subject);
  console.log("Message :", text);
  console.log("===============================\n");
};

module.exports = sendMail;