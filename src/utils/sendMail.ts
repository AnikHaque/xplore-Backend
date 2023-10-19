import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { IEmailOptions } from '../app/modules/user/user.interface';
import config from '../config';

const sendEmail = async (options: IEmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.smtp.smtp_host,
    port: parseInt(config.smtp.smtp_port || '587'),
    service: config.smtp.smtp_service,
    auth: {
      user: config.smtp.smtp_mail,
      pass: config.smtp.smtp_password,
    },
  });
  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, '../mails', template);
  const html: string = await ejs.renderFile(templatePath, data);
  const mailOptions = {
    from: config.smtp.smtp_mail,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
export default sendEmail;
