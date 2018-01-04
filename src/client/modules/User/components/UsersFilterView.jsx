import React from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import {Field, reduxForm} from 'redux-form';

import {Form, FormItem, Select, Option, Label, Input, RenderSelect, RenderCheckBox} from '../../../common/components';
import i18next from "i18next";

class UsersFilterView extends React.PureComponent {
  static propTypes = {
    searchText: PropTypes.string,
    role: PropTypes.string,
    isActive: PropTypes.bool,
    onSearchTextChange: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    onIsActiveChange: PropTypes.func.isRequired
  };

  handleSearch = e => {
    const {onSearchTextChange} = this.props;
    onSearchTextChange(e.target.value);
  };

  handleRole = value => {
    const {onRoleChange} = this.props;
    onRoleChange(value);
  };

  handleIsActive = () => {
    const {onIsActiveChange, isActive} = this.props;
    onIsActiveChange(!isActive);
  };

  render() {
    const {role, isActive} = this.props;

    const options = [
      {
        name: 'SELECT',
        content: ''
      },
      {
        name: 'USER',
        content: 'user'
      },
      {
        name: 'ADMIN',
        content: 'admin'
      },
    ];

    return (
      <Form name="usersFilter" layout="inline">
        <FormItem label={i18next.t('FILTER')}>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            placeholder={i18next.t('SEARCH')}
            element={Input}
            onChange={this.handleSearch}
          />
        </FormItem>
        &nbsp;
        <RenderSelect style={{width: 200, marginTop:'-8px'}}  name="role" defaultValue={options[0].content} options={options} type="select" label="Role" change={this.handleRole} />
        &nbsp;
        <RenderCheckBox name="isActive" type="checkbox" change={this.handleIsActive} label="Is Active"/>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'usersFilter'
})(UsersFilterView);
