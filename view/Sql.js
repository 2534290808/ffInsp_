/**
 * Created by lmy2534290808 on 2017/9/14.
 */
const Sql = {
    createEquipmentDetailInfo: "CREATE TABLE IF NOT EXISTS `equipment_detail_info` (_id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "qr_code TEXT,name TEXT,region REAL,unit TEXT,building TEXT,floor TEXT,type INTEGER,img_percentage REAL,video_percentage REAL," +
    "close_code TEXT,open_code TEXT,vibration_code TEXT)",
    baseInsertEquipmentInfo: "INSERT INTO `equipment_detail_info`" +
    "(`qr_code`,`name`,`region`,`unit`,`building`,`floor`,`type`,`img_percentage`,`video_percentage`,`close_code`,`open_code`,`vibration_code`) values",
    insertEquipmentInfoPropArray: ['qrCode', 'name', 'region', 'unit', 'building', 'floor', 'type', 'imgPercentage', 'videoPercentage', 'closeCode', 'openCode', 'vibrationCode'],
    selectUnitInfo:'select distinct(unit) name from equipment_detail_info',
    judgeUnitExist:'select count(1) number from equipment_detail_info where unit=?',
    deleteEquipmentsByUnit:'delete from equipment_detail_info where unit=?',
    selectBuildingInfo:'select distinct(building) name from equipment_detail_info where unit=?',
    selectFloorInfo:'select distinct(floor) name from equipment_detail_info where building=?',
    selectEquipmentInfo:'select name from equipment_detail_info where floor=?'
}
export default Sql;