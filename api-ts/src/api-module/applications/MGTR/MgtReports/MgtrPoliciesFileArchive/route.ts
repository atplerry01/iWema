import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { getPolicyArchiveService, postPolicyArchiveService } from "./service";

export const getPolicyArchiveRoutes = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getPolicyArchiveService();
                const result = await Paginator(entity, page, per_page);

                return res.status(200).json({
                    data: result,
                });
            } catch (err) {
                return res.status(400).json({ error: err });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                data: err,
            });
        });
};

export const postPolicyArchiveRoutes = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(() => {
            const description = _.get(req.body, "Description");
            const title = _.get(req.body, "Title");
            const filePath = _.get(req.body, "FilePath");

            postPolicyArchiveService(title, description, filePath)
                .then(() => {
                    return res.status(201).json({
                        success: true
                    });
                })

                .catch((err) => {
                    return res.status(400).json({
                        success: false,
                        error: err,
                    });
                });
        })
        .catch((err) => {
            return res.status(401).json({
                error: err,
            });
        });
};

