/**
 * Created by lmy2534290808 on 2017/9/14.
 */
const Sql = {
    //建立数据表
    createEquipmentDetailInfo: "CREATE TABLE IF NOT EXISTS `equipment_detail_info` (_id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "qr_code TEXT,name TEXT,region REAL,unit TEXT,building TEXT,floor TEXT,type INTEGER,img_percentage REAL,video_percentage REAL," +
    "close_code TEXT,open_code TEXT,vibration_code TEXT)",
    createHydrant: "CREATE TABLE IF NOT EXISTS `hydrant` (_id INTEGER PRIMARY KEY AUTOINCREMENT,`qr_code` text,`water_pressure` real,`desc` text, `img` text, `video` text, `ensure_eg_intact` INTEGER, `ensure_water_bag` INTEGER, `ensure_spray_head` INTEGER,`insp_date` text, `vibration_code` text)",
    createPump: "CREATE TABLE IF NOT EXISTS `pump` (_id integer primary key autoincrement,`qr_code` text,`vibration_time` text,`vibration_code`text,`img` text,`video`text,`desc`text,`insp_date` text)",
    createRollerDoor: "CREATE TABLE IF NOT EXISTS `roller_door` (_id integer primary key autoincrement,`qr_code` text,`close_code` text,`open_code` text,`desc` text,`img` text,`video` text,`insp_date` text)",
    createOther: "CREATE TABLE IF NOT EXISTS `other` (_id integer primary key autoincrement,`qr_code` text,`desc` text,`insp_date`text,`img`text,`video` text) ",
    baseInsertEquipmentInfo: "INSERT INTO `equipment_detail_info`" +
    "(`qr_code`,`name`,`region`,`unit`,`building`,`floor`,`type`,`img_percentage`,`video_percentage`,`close_code`,`open_code`,`vibration_code`) values",
    insertEquipmentInfoPropArray: ['qrCode', 'name', 'region', 'unit', 'building', 'floor', 'type', 'imgPercentage', 'videoPercentage', 'closeCode', 'openCode', 'vibrationCode'],
    selectUnitInfo: 'select distinct(unit) name from equipment_detail_info',
    judgeUnitExist: 'select count(1) number from equipment_detail_info where unit=?',
    deleteEquipmentsByUnit: 'delete from equipment_detail_info where unit=?',
    selectBuildingInfo: 'select distinct(building) name from equipment_detail_info where unit=?',
    selectFloorInfo: 'select distinct(floor) name from equipment_detail_info where building=?',
    selectEquipmentInfo: 'select name from equipment_detail_info where floor=?',
    selectType: 'select type,qr_code,img_percentage from equipment_detail_info where qr_code=?',
    insertHydrant: "INSERT INTO `hydrant`(`qr_code`,`water_pressure`,`img`,`video`,`ensure_eg_intact`,`ensure_water_bag`,`ensure_spray_head`, `vibration_code`,`insp_date`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, date('now'));",
    insertPump:"INSERT INTO pump(qr_code,vibration_time,vibration_code,img,video,insp_date) VALUES(?,?,?,?,?,date('now'))",
    insertRollerDoor:"INSERT INTO roller_door(qr_code,open_code,close_code,img,video,insp_date) VALUES(?,?,?,?,?,date('now'))",
    insertOther:"INSERT INTO other(qr_code,img,video,insp_date) VALUES(?,?,?,date('now'))"
}
export default Sql;