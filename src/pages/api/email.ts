// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail';

const sendEmails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const emails: {
      to: string
      from: string
      subject: string
      text: string
    }[] = req.body.emails;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : "");
    sgMail.send(emails);

    return res.status(200).send({ "message": "Emails sent" });
  } catch (e) {
    return res.status(500).send({ error: e });
  }
};

export default sendEmails;