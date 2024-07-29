import EmailService from './services/EmailServices'

export default async (context) => {
    const { req, res, log, error } = context;
    switch (req.path) {
        case '/email-verfication': 
         emailService = new EmailService();
         await emailService.verifyEmail(context,req,res);
         
         case '/test':
            return res.json({ ok: true, error: 'App is working' }, 200);
    }
}