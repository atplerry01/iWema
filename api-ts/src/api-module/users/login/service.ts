import * as jwt from 'jsonwebtoken'; // https://github.com/auth0/node-jsonwebtoken
import * as _ from 'lodash';
import * as shortid from 'shortid';
import { redis } from '../../../util/redis';
import { getADErrorMessages } from '../../../util/utility';
import { getUserMenus } from '../../applications/iwema/getUserMenus/service';
import { getMyScopeCodes } from '../getMyScopeCodes/service';
import { getUserDetails } from '../getUsers/service';

export const login = (app: any, username: string, password: string) => {

    return new Promise((resolve, reject) => {

        if (!password || !username) {
            return reject({ err: '', message: "Authentication failed. Username/Password invalid" });
        }

        // there is no domain name then add
        username = (username.split('@')[1] ? username : username + '@wemabank.com').toLowerCase();

        app.get('ad').authenticate(username, password, async(err, auth) => {

            if (err || !auth) {
                return reject({ err: err, message: getADErrorMessages(JSON.stringify(err)) });
            }                 

            getUserDetails(app, username).then((_user: any) => {

                getUserMenus(app, _user.sAMAccountName).then((_menu: any[]) => {

                    const accessLevels: any[] = [];
                    if (_menu.length) {
                        _.each(_menu, (val, _key) => {

                            let _accLevel: any;
                            _.each(val.header_sub, (val2, _key2) => {
                                _accLevel = {
                                    access_level: val2.access_level_id,
                                    module: val2.role_name
                                };
                                accessLevels.push(_accLevel);
                            });

                        });
                    }

                    // scopeLevel hold user's RegionCode, ZoneCode and BranchCode
                    getMyScopeCodes(username).then( async _level => {

                        // console.log('accessLevels:', accessLevels);
                        const token = jwt.sign({  // generate security token
                            data: _user,
                            id: shortid.generate()
                            // scopeLevel: _level,
                            // accessLevels: accessLevels
                            // menu: _menu
                        }, process.env.TOKEN_SECRET as string, {
                                expiresIn: '5h'
                        });

                           const securityControl = { scopeLevel: _level, accessLevels: accessLevels};
                           await redis.set(`${username}SecurityControl`, JSON.stringify(securityControl), "ex", 60 * 60 * 5); // store for 5hr
                           await redis.set(`${username}token`, token, "ex", 60 * 60 * 5); // store for 5hr

                        const data = {
                            token: token,
                            user: _user,
                            menu: _menu,
                            scopeLevel: _level,
                            accessLevels: accessLevels
                        };

                        return resolve(data);

                    }).catch(_err => {
                return reject({ err: _err, message: "Authentication failed. Your scope is not yet available. It would be corrected shortly" });
                    });

                }).catch(_err => {

                    const token = jwt.sign({  // generate security token
                        data: _user,
                        // menu: null,
                        scopeLevel: null,
                        accessLevels: null
                    }, process.env.TOKEN_SECRET as string, {
                            expiresIn: '5h'
                        });

                    const data = {
                        token: token,
                        user: _user,
                        menu: null,
                        scopeLevel: null
                    };
                    return resolve(data);
                    // return reject({ err: _err, message: "Authentication failed. Username/Password invalid" });
                });

            }).catch(_err => {
                return reject({ err: _err, message: "Authentication failed. Username/Password invalid" });
            });

        });

    });
};


// this connect to only AD
export const loginADExternal = (app: any, username: string, password: string) => {

    return new Promise((resolve, reject) => {

        if (!password || !username) {
            return reject({ err: '', message: "Authentication failed. Username/Password invalid" });
        }

        // there is no domain name then add
        username = (username.split('@')[1] ? username : username + '@wemabank.com').toLowerCase();

        app.get('ad').authenticate(username, password, async(err, auth) => {

            if (err || !auth) {
                return reject({ err: err, message: getADErrorMessages(JSON.stringify(err)) });
            }                 

            getUserDetails(app, username).then((_user: any) => {
                return resolve(_user);
            }).catch(_err => {
                return reject({ err: _err, message: "Authentication failed. Username/Password invalid" });
            });

        });

    });
};
