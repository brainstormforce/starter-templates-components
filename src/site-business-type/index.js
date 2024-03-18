import React from 'react';
import MegaMenu from '../mega-menu';
const MegaMenuOptions = require('./mega-menu-content.json');
import './style.scss';

const SiteBusinessType = ({ parent, menu, onClick }) => {
	return (
		<div className="stc-mega-menu-filter">
			<MegaMenu
				parent={parent}
				menu={menu}
				options={MegaMenuOptions}
				onClick={(event, option, childItem) => {
					if ('function' === typeof onClick) {
						onClick(event, option, childItem);
					}
				}}
			/>
		</div>
	);
};

export default SiteBusinessType;
