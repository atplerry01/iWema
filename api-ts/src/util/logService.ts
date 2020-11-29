import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { SubMenu } from '../entity/iWEMA/menu_subs';
import { UserFavouriteLinks } from '../entity/iWEMA/UserFavouriteLinks';

export default class LogService {

    app: any;

    constructor(app) {
        this.app = app;
    }

    logMessage(req, user, subject, request, response) {

        let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ipaddress = ipaddress.split(':')[0];

        const filename = new Date().toJSON().split('T')[0] + '.txt';
        // const msg = `\r\nLog Entry : \n Date: ${new Date()} \n User IP: ${ipaddress} \n User: ${user} \n ${subject} \n request: ${request} \n response: ${response} \n ------------------------------- \n \n`;
        const msg = `Date=${new Date()}\t UserIP=${ipaddress}\t User=${user}\t ${subject}\t request=${request}\t response=${response}\n`;

        fs.appendFile(path.join(__dirname, '../logs/' + filename), msg, (err) => {
            if (err) {
                console.log('Error occurred while logging to textfile!');
            } else {
                if (process.env.NODE_ENV !== "test") {
                    console.log('Logged successful');
                }
            }
        });

    }

   async logUrlClick(submenu_id: string, email: string) {
        const submenu = await SubMenu.findOne({submenu_id});
        if (submenu) {
            submenu.clicks += 1;
            submenu.lastclick = new Date();

            const userFav = await UserFavouriteLinks.findOne({submenu_id, email});
            let createUserFav: UserFavouriteLinks;
            if (userFav) {
                userFav.clicks += 1;
                return Promise.all([submenu.save(), userFav.save()]);
            } else {
            createUserFav = UserFavouriteLinks.create({
                email,
                submenu_id,
                clicks: 1
            });

            return Promise.all([submenu.save(), createUserFav.save()]);
        }

       

        }

        return null;
    }


    logExternalLinkStat(user, name, url) {

        const shortDate = new Date().toJSON().split('T')[0];
        const msg = `Date=${new Date()}\t ShortDate=${shortDate}\t User=${user}\t Name=${name}\t url=${url}\n`;

        fs.appendFile(path.join(__dirname, '../logs/' + 'favLink.txt'), msg, (err) => {
            if (err) {
                console.log('Error occurred while logging to textfile!');
            } else {
                if (process.env.NODE_ENV !== "test") {
                    console.log('Logged successful');
                }
            }
        });

    }

    // read text files
    readLogs(filename = '') {

        return new Promise((resolve, reject) => {

            filename = filename ? `${filename}.txt` : `favLink.txt`;
            const filePath = path.join(__dirname, '../logs/' + filename);

            fs.readFile(filePath, (err, data) => {
                if (err) { return reject(err); }

                const result: any[] = [];
                const array = data.toString().split("\n");
                // tslint:disable-next-line:forin
                for (const i in array) {

                    const obj: any = {};
                    const cols = array[i].split('\t');
                    // tslint:disable-next-line:forin
                    for (const x in cols) {
                        const y = cols[x].split('=');
                        _.set(obj, _.trim(y[0]), _.trim(y[1]));
                    }
                    result.push(obj);
                }
                if (result.length) {
                    result.splice(result.length - 1);
                }

                return resolve(result);
            });

        });

    }

    getUserFavLinks(username) {
        return new Promise((resolve, reject) => {

            this.readLogs().then(data => {

                const myFav = _.filter(data, (x: any) => {
                    return _.toLower(x.User) === _.toLower(username);
                });
                const myLinks: any[] = [];

                if (myFav.length) {
                    _.each(myFav, (val: any, _key) => {

                        const subm = myLinks.filter(f => {
                            return _.toLower(f.FavouriteName) === _.toLower(val.Name);
                        });

                        if (subm.length < 1) {

                            const _fav = {
                                FavouriteName: val.Name,
                                Favourite_Link: val.url,
                                submenu_display_inside: 'N',
                                count: 1
                            };

                            myLinks.push(_fav);
                        } else {
                            const index = myLinks.indexOf(subm[0]);
                            myLinks[index].count = subm[0].count + 1;
                        }

                    });
                }

                const sortedLinks = myLinks.sort(this.app.models.utilities.compareValues('count', 'desc'));
                return resolve(sortedLinks.slice(0, 11)); // get the first 12 list

            }).catch(ex => {
                return reject(ex);
            });



        });

    }


}
