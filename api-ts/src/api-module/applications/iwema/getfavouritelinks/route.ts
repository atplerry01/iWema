import { ErrorHandler } from '../../../../util/errorHandler';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getfavouriteLinks } from './service';

export const getfavouritelinksRouter = async (req, res, jwt) => {
    try {
      const decoded_token: any = await isAuthenticated(req, jwt);
      const {mail} = decoded_token.data;

      const links = await getfavouriteLinks(mail);
      return res.status(200).json(links);
    } catch (error) {
      const handleErr = ErrorHandler(req, '', 'getfavouriteLinks', 'Could not retrieve favourite links', error, true);
      return res.status(400).json(handleErr);
    }
  };
