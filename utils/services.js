const services = {
  JWT_KEY: "secret",
  mongoURI:
    "mongodb+srv://saral:0901EC171095@cluster0.zh4pl.mongodb.net/whatsapp-clone?retryWrites=true&w=majority",
  serverIp: `http://localhost:${process.env.port || 5000}`,
};

export default services;
