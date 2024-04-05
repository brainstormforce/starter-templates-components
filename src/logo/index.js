// External Dependencies.
import React from 'react';

// Internal Dependencies.
import './style.scss';

const Logo = ( { className, text, src, alt, onClick, href, extraText } ) => {
	if ( ! text && ! src ) {
		return '';
	}

	return (
		<>
			<span
				className={ `stc-logo ${ className ? className : '' }${extraText ? 'stc-extra-text' : ''}` }
				{ ...( extraText ? { 'data-extraText': extraText } : {} ) }
				onClick={ ( event ) => {
					if ( 'function' === typeof onClick ) {
						onClick( event );
					}
				} }
			>
				{ src ? (
					<>
						{ href ? (
							<a
								href={ href }
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={ src }
									className="stc-logo-image"
									alt={ alt }
								/>
							</a>
						) : (
							<img
								src={ src }
								className="stc-logo-image"
								alt={ alt }
							/>
						) }
					</>
				) : null }

				{ text ? (
					<div className="stc-logo-text" alt={ alt }>
						{ text }
					</div>
				) : null }
			</span>
		</>
	);
};

export default Logo;
