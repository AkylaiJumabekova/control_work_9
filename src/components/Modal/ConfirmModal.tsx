import React from 'react';
import Modal from './Modal';

interface Props {
    show: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<Props> = ({ show, title, onClose, onConfirm }) => {
    return (
        <Modal show={show} title={title} onClose={onClose}>
            <div className="modal-body">
                <p>Are you sure you want to delete this transaction?</p>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
