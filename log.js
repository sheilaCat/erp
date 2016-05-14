var log4js = require('log4js');

log4js.configure({

    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "file",
            filename: 'logs/log.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 0,
            backups: 4,
            category: 'fileLog'

        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        fileLog: 'debug',
        console: 'debug'
    }
});


var fileLog = log4js.getLogger('fileLog');
var consoleLog = log4js.getLogger('console');
exports.logger = fileLog;


exports.use = function(app) {
    app.use(log4js.connectLogger(consoleLog, {level:'INFO', format:':method :url'}));
}