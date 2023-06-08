const avatars = [
  "https://i.imgur.com/cCLhuZK.jpg",
  "https://i.imgur.com/0wFVcs2.jpg",
  "https://i.imgur.com/YFzZOSA.jpg",
];

export const generateRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 2);
  return avatars[randomNumber];
};
