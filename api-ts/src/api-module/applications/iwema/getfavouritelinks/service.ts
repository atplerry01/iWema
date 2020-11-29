import { getConnection } from "typeorm";

export const getfavouriteLinks = (email: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const myFavLinks = await getConnection()
          .query(`SELECT s.submenu_name as FavouriteName,s.submenu_link as Favourite_Link,s.submenu_display_inside, f.submenu_id 
                FROM menu_subs s JOIN UserFavouriteLinks f ON s.submenu_id = f.submenu_id WHERE f.email= '${email}'  ORDER BY f.clicks DESC LIMIT 12;`);

        if (myFavLinks.length < 12) {
          // if less 12 then get the remaining from
          const limit = 12 - myFavLinks.length;
          const favLinks = await getConnection()
            .query(`SELECT submenu_name as FavouriteName,submenu_link as Favourite_Link,submenu_display_inside, submenu_id 
                FROM menu_subs where favourite_status='Y' and status='Y' order by favourite_order LIMIT ${limit};`);
          const favs = [...myFavLinks, ...favLinks];
          return resolve(favs);
        }

        return resolve(myFavLinks);
      } catch (err) {
        return reject({ err, message: "No favourite link found" });
      }

      // const q = this.qApplication.getfavouriteLinks_QUERY();

      // this.dbHelper.executeMySQL(q).then(_result => {
      //     return resolve(_result[0]);
      // }).catch((err) => {
      //     return reject({ err: err, message: "No favourite link found" });
      // }); // end of execution
    });
  };
