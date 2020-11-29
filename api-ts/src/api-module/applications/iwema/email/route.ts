import * as _ from 'lodash';
import { sendEmail } from '../../../../util/sendEmail';

export const emailRouter = async (req, res) => {
    try {
      // NB: cc not getting mail...needs to be fixed later

      const from = _.get(req.body, "from");
      const to = _.get(req.body, "to");
      const preheader = _.get(req.body, "preheader");
      const title = _.get(req.body, "title");
      const subject = _.get(req.body, "subject");
      const body = _.get(req.body, "body");
      const sendername = _.get(req.body, "sendername");
      const cc = _.get(req.body, "cc", []);
      const bcc = _.get(req.body, "bcc", []);
      const attachments = _.get(req.body, "attachments");
      const logourl = _.get(req.body, "logourl", null);

      const _resp = await sendEmail(
        from,
        to,
        preheader,
        title,
        subject,
        body,
        sendername,
        cc,
        bcc,
        attachments,
        logourl
      );
      return res.status(200).json(_resp);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
