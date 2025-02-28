import admin  from "firebase-admin";

admin.initializeApp({
  storageBucket: "swiss-dffda.appspot.com",
});

const bucket = admin.storage().bucket();

const corsConfig = [
  {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
    responseHeader: ["Content-Type"],
    maxAgeSeconds: 3600,
  },
];

bucket.setCorsConfiguration(corsConfig)
  .then(() => console.log("CORS configuration updated successfully"))
  .catch(err => console.error("Error updating CORS:", err));
