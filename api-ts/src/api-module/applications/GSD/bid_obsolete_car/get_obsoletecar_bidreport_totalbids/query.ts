export const get_obsoletecar_bidreport_totalbids_QUERY = () => {
        
    return  `SELECT o.id, o.BRAND, o.TYPE,o.REGNO,o.LOTNO,o.BASEPRICE,o.LOCATION,o.PHOTO,
    (SELECT COUNT(*) FROM bidders WHERE obsoleteCarId = o.id) AS TOTALBIDS,
    (SELECT MAX(amount) FROM bidders WHERE obsoleteCarId = o.id) AS HIGHESTBID 
    FROM obsoletcars o order by HIGHESTBID desc,TOTALBIDS desc`;
};
