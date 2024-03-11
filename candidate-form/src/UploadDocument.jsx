import React from 'react';

const UploadDocument = ({ onChange, onRemove }) => {
  return (
    <div className="document">
      <div className="document-group">
        <h4 className="doc">Upload Documents</h4>
        <h5 className="files">File Name*</h5>
        <input
          type="text"
          className="doc-name"
          onChange={onChange('title')}
          required
        />
      </div>
      <div className="document-group">
        <h5 className="files">Type of File*</h5>
        <select
          className="form-control"
          onChange={onChange('fileType')}
          required
        >
          <option value="">Select</option>
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
        </select>
      </div>
      <div className="document-group">
        <h5 className="files">Upload Document*</h5>
        <input
          type="file"
          className="form-control"
          accept="application/pdf, image/*"
          onChange={onChange('file')}
          required
        />
        <button type="button" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default UploadDocument;
