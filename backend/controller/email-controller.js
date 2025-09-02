/* eslint-disable no-unused-vars */
import Email from "../model/email.js";

export const saveSentEmail = (request, response) => {
    try {
        const { subject, body } = request.body;
        let isSpam = false;
        const spamKeywords = ['free money', 'lottery', 'click here', 'unclaimed prize'];

        // Check if subject or body contains any spam keywords
        if (spamKeywords.some(keyword => subject.toLowerCase().includes(keyword) || body.toLowerCase().includes(keyword))) {
            isSpam = true;
        }

        const newEmail = new Email({
            ...request.body,
            isSpam,
        });

        newEmail.save();
        response.status(200).json("email is saved");
    } catch (error) {
        response.status(500).json(error.message);
    }
};

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true });
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = await Email.find({ type: 'inbox', bin: false });
        } else if (request.params.type === 'spam') {
            emails = await Email.find({ isSpam: true, bin: false });
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

export const moveToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body } }, { $set: { bin: true, starred: false, type: '' } });
        return response.status(200).json("email deleted succesfully");
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }
};

export const starredEmail = async (request, response) => {
    try {
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value } });
        response.status(201).json('Value is updated');
    } catch (error) {
        console.log(error);
        response.status(200).json(error.message);
    }
};

export const deleteEmail = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body } });
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
};

// New function to check a URL for spam
export const checkURLforSpam = async (request, response) => {
    try {
        const { url } = request.body;

        // Check if the URL is missing or not a string
        if (!url || typeof url !== 'string') {
            return response.status(400).json({ isSpam: false, message: 'Invalid or missing URL.' });
        }

        const maliciousDomains = [
            'free-money-now.com',
            'unclaimed-prize.net',
            'win-lottery.co'
        ];

        const isSpamURL = maliciousDomains.some(domain => url.includes(domain));
        
        if (isSpamURL) {
            return response.status(200).json({ isSpam: true, message: 'Warning: This URL is detected as spam.' });
        }

        return response.status(200).json({ isSpam: false, message: 'This URL seems safe.' });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ isSpam: false, message: 'An error occurred.' });
    }
};
