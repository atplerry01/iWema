export const getChannelMovement_QUERY = () => {
    return `SELECT Channel AS Channel, Cnt As TotalCount, amt As TotalAmount, TranDate As TranDate, Remarks As Remarks 
    FROM ChannelMovement WHERE TranDate >=  DATE(NOW() - INTERVAL 2 DAY) ORDER BY Channel, TranDate`;
};
