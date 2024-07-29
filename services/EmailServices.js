const sdk = require('appwrite');
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import AppConst from '../AppConst';

class EmailServices {
    client = new sdk.Client();

    __filename = fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
    staticFolder = path.join(__dirname, '../static');
    constructor() {
        this.client
            .setEndpoint(AppConst.apiEndPoint) // Your API Endpoint
            .setProject(AppConst.projectId) // Your project ID
            .setKey(AppConst.apiSecretKey) // Your secret API key
            ;
    }
    async verifyEmail(context, req, res) {
        const payload = JSON.parse(req.payload);
        const { userId, secret } = payload;

        if (!userId || !secret) {
            return res.status(400).send({ message: 'User ID and secret are required' });
        }

        try {
            const response = await account.updateVerification(userId, secret);
            const html = getStaticFile('email-verified.html');
            return res.send(html, 200, { 'Content-Type': 'text/html; charset=utf-8' });
        } catch (error) {
            const html = getStaticFile('email-invalid.html');
            return res.send(html, 200, { 'Content-Type': 'text/html; charset=utf-8' });
        }
    }

    getStaticFile(fileName) {
        return fs.readFileSync(path.join(staticFolder, fileName)).toString();
    }
}

export default EmailServices