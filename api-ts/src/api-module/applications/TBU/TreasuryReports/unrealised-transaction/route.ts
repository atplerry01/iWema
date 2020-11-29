import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { getUnrealizedTransactionService } from './service';

export const getUnrealizedTransactions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      
      try {
        const result = await getUnrealizedTransactionService();
        // const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};
