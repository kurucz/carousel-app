import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export default function Form({ inputs = [], onChange }) {
  const [value, setValue] = useState();

  const onInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
      onChange && onChange(e.target.value);
    },
    [onChange, setValue]
  );

  return (
    <FormWrapper>
      {inputs.map(({ label, id }) => {
        return (
          <InputWrapper key={label}>
            <input
              name="group"
              type="radio"
              value={id}
              onChange={onInputChange}
              id={id}
            />
            <Label htmlFor={id} isActive={value === String(id)}>
              {label}
            </Label>
          </InputWrapper>
        );
      })}
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  input[type='radio'] {
    display: none;
  }
`;

const Label = styled.label`
  display: block;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.darkFont};
  border-radius: 60px;
  padding: 12px 42px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.darkFont : 'transparent'};
  color: ${({ isActive, theme }) =>
    !isActive ? theme.darkFont : theme.lightFont};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  ${breakpoint('lg')`
  font-size: 24px;
  `}
`;

const InputWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
