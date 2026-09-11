import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!cloudName) {
  throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in environment variables');
}

export const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
});

export const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
