import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto',
            })

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove locally saved temp file if upload failed
    } finally {
        try {
            await fs.unlink(localFilePath);
        } catch (error) {
            console.error("Temporary file cleanup failed:", error.message);
        }
    }
}

export { uploadOnCloudinary };