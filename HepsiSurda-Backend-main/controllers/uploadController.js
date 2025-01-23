const fs = require("fs");
const path = require("path");

const getImages = async (req, res) => {
  const uploadsDirectory = path.join(__dirname, "..", "uploads");
  const serverBaseUrl = "http://localhost:8080";

  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res
        .status(500)
        .json({ message: "Error reading uploads directory", error: err });
    }

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const imageUrls = imageFiles.map(
      (file) => `${serverBaseUrl}/uploads/${file}`
    );

    res.status(200).json(imageUrls);
  });
};

module.exports = {
  getImages,
};
