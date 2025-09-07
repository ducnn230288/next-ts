import classNames from 'classnames';
import { useRef } from 'react';

import { EIcon } from '@/shared/enum';
import Icon from '../../../atoms/icon';
import './style.scss';
import type Props from './type';

const EntryTag = ({
  name = 'tag',
  value = [],
  disabled = false,
  placeholder = '',
  handleChange,
}: Props) => {
  const refInput = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const tagValue = refInput.current?.value.trim();
    if (tagValue && !value?.includes(tagValue)) {
      handleChange?.([...(value ?? []), tagValue]);
    }
    if (refInput.current) {
      refInput.current.value = '';
      refInput.current.focus();
    }
  };

  const removeTag = (tag: string) => {
    handleChange?.(value.filter(t => t !== tag));
  };

  return (
    <div className={classNames('entry-tag', { disabled })}>
      <div className="tags-row">
        {value?.map(tag => (
          <span className="tag" key={tag}>
            {tag}
            {!disabled && (
              <button type="button" onClick={() => removeTag(tag)}>
                <Icon name={EIcon.Close} />
              </button>
            )}
          </span>
        ))}
        <input
          ref={refInput}
          name={name}
          placeholder={placeholder}
          type="text"
          disabled={disabled}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
        />
      </div>
    </div>
  );
};

export default EntryTag;
