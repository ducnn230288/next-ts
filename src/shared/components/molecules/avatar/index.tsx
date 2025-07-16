import Tooltip from '../../atoms/tooltip';
import Render from './render';
import './style.scss';
import type Props from './type';

/**
 * Renders an avatar component.
 */
const Component = ({
  text,
  src,
  size = 20,
  showName = true,
  keySrc = 'avatarPath',
  keyName = 'fullName',
  maxCount = 4,
  index = 0,
}: Props) => {
  if (typeof text !== 'object') {
    return <Render text={text} src={src} showName={showName} size={size} index={index} />;
  } else {
    return (
      !!text && (
        <div className="avatar">
          {text
            .filter((_, index: number) => index < maxCount)
            .map((item, index: number) => (
              <Render
                showName={false}
                text={item[keyName]}
                src={item[keySrc]}
                size={size}
                index={index}
                key={'avatar' + index}
              />
            ))}
          {text.length > maxCount && (
            <Tooltip
              content={text
                .filter((_, index: number) => index >= maxCount)
                .map((item, index: number) => (
                  <Render
                    showName={true}
                    text={item[keyName]}
                    src={item[keySrc]}
                    size={size}
                    key={'avatar' + index}
                  />
                ))}>
              <small style={{ height: size, width: size }}>+{text.length - maxCount}</small>
            </Tooltip>
          )}
        </div>
      )
    );
  }
};

export default Component;
