import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import FooterPage from './components/FooterPage';
import HeaderPage from './components/HeaderPage';
import LeftSidebar from './components/LeftSidebar';

const Admin = (): JSX.Element => {
	useEffect(() => {
		let ps: PerfectScrollbar | null = null;
		let psNotification: PerfectScrollbar | null = null;

		const elmBody = document.querySelector('body');
		const elmScrollSidebar = document.querySelector('.scroll-sidebar');
		const messageCenter = document.querySelector('.message-center');
		const sidebarnav = document.getElementById('sidebarnav');

		if (elmScrollSidebar != null) {
			ps = new PerfectScrollbar(elmScrollSidebar, {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20,
			});
		}

		if (messageCenter != null) {
			psNotification = new PerfectScrollbar(messageCenter, {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20,
			});
		}

		const elmSidebartoggler = document.querySelector('.sidebartoggler');
		if (elmSidebartoggler != null) {
			elmSidebartoggler.addEventListener('click', evt => {
				evt.preventDefault();

				const elmNavbarBrand = document.querySelector('.navbar-brand span');

				if (elmBody?.classList.contains('mini-sidebar') ?? false) {
					setResize();
					elmBody?.classList.remove('mini-sidebar');
					if (elmNavbarBrand != null) (elmNavbarBrand as HTMLElement).style.display = 'block';
				} else {
					setResize();
					elmBody?.classList.add('mini-sidebar');
					if (elmNavbarBrand != null) (elmNavbarBrand as HTMLElement).style.display = 'none';
				}

				// PerfectScrollbar
				if (ps != null) {
					ps.update();
				}
			});
		}

		const elmNavToggler = document.querySelector('.nav-toggler');
		if (elmNavToggler != null) {
			elmNavToggler.addEventListener('click', evt => {
				evt.preventDefault();

				const elmNavTogglerIcon = document.querySelector('.nav-toggler i');

				elmBody?.classList.toggle('show-sidebar');

				if (elmNavTogglerIcon != null) {
					elmNavTogglerIcon.classList.toggle('fa-bars');
					elmNavTogglerIcon.classList.toggle('fa-times');
				}

				// PerfectScrollbar
				if (ps != null) {
					ps.update();
				}
			});
		}

		if (sidebarnav != null) {
			sidebarnav.addEventListener('click', (evt: MouseEvent) => {
				const target = evt.target as HTMLElement;

				// if (!target) return;

				const elmA = target.closest('a');

				if (elmA == null) return;

				const addressValue = elmA.getAttribute('href');

				if (
					addressValue === '#' ||
					addressValue === '' ||
					addressValue === '/#' ||
					addressValue === '#/'
				)
					evt.preventDefault();

				const elmUls = Array.from(sidebarnav.querySelectorAll('ul'));
				const elmAs = Array.from(sidebarnav.querySelectorAll('a'));

				if (!elmA.classList.contains('active')) {
					let prevElem = null;
					let nextElem = elmA.nextElementSibling;

					if (nextElem == null) nextElem = elmA.closest('ul');
					if (nextElem != null) prevElem = nextElem.previousElementSibling;

					// Remove active class on all elements ul
					elmUls.forEach(itemUl => {
						itemUl.classList.remove('in');
					});

					// Remove active class on all elements a
					elmAs.forEach(itemA => {
						itemA.classList.remove('active');
					});

					// Ul Parent
					const elmUlParent = elmA.closest('ul');
					if (elmUlParent?.id !== sidebarnav.id) {
						elmUlParent?.classList.add('in');

						const prevParentElem = elmUlParent?.previousElementSibling;
						if (prevParentElem != null) {
							prevParentElem.classList.add('active');

							// Ul Granfather
							const elmGranfather = prevParentElem.closest('ul');
							if (elmGranfather?.id !== sidebarnav.id) {
								elmGranfather?.classList.add('in');

								const prevGranfather = elmGranfather?.previousElementSibling;
								if (prevGranfather != null) prevGranfather.classList.add('active');
							}
						}
					}

					if (nextElem != null) nextElem.classList.add('in');
					if (prevElem != null) prevElem.classList.add('active');
					elmA.classList.add('active');
				} else if (elmA.classList.contains('active')) {
					const nextElem = elmA.nextElementSibling;

					// Ul Parent
					const elmUlParent = elmA.closest('ul');
					if (elmUlParent?.id !== sidebarnav.id) {
						const prevParentElem = elmUlParent?.previousElementSibling;
						if (prevParentElem != null) {
							// Ul Granfather
							const elmGranfather = prevParentElem.closest('ul');
							if (elmGranfather?.id === sidebarnav.id) {
								if (nextElem?.classList?.contains('in') ?? false) {
									// prevParentElem.classList.remove('active');
									nextElem?.classList.remove('in');
								} else {
									prevParentElem.classList.remove('active');
									elmUlParent?.classList.remove('in');
								}
							}
						}
					}

					elmA.classList.remove('active');
					if (nextElem != null) nextElem.classList.remove('in');
				}
			});
		}

		if (elmBody != null) elmBody.addEventListener('resize', setResize);

		setResize();
	});

	// Methods
	const setResize = (): void => {
		const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
		const topOffset = 35;

		const elmPageBody = document.querySelector('body');
		const elmNavbarBrand = document.querySelector('.navbar-brand span');
		const elmSidebartogglerIcon = document.querySelector('.sidebartoggler i');
		const elmPageWrapper = document.querySelector('.page-wrapper');

		// console.log(elmNavbarBrand, elmSidebartogglerIcon);

		if (width < 1170) {
			elmPageBody?.classList.add('mini-sidebar');
			if (elmNavbarBrand != null) (elmNavbarBrand as HTMLElement).style.display = 'none';
			if (elmSidebartogglerIcon != null) elmSidebartogglerIcon.classList.add('fa-bars');
		} else {
			elmPageBody?.classList.remove('mini-sidebar');
			if (elmNavbarBrand != null) (elmNavbarBrand as HTMLElement).style.display = 'block';
		}
		let height = (window.innerHeight > 0 ? window.innerHeight : window.screen.height) - 1;
		height -= topOffset;
		if (height < 1) height = 1;
		if (height > topOffset) {
			if (elmPageWrapper != null) (elmPageWrapper as HTMLElement).style.minHeight = `${height}px`;
		}
	};

	window.addEventListener('resize', setResize);

	return (
		<section id="main-wrapper">
			<HeaderPage />

			<LeftSidebar />

			<div className="page-wrapper">
				<div className="container-fluid">
					<Outlet />
				</div>
			</div>

			<FooterPage />
		</section>
	);
};

export default Admin;
