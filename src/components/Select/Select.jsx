import React from "react";

import { useMediaQuery } from 'beautiful-react-hooks'; 
import { RiArrowDownSLine } from "react-icons/ri"
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { useState } from "react";
import "./Select.scss";
  const getCustomStyles = (isSmall) => {

    return {
      option: (provided) => {
          return {
              ...provided,
              fontFamily: 'Lato',
              fontSize: '14px',
              fontWeight: 'normal',
              color: '#292929',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              marginBottom: '12px',
          }
      },
      menu: (provided) => {
          const isSmallStyle = isSmall ? {
            left: '0',
            width: '290px',
          } : {

          }
          return {
              ...provided,
              width: '188px',
              ...isSmallStyle,
          }
      },
      multiValue: () => {
          return {
              display: 'none',
          };
        },
      control: (provided) => {
        const isSmallStyle = isSmall ? {
          border: 'none'
        } : {}

        return {
          ...provided,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'space-between',
          width: isSmall ? '100%' : '172px',
          height: '40px',
          ...isSmallStyle,
        }
      }, 
      singleValue: (provided) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      },
      checkbox: (provided) => {
        const width = '100px';
        const height = '100px';
    
        return { ...provided, width, height };
      },
      container: (provided) => {
        const isSmallStyle = isSmall ? {
          border: 'none',
          width: '290px',
          display: 'flex',
          alignItems: 'center',
          padding: '13px',
          cursor: 'pointer',
        } : {}
        return { ...provided, ...isSmallStyle };
      }
    }
    
  }

const Option = (props) => {
  const { isSelected, label } = props
  return (
    <div>
      <components.Option {...props}>
          <div className="select-option">
            <input
              className="select-option-checkbox"
              type="checkbox"
              checked={isSelected}
              onChange={() => null}
            />
            <label className="select-option-label">{label}</label>
          </div>
      </components.Option>
    </div>
  );
};

const IndicatorsContainer = (props) => {
  const { selectProps: { setOpenSelect, openSelect, isSmall } } = props
  
  return (
    <div>
      <components.IndicatorsContainer {...props}>
          {!isSmall && (
            <div className={`select-indicator ${openSelect ? 'select-indicator_gray' : ''}`} onClick={() => setOpenSelect(!openSelect)}>
              <RiArrowDownSLine size={20} color="#8c8c8c" />
            </div>
          )}
      </components.IndicatorsContainer>
    </div>
  );
};

const ValueContainer = (props) => {
  const { selectProps: { optionSelected, subTitle, options, setOpenSelect, openSelect, isSmall } } = props
  const isAll = optionSelected.length === options.length

  return (
    <div>
      <components.ValueContainer {...props}>
          <div className='select-value-wrap' onClick={() => setOpenSelect(!openSelect)}>
            <div className="select-value-title">
                <div className='select-value-text'>
                  {(Boolean(optionSelected.length) && !isAll) && (
                    optionSelected.map((item, index) => `${item.text}${index === optionSelected.length - 1 ? '' : ','} `)
                  )}
                  {(!Boolean(optionSelected.filter(({ value}) => value).length)) && 'Empty'}
                  {isAll && (
                    `All ${subTitle.toLowerCase()}`
                  )}
                </div>
                
                <div className="select-value-subtitle">
                    {subTitle}
                </div>
            </div>
          </div>
            
      </components.ValueContainer>
    </div>
  );
};

const Menu = (props) => {
    const { children, selectProps: { subTitle, setOpenSelect } } = props
  return (
    <div>
      <components.Menu {...props}>
        <div onMouseLeave={() => setTimeout(() => { 
          setOpenSelect(false)
        }, 1000) }>
          <div className='select-menu'>
              {subTitle}
          </div>
          {children}
        </div>
      </components.Menu>
    </div>
  );
};
  
const Select = ({options, subTitle, onChange, optionSelected, isMulti = true}) => {
  const isSmall = useMediaQuery('(max-width: 320px)'); 

  const [openSelect , setOpenSelect] = useState(false)

  const handleChange = (selected) => {
    onChange(selected)
  };

  return (
    <span
      class="select"
      data-toggle="popover"
      data-trigger="focus"
      data-content="Please selecet account(s)"
    >
      <ReactSelect
        styles={getCustomStyles(isSmall)}
        options={options}
        isMulti={isMulti}
        hideSelectedOptions={false}
        components={{
          Option,
          ValueContainer,
          Menu,
          IndicatorsContainer,
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={optionSelected}
        subTitle={subTitle}
        isClearable={false}
        menuIsOpen={openSelect}
        setOpenSelect={setOpenSelect}
        openSelect={openSelect}
        optionSelected={!isMulti ? [optionSelected] : optionSelected}
        isSmall={isSmall}
      />
    </span>
  );
}

export default Select