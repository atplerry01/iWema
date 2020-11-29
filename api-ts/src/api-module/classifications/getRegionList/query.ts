export const getRegionList_QUERY = () => {
    return  `SELECT RegionCode regioncode, RegionName region FROM Region WHERE Status='Y' 
                        ORDER BY orderno`;
    };
