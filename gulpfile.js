
//основной модуль
import gulp from "gulp";

//импорт путей
import {path} from "./gulp/config/path.js";

//импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";

//перендаем значения в глобальную перемнную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

//импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTtf, ttfToWoff, fontStyle} from "./gulp/tasks/fonts.js";
import {svgSprive} from "./gulp/tasks/svgSprive.js";
import {zip} from "./gulp/tasks/zip.js";

//наблюдатель за изменениями в файлах
function watcher(){
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export {svgSprive};

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

//основные задачи
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//построение сценариев выполнения задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask, zip);

//экспорт сценариев
export {dev};
export {build};
export {deployZip};

//выполнения сценария по умолчанию
gulp.task('default', dev);