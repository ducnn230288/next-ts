import Tooltip from '../tooltip';
import Item from './item';
import './style.scss';
import type Props from './type';

const Component = ({
  text,
  src,
  classSize = 'size-5',
  showName = true,
  keySrc = 'avatarPath',
  keyName = 'fullName',
  maxCount = 4,
  index = 0,
}: Props) => {
  const fnGetText = (): string | undefined => {
    if (typeof text === 'string' || typeof text === 'undefined') {
      return text;
    }
    return undefined;
  };

  const isArray = typeof text === 'object' && Array.isArray(text);
  const visibleAvatars = isArray ? (text as Record<string, string>[]).slice(0, maxCount) : [];
  const hiddenAvatars = isArray ? (text as Record<string, string>[]).slice(maxCount) : [];

  if (!isArray) {
    return (
      <Item text={fnGetText()} src={src} showName={showName} classSize={classSize} index={index} />
    );
  } else {
    return (
      !!text && (
        <div className="avatar">
          {visibleAvatars.map((item, index: number) => (
            <Item
              showName={false}
              text={item[keyName]}
              src={item[keySrc]}
              classSize={classSize}
              index={index}
              key={'avatar' + index}
            />
          ))}
          {hiddenAvatars.length > 0 && (
            <Tooltip
              content={hiddenAvatars.map((item, index: number) => (
                <Item
                  showName={true}
                  text={item[keyName]}
                  src={item[keySrc]}
                  classSize={classSize}
                  key={'avatar' + index}
                />
              ))}>
              <small className={classSize}>+{text.length - maxCount}</small>
            </Tooltip>
          )}
        </div>
      )
    );
  }
};

export default Component;
