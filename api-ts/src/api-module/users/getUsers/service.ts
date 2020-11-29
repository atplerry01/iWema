export const getUserDetails = (app: any, username) => {

    return new Promise((resolve, reject) => {

        if (!username) { return reject({ err: null, message: "Username is required." }); }

        app.get('ad').findUser(username, (err, user) => {
            if (err) { return reject({ err: err, message: "No user found" }); }

            const result = user;

            if (!user) { reject({ err: null, message: "No user found" }); } else {

                try {
                    const dn = user.dn.split(',');
                    let dpt = ''; // dn[1] ? dn[1].split('=')[1] : '';
                    if ( dn[1]) {
                        const dt = dn[1].split('=');
                        dpt = dt[1] ? dt[1] : '';
                    }

                    let brn = ''; // dn[2] ? dn[2].split('=')[1] : '';
                    if ( dn[2]) {
                        const dt = dn[2].split('=');
                        brn = dt[1] ? dt[1] : '';
                    }

                    let grade = '';
                    if (user.title) {
                        const gdl = user.title.split(' ');
                        
                        let gl = ''; // gdl[2] ? gdl[2].slice(0, 1) : '';
                        if ( gdl[2]) {
                            gl = gdl[1].slice(0, 1) + gdl[2].slice(0, 1);
                        } else  if ( gdl[1]) {
                            gl = gdl[1].slice(0, 1);
                        }

                        grade = user.title.slice(0, 1) + gl;
                    }


                    result.department = dpt;
                    result.branch = brn;
                    result.grade = grade;

                } catch (error) {
                    // log error
                }

            }

            return resolve(result);
        });

    });
};
