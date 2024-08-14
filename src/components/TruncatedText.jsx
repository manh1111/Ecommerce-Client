// components
import TruncateMarkup from 'react-truncate-markup';

// hooks
import {useState, useEffect} from 'react';

// utils
import PropTypes from 'prop-types';

const TruncatedText = ({text, lines = 2, className, width}) => {
    const [truncated, setTruncated] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return (
        <span className={className ? className : ''} style={{width}}>
            {
                mounted && (
                    <TruncateMarkup lines={lines} ellipsis={<span>...</span>} onTruncate={(isTruncated) => setTruncated(isTruncated)}>
                        <div>{text}</div>
                    </TruncateMarkup>
                )
            }
        </span>
    )
}

TruncatedText.propTypes = {
    text: PropTypes.string.isRequired,
    lines: PropTypes.number,
    className: PropTypes.string,
    width: PropTypes.number.isRequired
}

export default TruncatedText;
