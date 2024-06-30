import PropTypes from 'prop-types';
import './FeatureDeveloping.css';
import xmark from './assets/xmark.png';

function FeatureDeveloping({ show, onClose }) {
    const displayStyle = show ? { display: 'block' } : { display: 'none' };

    return (
        <div className="modal-overlay" style={displayStyle}>
            <div className="modal" style={displayStyle}>
                <div className="modal-header">
                    <strong style={{ fontSize: '24px'}}>Feature is not available</strong>
                    <button onClick={onClose} className="modal-close-button">
                        <img src={xmark} alt="Close"></img>
                    </button>
                </div>
                <div className="modal-body">
                    <p>This feature is under construction and not available for use at this time</p>
                    <br></br>
                    <p>We are sorry for any inconvenience. We will let you know when the feature is completed.</p>
                    <br></br>
                    <p>Please come back later.</p>
                    <div style={{ position: 'fixed', bottom: 0}}>
                        <code>
                            <p><strong>
                                Error code: FEATURE_HAVE_FLAGS_UNDERCONSTRUCTION_ENABLED</strong></p>
                            <p><strong>
                                What error: Feature is not available because this feature have isContruction flags is true set by developer.</strong></p>
                            <p><strong>
                                Error details: When isConstruction flags set to true, that feature cannot be accessed by public users and can be only accessed by developer. 
                                <br></br>When public users use the feature that have this flags, this popup will be shown.</strong></p>
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
}

FeatureDeveloping.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FeatureDeveloping;
