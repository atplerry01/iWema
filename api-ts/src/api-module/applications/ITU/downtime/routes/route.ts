
import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { createDowntimeServices, getDowntimeReportSevices, getTopDowntimeReportSevices } from "./service";

export const getDowntimeRequest = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);
            const searchType = _.get(req.query, "searchType");
            const dateFrom = _.get(req.query, "dateFrom");
            const dateTo = _.get(req.query, "dateTo");
            const searchText = _.get(req.query, "searchText");
            const _export = _.get(req.query, "_export", 0);

            try {
                const entity = await getDowntimeReportSevices(searchType, dateFrom, dateTo, searchText);

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

// getTopDowntimeRequest
export const getTopDowntimeRequest = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);
            const _export = _.get(req.query, "_export", 0);

            try {
                const entity = await getTopDowntimeReportSevices();

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

export const createDowntimeRequest = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const Date = _.get(req.body, "Date");
            const Issues = _.get(req.body, "Issues");
            const ServiceImpacted = _.get(req.body, "ServiceImpacted");
            const Responsibility = _.get(req.body, "Responsibility");
            const StartDate = _.get(req.body, "StartDate");
            const EndDate = _.get(req.body, "EndDate");
            const FilePath = _.get(req.body, "FilePath");

            try {
                const createdBy = decoded_token.data.mail;
                const now = `${Date} ${StartDate}`;
                const then = `${Date} ${EndDate}`;

                const TimeDiff = moment.utc(moment(now, "YYYY-MM-DD HH:mm:ss").diff(moment(then, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");

                await createDowntimeServices({ Date, Issues, ServiceImpacted, Responsibility, StartDate, EndDate, TimeDiff, FilePath, createdBy });
                return res.status(200).json({
                    data: true
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
