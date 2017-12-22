import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';
import {PageLayout, Row, Col, Table, Button, Alert} from '../../../common/components';

export default class UploadView extends React.PureComponent {
  static propTypes = {
    files: PropTypes.array,
    uploadFiles: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired
  };

  state = {
    error: null
  };

  renderMetaData = () => (
    <Helmet
      title={`App - Upload`}
      meta={[
        {
          name: 'description',
          content: `App - Upload page`
        }
      ]}
    />
  );

  onDrop = uploadFiles => async files => {
    const result = await uploadFiles(files);
    if (result && result.error) {
      this.setState({error: result.error});
    } else {
      this.setState({error: null});
    }
  };


  handleRemoveFile = async (id, removeFile) => {
    const result = await removeFile(id);
    let errors = {errors: []};
    if (result && result.errors) {
      errors = {errors: result.errors};
    }
    return errors;
  };

  render() {
    const {files, uploadFiles, removeFile} = this.props;
    const {error} = this.state;

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
          <Button color="primary" size="sm" className="delete-button"
                  onClick={async () => {
                    let res = await this.handleRemoveFile(record.id, removeFile);
                    this.setState(res)
                  }}>
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
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </Col>
            <Col xs={8}>
              {error && <Alert color="error">{error}</Alert>}
              {files && <Table dataSource={files} columns={columns}/>}
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
