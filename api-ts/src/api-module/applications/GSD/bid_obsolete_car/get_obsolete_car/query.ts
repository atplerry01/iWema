export const get_obsolete_car_QUERY = () => {
    return  `                
    SELECT id, BRAND, TYPE,REGNO,LOTNO,BASEPRICE,LOCATION,PHOTO FROM obsoletcars`;
};
