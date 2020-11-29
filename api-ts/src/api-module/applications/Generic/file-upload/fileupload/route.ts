import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { singleFileUploadService } from '../../../../../util/fileUpload';
import { Paginator } from './../../../../../util/utility';
import { getProjectDetailService } from "./service";

export const getProjectDetails = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const code = _.get(req.query, "code");

      try {
        const entity = await getProjectDetailService(code);
        const result = await Paginator(entity, page, per_page);

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

export const fileUpload = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      try {
        const result  = await singleFileUploadService(req, res) as any;
        return res.status(200).json(result);
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
