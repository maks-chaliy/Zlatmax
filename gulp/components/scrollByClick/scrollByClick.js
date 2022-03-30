//прокрутка при клике
const $navLinks = document.querySelectorAll('.nav__link[data-goto]');

if ($navLinks.length > 0) {
	$navLinks.forEach(navLink => {
		navLink.addEventListener('click', onNavLinkClick);
	});

	function onNavLinkClick(e) {
		const navLink = e.target;
		if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
			const gotoBlock = document.querySelector(navLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			});
			e.preventDefault();
		};
	}
}