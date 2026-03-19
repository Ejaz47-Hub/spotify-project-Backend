const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:3000/api';

async function seedData() {
    try {
        console.log('Registering artist...');
        const artist = {
            username: 'ArtistThree',
            email: 'artistthree@test.com',
            password: 'password123',
            role: 'artist'
        };
        
        await axios.post(`${API_URL}/auth/register`, artist);
        
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: artist.email,
            password: artist.password
        });

        const cookie = loginRes.headers['set-cookie'];

        console.log('Uploading mock music...');
        // Create a dummy file for multer
        fs.writeFileSync('dummy.mp3', 'dummy content');
        
        const FormData = require('form-data');
        const form = new FormData();
        form.append('title', 'Test Song Three');
        form.append('music', fs.createReadStream('dummy.mp3'));

        const uploadRes = await axios.post(`${API_URL}/music/upload`, form, {
            headers: {
                ...form.getHeaders(),
                'Cookie': cookie
            }
        });

        console.log('Upload success:', uploadRes.data.message);
        fs.unlinkSync('dummy.mp3');
    } catch (error) {
        console.error('Seeding failed:', error.response?.data || error.message);
    }
}

seedData();
