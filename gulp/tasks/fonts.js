import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
	//ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))

		//конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		//выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}


export const ttfToWoff = () => {
	//ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))

		//конвертируем в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		//выгружаем в папку c результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))

		//ищем файлы шрифтов ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))

		//конвертируем в woff2
		.pipe(ttf2woff2())

		//выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontStyle = () => {
	//файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/settings/fonts.scss`;

	//проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			//проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				//если файла нет создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					//записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWEight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWEight.toLocaleLowerCase() === 'thin') {
							fontWEight = 100;
						} else if (fontWEight.toLocaleLowerCase() === 'extralight') {
							fontWEight = 200;
						} else if (fontWEight.toLocaleLowerCase() === 'light') {
							fontWEight = 300;
						} else if (fontWEight.toLocaleLowerCase() === 'medium') {
							fontWEight = 500;
						} else if (fontWEight.toLocaleLowerCase() === 'semibold') {
							fontWEight = 600;
						} else if (fontWEight.toLocaleLowerCase() === 'bold') {
							fontWEight = 700;
						} else if (fontWEight.toLocaleLowerCase() === 'extrabold' || fontWEight.toLocaleLowerCase() === 'heavy') {
							fontWEight = 800;
						} else if (fontWEight.toLocaleLowerCase() === 'black') {
							fontWEight = 900;
						} else {
							fontWEight = 400;
						}
						fs.appendFile(fontsFile,
							`@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
								font-weight: ${fontWEight};
								font-style: normal;
							}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else
				//если файл есть выводим сообщение
				console.log(`Файл scss/fonts.scss уже существует. Для обновления файла нужно еш=го удалить`);
		}
	})
	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
};





