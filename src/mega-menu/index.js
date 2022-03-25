// External Dependencies.
import React, { useState } from 'react';

// Internal Dependencies.
import { ICONS } from '../icons';
import './style.scss';

const MegaMenu = ( { options, parent, menu, onClick } ) => {
	const [ toggle, setToggle ] = useState( false );

	if ( ! options ) {
		return '';
	}

	return (
		<div
			className={ `stc-mega-menu-wrap ${
				toggle ? 'stc-mega-menu-show' : ''
			}` }
		>
			<div
				className="stc-mega-menu-toggle"
				onClick={ () => {
					setToggle( ! toggle );
				} }
			>
				{ ICONS.toggle }
			</div>

			<div className="stc-mega-menu-container">
				<div className="stc-mega-menu">
					{ options.map( ( option ) => {
						return (
							<div
								key={ option.ID }
								className={ `stc-mega-menu-item ${
									parent === option.ID ||
									( menu === option.ID &&
										parent === option.ID )
										? 'stc-mega-menu-item-active'
										: ''
								}` }
								onClick={ ( event ) => {
									if ( 'function' === typeof onClick ) {
										onClick( event, option, option );
									}
								} }
							>
								<span className="stc-mega-menu-item-title">
									{ option.title }
									{ ICONS.dropdown }
								</span>

								{ option.children &&
									option.children.length > 0 && (
										<div
											className={ `stc-mega-menu-group stc-mega-menu-group-col-${ option.children.length }` }
										>
											{ option.children.map(
												( child ) => {
													return (
														<div
															key={ child.ID }
															className="stc-mega-menu-section"
														>
															<span className="stc-mega-menu-section-title">
																{ child.title }
															</span>
															{ child.children &&
																child.children
																	.length >
																	0 && (
																	<div className="stc-mega-menu-children">
																		{ child.children.map(
																			(
																				childItem
																			) => {
																				return (
																					<div
																						className={ `stc-mega-menu-child-item ${
																							menu ===
																							childItem.ID
																								? 'stc-mega-menu-child-item-active'
																								: ''
																						}` }
																						key={
																							childItem.ID
																						}
																						onClick={ (
																							event
																						) => {
																							if (
																								'function' ===
																								typeof onClick
																							) {
																								event.stopPropagation();
																								onClick(
																									event,
																									option,
																									childItem
																								);
																							}
																						} }
																					>
																						{
																							childItem.title
																						}
																					</div>
																				);
																			}
																		) }
																	</div>
																) }
														</div>
													);
												}
											) }
										</div>
									) }
							</div>
						);
					} ) }
				</div>
			</div>
		</div>
	);
};

export default MegaMenu;
