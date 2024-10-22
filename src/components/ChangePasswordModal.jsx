import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const ChangePasswordModal = ({ show, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");

  const onFormSubmit = () => {
    setError("");

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }
    if (!newPassword) {
      setError("New password is required");
      return;
    }

    onSubmit({ currentPassword, newPassword });
  };

  return (
    <Modal
      title="Change Password"
      open={show}
      onCancel={onClose}
      footer={null}
      centered
      style={{
        top: "30%",
        left: "30%",
      }}
    >
      <div className="field-wrapper">
        <label htmlFor="currentPassword">Current Password</label>
        <Input
          // type={showCurrentPassword ? "text" : "password"}
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          suffix={
            showCurrentPassword ? (
              <EyeOutlined onClick={() => setShowCurrentPassword(false)} />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => setShowCurrentPassword(true)}
              />
            )
          }
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="field-wrapper">
        <label htmlFor="newPassword">New Password</label>
        <Input
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          suffix={
            showNewPassword ? (
              <EyeOutlined onClick={() => setShowNewPassword(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setShowNewPassword(true)} />
            )
          }
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={onClose} className="btn btn--secondary">
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onFormSubmit}
          className="btn btn--primary"
        >
          Update Password
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
