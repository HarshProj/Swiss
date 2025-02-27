export const users = [
    {
      name: "John Doe",
      bio: "Meme Lord",
      profilePic: "/user1.png",
      uploadedMemes: ["meme1.jpg", "meme2.jpg"],
      likedMemes: ["meme3.jpg"],
    },
    {
      name: "Jane Smith",
      bio: "Certified Meme Addict",
      profilePic: "/user2.png",
      uploadedMemes: ["meme4.jpg", "meme5.jpg", "meme6.jpg"],
      likedMemes: ["meme7.jpg", "meme8.jpg"],
    },
    {
      name: "Elon Meme",
      bio: "CEO of Memes",
      profilePic: "/user3.png",
      uploadedMemes: ["meme9.jpg"],
      likedMemes: ["meme10.jpg", "meme11.jpg", "meme12.jpg"],
    },
  ].map((user) => ({
    ...user,
    engagementScore: user.uploadedMemes.length * 10 + user.likedMemes.length * 5,
  }));
  