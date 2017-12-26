/* @flow */

import React, {PureComponent} from 'react';
import {Slider, InputNumber, Checkbox} from 'antd';
import type {Element} from 'react';
import i18next from 'i18next';

import {Col, Row, Label, Link, Button, Rates} from '../../../components';
import styles from './styles.scss';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export class FilterSideBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      inputValue: [150, 600],
      InputNumberValueMin: 150,
      InputNumberValueMax: 600,
    };
  }

  onChangeSlider = (value) => {
    this.setState({
      inputValue: value,
      InputNumberValueMin: value[0],
      InputNumberValueMax: value[1],
    });
  }
  onChangeInputNumberMin = (value) => {
    this.setState({
      inputValue: [value, this.state.InputNumberValueMax],
      InputNumberValueMin: value,
    });
  }
  onChangeInputNumberMax = (value) => {
    this.setState({
      inputValue: [this.state.InputNumberValueMin, value],
      InputNumberValueMax: value,
    });
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Label>{i18next.t('CATEGORIES')}</Label>
            <hr/>
            <Col style={{borderBottom: '1px solid #E9E9E9'}}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                {i18next.t('FILTER_SIDEBAR_CHECK_ALL')}
              </Checkbox>
            </Col>
            <br/>
            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange}/>
          </Row><br/><br/>
          <Row>
            <Label>{i18next.t('PRICE_NAME')}</Label>
            <hr/>
            <Col span={24}>
              <Slider range step={1} min={50} max={1000} onChange={this.onChangeSlider} value={this.state.inputValue}/>
            </Col>
            <Col span={24}>
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={1000}
                  style={{marginLeft: 6, width: '50px'}}
                  size={'small'}
                  value={this.state.InputNumberValueMin}
                  onChange={this.onChangeInputNumberMin}
                />{' ' + i18next.t('CURRENCY')}
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={1000}
                  style={{marginLeft: 6, width: '50px'}}
                  size={'small'}
                  value={this.state.InputNumberValueMax}
                  onChange={this.onChangeInputNumberMax}
                />{' ' + i18next.t('CURRENCY')}
              </Col>
            </Col>
          </Row>

        </Col>
      </Row>
    )
  }
}

export default FilterSideBar;
