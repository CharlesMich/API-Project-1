const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "myaaprojects";

  // aws_access_key_id= process.env.AWS_ACCESS_KEY_ID,
  // aws_secret_access_key= process.env.WS_SECRET_ACCESS_KEY

// const s3 = `https://${NAME_OF_BUCKET}.s3.amazonaws.com/`


// ALLOWED_EXTENSIONS = { "png", "jpg", "jpeg", "gif"}

// --------------------------- Public UPLOAD ------------------------

const singleFileUpload = async ({ file, public = false }) => {
  const { originalname, buffer } = file;
  const path = require("path");

  // Set the name of the file in your S3 bucket to the date in ms plus the
  // extension name.
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key: public ? `public/${Key}` : Key,
    Body: buffer
  };
  const result = await s3.upload(uploadParams).promise();

  // Return the link if public. If private, return the name of the file in your
  // S3 bucket as the key in your database for subsequent retrieval.
  return public ? result.Location : result.Key;
};

const multipleFilesUpload = async ({files, public = false}) => {
  return await Promise.all(
    files.map((file) => {
      return singleFileUpload({file, public});
    })
  );
};



// --------------------------- Prviate UPLOAD ------------------------

const retrievePrivateFile = (key) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl("getObject", {
      Bucket: NAME_OF_BUCKET,
      Key: key
    });
  }
  return fileUrl || key;
};

// const multiplePrivateFileUpload = async (files) => {
//   return await Promise.all(
//     files.map((file) => {
//       return singlePrivateFileUpload(file);
//     })
//   );
// };

// const retrievePrivateFile = (key) => {
//   let fileUrl;
//   if (key) {
//     fileUrl = s3.getSignedUrl("getObject", {
//       Bucket: NAME_OF_BUCKET,
//       Key: key,
//     });
//   }
//   return fileUrl || key;
// };

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singleFileUpload,
  multipleFilesUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload
};
