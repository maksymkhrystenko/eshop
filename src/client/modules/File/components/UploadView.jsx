import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import {
  PageLayout,
  Row,
  Col,
  Table,
  Button,
  Alert
} from '../../../common/components';

class UploadView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onDrop = uploadFiles => async files => {
    const result = await uploadFiles(files);
    if (result && result.error) {
      this.setState({ error: result.error });
    } else {
      this.setState({ error: null });
    }
  };

  handleRemoveFile = async (id, removeFile) => {
    const result = await removeFile(id);
    let errors = { errors: [] };
    if (result && result.errors) {
      errors = { errors: result.errors };
    }
    return errors;
  };

  renderMetaData = () => (
    <Helmet
      title="App - Upload"
      meta={[
        {
          name: 'description',
          content: `App - Upload page`
        }
      ]}
    />
  );

  render() {
    const { files, uploadFiles, removeFile } = this.props;
    const { error } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <a href={record.path} download={text}>
            {text} ({filesize(record.size)})
          </a>
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 50,
        render: (text, record) => (
          <Button
            color="primary"
            size="small"
            className="delete-button"
            onClick={async () => {
              const res = await this.handleRemoveFile(record.id, removeFile);
              this.setState(res);
            }}
          >
            Delete
          </Button>
        )
      }
    ];

    return (
      <PageLayout>
        {this.renderMetaData()}
        <div className="text-center">
          <Row>
            <Col xs={4}>
              <Dropzone onDrop={this.onDrop(uploadFiles)}>
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              </Dropzone>
            </Col>
            <Col xs={8}>
              {error && <Alert color="error">{error}</Alert>}
              {files && <Table dataSource={files} columns={columns} />}
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

UploadView.propTypes = {
  files: PropTypes.array,
  uploadFiles: PropTypes.func,
  removeFile: PropTypes.func
};

UploadView.defaultProps = {
  files: null,
  uploadFiles: null,
  removeFile: null
};

export default UploadView;
