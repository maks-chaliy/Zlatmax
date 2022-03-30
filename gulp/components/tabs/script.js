
const $tabsBtns = document.querySelectorAll('.tabs__nav-btn');
const $tabsContent = document.querySelectorAll('.tabs__content');

$tabsBtns.forEach((item) => {
	item.addEventListener('click', () => {
		//текущая кнопка
		let currentBtn = item;
		//находит id нажимаемой кнопки
		let tabId = currentBtn.getAttribute('data-tabs-path');
		let currentTab = document.querySelector(tabId);

		//условие чтобы активной кнопке при повторном нажатии снова не добавлялся
		//класс активности, так как он уже итак есть
		if (!currentBtn.classList.contains('tabs__nav-btn--active')) {
			//пребираем кнопки и удаляем активный класс
			$tabsBtns.forEach((item) => {
				item.classList.remove('tabs__nav-btn--active')
			});

			//пребираем контент и удаляем активный класс
			$tabsContent.forEach((item) => {
				item.classList.remove('tabs__content--active')
			});

			//добавляем классы активности кнопке и контенту
			currentBtn.classList.add('tabs__nav-btn--active');
			currentTab.classList.add('tabs__content--active');
		}
	})
})

//чтобы по умолчанию первая кнопка была активной
//и не использовать в html класс активности
//tabs__nav-btn:nth-child(2) -чтобы вторая кнопка была активной
document.querySelector('.tabs__nav-btn').click();



//=============================================
/*

//этот скрипт работает с добавочными боковыми стрелками
//для автоматического переключения табов

document.addEventListener('DOMContentLoaded', () => {
	const $tabs = document.querySelector('.tabs');
	const $tabsBtn = document.querySelectorAll('.tabs__nav-btn');
	const $tabsContent = document.querySelectorAll('.tabs__container');

	//если есть такой класс то следуем по коду дальше
	if ($tabs) {
		//кликаем по главным верхним кнопкам
		$tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__nav-btn')) {
				const tabsPath = e.target.dataset.tabsPath;

				//при клике но верхним кнопкам они будут становиться активными
				//проходимся по всем элементам и удаляем класс => tabs__btn--active
				$tabsBtn.forEach(el => { el.classList.remove('tabs__nav-btn--active') });
				//найти текущую кнопку и добавить ей класс
				document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__nav-btn--active');
				tabsHandler(tabsPath);
			}

			//===================================
			//код отвечающий за боковые кнопки prev и next
			//если не использовать эти кнопки то условие удалить
			if (e.target.classList.contains('tabs__arrow--prev')) {
				let activeBtn = document.querySelector('.tabs__nav-btn--active');
				let activeParent = activeBtn.closest('.tabs__nav-item');
				let previousParent = activeParent.previousElementSibling;

				if (previousParent) {
					let prevActive = previousParent.querySelector('.tabs__nav-btn')
					$tabsBtn.forEach(el => { el.classList.remove('tabs__nav-btn--active') });
					prevActive.classList.add('tabs__nav-btn--active');

					let path = prevActive.dataset.tabsPath;
					tabsHandler(path);
				}
			}

			if (e.target.classList.contains('tabs__arrow--next')) {
				let activeBtn = document.querySelector('.tabs__nav-btn--active');
				let activeParent = activeBtn.closest('.tabs__nav-item');
				let nextParent = activeParent.nextElementSibling;

				if (nextParent) {
					let nextActive = nextParent.querySelector('.tabs__nav-btn');
					$tabsBtn.forEach(el => { el.classList.remove('tabs__nav-btn--active') });
					nextActive.classList.add('tabs__nav-btn--active');

					let path = nextActive.dataset.tabsPath;
					tabsHandler(path);
				}
			}
			//=====================================================
		});
	}

	//при клике но верхним кнопкам они будут становиться активными
	const tabsHandler = (path) => {
		//почти аналогичный код верхнему (найти кнопку) только вместо btn - content / path - target
		//при клике но верхним кнопкам будет меняться контент
		$tabsContent.forEach(el => { el.classList.remove('tabs__container--active') });
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__container--active');
	};
});
*/