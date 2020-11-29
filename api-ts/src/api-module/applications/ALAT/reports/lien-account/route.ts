import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { getLienAccountService } from "./service";

export const getLienAccountRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const accountNumber = _.get(req.query, "accountNumber");
      const cif = _.get(req.query, "cif");

      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getLienAccountService(accountNumber, cif);
        const result = await Paginator(entity, page, per_page);

        if (_export === "1" || _export === 1) {
          return res.status(200).json({
            data: entity
          });
        }

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        data: err
      });
    });
};
