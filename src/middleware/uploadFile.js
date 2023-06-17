import multer from "multer";

const upload = multer({
    dest: './src/assets',
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only .png format allowed'))
        }
    },
    limits: { fileSize: 1 * 1024 * 1024 * 3 }
}).single('image');

export default {
    upload
}
