import fs from 'fs';
import https from 'https';
import path from 'path';

const rawDataPath = 'data/social_media/instagram_raw.json';
const outputDir = 'public/videos';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const rawData = fs.readFileSync(rawDataPath, 'utf8');

const urlRegex = /"videoUrl":\s*"([^"]+)"/g;
let match;
const videoUrls = [];

while ((match = urlRegex.exec(rawData)) !== null) {
  videoUrls.push(match[1]);
}

const uniqueUrls = [...new Set(videoUrls)];
console.log(`Found ${uniqueUrls.length} unique video URLs.`);

if (uniqueUrls.length === 0) {
    console.log("No videos found.");
    process.exit(0);
}

// Try to download the first valid video
const downloadVideo = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filepath);

    const request = https.get(url, { timeout: 15000 }, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filepath, () => {});
        return reject(new Error(`Status Code ${response.statusCode}`));
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

(async () => {
    // Try the first 3 videos to find a good one
    for (let i = 0; i < Math.min(3, uniqueUrls.length); i++) {
        try {
            await downloadVideo(uniqueUrls[i], `hero-background-${i}.mp4`);
        } catch (e) {
            console.error(`Failed to download video ${i}: ${e.message}`);
        }
    }
})();
