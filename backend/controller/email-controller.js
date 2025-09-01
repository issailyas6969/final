const email = require('../model/email');

const saveSentEmail = (request, response) => {
    try {
        const { subject, body } = request.body;
        let isSpam = false;
        const spamKeywords = ['free money', 'lottery', 'click here', 'unclaimed prize'];

        // Check if subject or body contains any spam keywords
        if (spamKeywords.some(keyword => subject.toLowerCase().includes(keyword) || body.toLowerCase().includes(keyword))) {
            isSpam = true;
        }

        const newEmail = new email({
            ...request.body,
            isSpam,
        });

        newEmail.save();
        response.status(200).json("email is saved");
    } catch (error) {
        response.status(500).json(error.message);
    }
};

const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await email.find({ bin: true });
        } else if (request.params.type === 'allmail') {
            emails = await email.find({});
        } else if (request.params.type === 'inbox') {
            // Corrected to fetch emails with type 'inbox' that are not in the bin
            emails = await email.find({ type: 'inbox', bin: false });
        } else if (request.params.type === 'spam') {
            // Added to fetch emails that are spam and not in the bin
            emails = await email.find({ isSpam: true, bin: false });
        } else {
            emails = await email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

const moveToBin = async (request, response) => {
    try {
        await email.updateMany({ _id: { $in: request.body } }, { $set: { bin: true, starred: false, type: '' } });
        return response.status(200).json("email deleted succesfully");
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }
};

const starredEmail = async (request, response) => {
    try {
        await email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value } });
        response.status(201).json('Value is updated');
    } catch (error) {
        console.log(error);
        response.status(200).json(error.message);
    }
};

const deleteEmail = async (request, response) => {
    try {
        await email.deleteMany({ _id: { $in: request.body } });
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
};

module.exports = { saveSentEmail, getEmails, moveToBin, starredEmail, deleteEmail };